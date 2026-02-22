import { Injectable, Injector, ViewContainerRef } from "@angular/core";
import { ComponentRegistry } from "./services/component-registry";
import {
    ColumnConfiguration,
    ComponentConfiguration,
    ITEM_CONFIG,
    ItemConfiguration,
    LAYOUT_SETTINGS,
    LayoutConfiguration,
    PARENT_ITEM_COMPONENT,
    RowConfiguration,
    StackConfiguration
} from "./types";
import { EventEmitter } from "./utilities";
import { DropTargetIndicatorComponent } from "./components/drag-and-drop/drop-target-indicator.component";
import { ROOT_CONTAINER_ELEMENT, RootComponent } from "./components/_root.component";
import { createLayoutConfig } from "./functions/create-config/create-layout-config.function";
import { Area } from "./models/area.model";
import { shouldWrapInStack } from "./functions/should-wrap-in-stack.function";
import { wrapInStack } from "./functions/wrap-in-stack.function";
import { typeToComponentMap } from "./constants/type-to-component-map.constant";
import { AreaService } from "./services/area.service";
import { TabDropPlaceholderComponent } from "./components/tabs/tab-drop-placeholder.component";
import { DockingLayoutItemComponent } from "./models/docking-layout-item-component.model";
import { ComponentDroppedOnStackEvent, StackComponent } from "./components/tabs/stack.component";
import { RowOrColumnComponent } from "./components/grid/_row-or-column.component";
import { DragProxy } from "./components/drag-and-drop/_drag-proxy.component";
import { GlComponent } from "./components/component.component";
import { DropSegment } from "./models/drop-segment.model";
import { RowOrColumnParentComponent } from "./models/row-parent-component.model";

/**
 * The main class that will be exposed as GoldenLayout.
 */
@Injectable()
export class DockingLayoutService extends EventEmitter {

    config: LayoutConfiguration;
    container: JQuery;
    dropTargetIndicator: DropTargetIndicatorComponent;
    tabDropPlaceholder: TabDropPlaceholderComponent;

    private isInitialised = false;
    private width: number;
    private height: number;
    private root: RootComponent;

    private viewContainerRef: ViewContainerRef;

    constructor(
        private readonly componentRegistry: ComponentRegistry,
        private readonly areaService: AreaService,
        private readonly injector: Injector
    ) {
        super();
    }

    getViewContainerRef() {
        return this.viewContainerRef;
    }

    createDockingLayout(config: LayoutConfiguration,
                        viewContainerRef: ViewContainerRef) {

        this.viewContainerRef = viewContainerRef;
        const container = viewContainerRef.element.nativeElement as HTMLElement;
        this.container = $(container);

        this.config = createLayoutConfig(config);
        this.dropTargetIndicator = null;
        this.tabDropPlaceholder = viewContainerRef.createComponent(TabDropPlaceholderComponent).instance;
    }

    init() {
        const dropTargetIndicatorComponentRef = this.viewContainerRef.createComponent(DropTargetIndicatorComponent);
        dropTargetIndicatorComponentRef.changeDetectorRef.markForCheck();
        this.dropTargetIndicator = dropTargetIndicatorComponentRef.instance;
        this.updateSize();
        this.createRootComponent(this.config);
    }

    private registerInitialization() {
        this.isInitialised = true;
    }

    updateSize(width?: number, height?: number) {
        if (arguments.length === 2) {
            this.width = width;
            this.height = height;
        } else {
            this.width = this.container.width();
            this.height = this.container.height();
        }

        if (this.isInitialised) {
            this.root.callDownwards("setSize", [this.width, this.height]);
        }
    }

    createContentItem<T extends DockingLayoutItemComponent>(
        itemConfig: ItemConfiguration,
        parentItem: DockingLayoutItemComponent
    ): T {

        if (shouldWrapInStack({itemConfig, parentItem})) {
            itemConfig = wrapInStack(itemConfig as ComponentConfiguration) as StackConfiguration;
        }

        const injector = Injector.create({
            providers: [{
                provide: ITEM_CONFIG,
                useValue: itemConfig
            }, {
                provide: PARENT_ITEM_COMPONENT,
                useValue: parentItem
            }, {
                provide: ViewContainerRef,
                useValue: this.viewContainerRef
            }, {
                provide: DropTargetIndicatorComponent,
                useValue: this.dropTargetIndicator
            }, {
                provide: TabDropPlaceholderComponent,
                useValue: this.tabDropPlaceholder
            }, {
                provide: LAYOUT_SETTINGS,
                useValue: this.config.settings
            }],
            parent: this.injector
        });

        const componentType = typeToComponentMap[itemConfig.type];

        const componentInstance = this.viewContainerRef.createComponent<any>(componentType, {injector}).instance;

        this.runComponentInitTasks({componentInstance, itemConfig, parentItem});
        this.registerComponentEvents({componentInstance, itemConfig});

        return componentInstance;

    }

    runComponentInitTasks(payload: {
        readonly componentInstance: DockingLayoutItemComponent;
        readonly itemConfig: ItemConfiguration;
        readonly parentItem: DockingLayoutItemComponent;
    }) {
        const {itemConfig, componentInstance, parentItem} = {...payload};

        if (itemConfig.type === "row" || itemConfig.type === "column") {
            const rowOrColumn = componentInstance as RowOrColumnComponent;

            rowOrColumn.config = itemConfig as RowConfiguration | ColumnConfiguration;
            rowOrColumn.parent = parentItem as RowOrColumnParentComponent;

            if (rowOrColumn.config.content) {
                /**
                 * TEMPLATE_BASED: Comment-out
                 */
                 rowOrColumn.contentItems = rowOrColumn.config.content.map(x => this.createContentItem(x, rowOrColumn));
            }
        }

        if (itemConfig.type === "stack") {
            componentInstance.config = itemConfig as StackConfiguration;
        }
    }

    registerComponentEvents(payload: {
        readonly componentInstance: DockingLayoutItemComponent;
        readonly itemConfig: ItemConfiguration;
    }) {
        const {itemConfig, componentInstance} = {...payload};

        if (itemConfig.type === "stack") {
            const typedComponent = componentInstance as StackComponent;
            typedComponent.componentDragStart.subscribe(x => {

                return new DragProxy(
                    x.coordinates,
                    x.dragListener,
                    this,
                    x.contentItemComponent,
                    x.side,
                    x.sided
                );
            });

            typedComponent.removeStackEmptyDueToDragging.subscribe(x => {
                const stackComponent = x.stackComponent;
                const stackParent = this.findParentComponent(stackComponent, this.root);
                stackParent.removeChild(stackComponent, undefined);
            });

            typedComponent.componentDropped.subscribe(x => {
                this.handleComponentDroppedOnStack(x);
            });
        }
    }

    handleComponentDroppedOnStack(payload: ComponentDroppedOnStackEvent): void {
        const {stackComponent, dropSegment, contentItem, dropIndex} = {...payload};

        if (dropSegment === DropSegment.Header) {
            stackComponent.resetHeaderDropZone();
            stackComponent.addChild(contentItem, dropIndex);
            return;
        }

        if (dropSegment === DropSegment.Body) {
            stackComponent.addChild(contentItem);
            return;
        }

        const parent = this.findParentComponent(stackComponent, this.root);

        /*
        * The item was dropped on the top-, left-, bottom- or right- part of the content. Let's
        * aggregate some conditions to make the if statements later on more readable
        */
        const isVertical = dropSegment === DropSegment.Top || dropSegment === DropSegment.Bottom;
        const isHorizontal = dropSegment === DropSegment.Left || dropSegment === DropSegment.Right;
        const insertBefore = dropSegment === DropSegment.Top || dropSegment === DropSegment.Left;
        const hasCorrectParent = (isVertical && parent.isColumn) || (isHorizontal && parent.isRow);
        const dimension = isVertical ? "height" : "width";

        const stack = this.createAndInitStack(contentItem, stackComponent);

        /*
         * If the item is dropped on top or bottom of a column or left and right of a row, it's already
         * layd out in the correct way. Just add it as a child
         */
        if (hasCorrectParent) {
            this.addStackToExistingRowOrColumn({existingStack: stackComponent, stack, dimension, insertBefore});
            /*
             * This handles items that are dropped on top or bottom of a row or left / right of a column. We need
             * to create the appropriate contentItem for them to live in
             */
        } else {
            this.addStackToNewRowOrColumn({existingStack: stackComponent, newStack: stack, dimension, insertBefore, isVertical});
        }
    }

    createAndInitStack(component: GlComponent, existingStack: StackComponent): StackComponent {
        const stack = this.createContentItem<StackComponent>({
            type: "stack",
        }, existingStack);
        stack.init();
        stack.addChild(component);
        return stack;
    }

    addStackToExistingRowOrColumn(payload: {
        readonly existingStack: StackComponent;
        readonly stack: StackComponent;
        readonly insertBefore: boolean;
        readonly dimension: "width" | "height";
    }) {
        const existingStack = payload.existingStack;
        const stack = payload.stack;
        const insertBefore = payload.insertBefore;
        const dimension = payload.dimension;

        const parent = this.findParentComponent(existingStack, this.root);

        const index = parent.contentItems.indexOf(existingStack);
        parent.addChild(stack, insertBefore ? index : index + 1, true);
        existingStack.config[dimension] *= 0.5;
        stack.config[dimension] = existingStack.config[dimension];
        parent.callDownwards("setSize");
    }

    addStackToNewRowOrColumn(payload: {
        readonly existingStack: StackComponent;
        readonly newStack: StackComponent;
        readonly isVertical: boolean;
        readonly insertBefore: boolean;
        readonly dimension: "width" | "height";
    }) {
        const existingStack = payload.existingStack;
        const newStack = payload.newStack;
        const insertBefore = payload.insertBefore;
        const dimension = payload.dimension;
        const isVertical = payload.isVertical;
        const parent = this.findParentComponent(existingStack, this.root);

        const type = isVertical ? "column" : "row";
        const rowOrColumn = this.createContentItem<RowOrColumnComponent>({type}, existingStack);
        parent.replaceChild(existingStack, rowOrColumn);

        rowOrColumn.addChild(newStack, insertBefore ? 0 : undefined, true);
        rowOrColumn.addChild(existingStack, insertBefore ? undefined : 0, true);

        existingStack.config[dimension] = 50;
        newStack.config[dimension] = 50;
        rowOrColumn.callDownwards("setSize");
    }

    findParentComponentFromRoot(stackItem: DockingLayoutItemComponent): RowOrColumnComponent {
        return this.findParentComponent(stackItem, this.root);
    }

    /**
     * TODO: It would feel better to work with IDs but the model structure doesn't have artificially created
     * stacks if there's only 1 component in them
     */
    findParentComponent(stackItem: DockingLayoutItemComponent, root: RowOrColumnComponent | RootComponent): RowOrColumnComponent {

        if (root.contentItems?.some(x => x === stackItem)) {
            return root as RowOrColumnComponent;
        }

        if (root.contentItems) {
            for (const ci of root.contentItems) {
                const found = this.findParentComponent(stackItem, ci as any);
                if (found) return found;
            }
        }

        return null;
    }

    destroy() {
        if (this.isInitialised === false) return;
    }

    private createRootComponent(config: LayoutConfiguration): void {
        const injector = Injector.create({
            providers: [{
                provide: ROOT_CONTAINER_ELEMENT,
                useValue: this.container
            }, {
                provide: DropTargetIndicatorComponent,
                useValue: this.dropTargetIndicator
            }, {
                provide: TabDropPlaceholderComponent,
                useValue: this.tabDropPlaceholder
            }],
            parent: this.injector
        });
        const rootComponentRef = this.viewContainerRef.createComponent(RootComponent, {injector});
        rootComponentRef.instance.config = {content: config.content};
        rootComponentRef.changeDetectorRef.markForCheck();
        this.root = rootComponentRef.instance;

        this.root.initialized.subscribe(() => this.registerInitialization());

        this.root.dragOver.subscribe(area => {
            this.tabDropPlaceholder.remove();
            this.dropTargetIndicator.highlightArea(area);
        });

        this.root.drop.subscribe(event => {
            let contentItem = event.contentItem;
            const area = event.area;

            let stack: StackComponent;

            if (contentItem.isComponent) {
                stack = this.createContentItem({
                    type: "stack"
                }, this.root);
                stack.init();
                stack.addChild(contentItem);
                contentItem = stack;
            }

            const type = area.side[0] === "x" ? "row" : "column";
            const dimension = area.side[0] === "x" ? "width" : "height";
            const insertBefore = area.side[1] === "2";
            const column = this.root.contentItems[0];

            if (column.config.type !== type) {
                const rowOrColumn = this.createContentItem<RowOrColumnComponent>({type}, this.root);
                this.root.addChild(column, rowOrColumn);
                rowOrColumn.addChild(contentItem, insertBefore ? 0 : undefined, true);
                rowOrColumn.addChild(column, insertBefore ? undefined : 0, true);
                column.config[dimension] = 50;
                contentItem.config[dimension] = 50;
                rowOrColumn.callDownwards("setSize");
            } else {
                const sibling = column.contentItems[insertBefore ? 0 : column.contentItems.length - 1];
                column.addChild(contentItem, insertBefore ? 0 : undefined, true);
                sibling.config[dimension] *= 0.5;
                contentItem.config[dimension] = sibling.config[dimension];
                column.callDownwards("setSize");
            }
        });
    }

    getArea(x: number, y: number): Area {
        return this.areaService.getArea(x, y);
    }

    calculateItemAreas(): void {
        this.areaService.calculateItemAreas(this.root);
    }

}

