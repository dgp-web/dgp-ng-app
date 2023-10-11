import { Injectable, Injector, ViewContainerRef } from "@angular/core";
import { ComponentRegistry } from "./services/component-registry";
import {
    ColumnConfiguration,
    ComponentConfiguration,
    ItemConfiguration,
    itemDefaultConfig,
    LayoutConfiguration,
    RowConfiguration,
    StackConfiguration
} from "./types";
import { EventEmitter } from "./utilities";
import { DropTargetIndicatorComponent } from "./components/drag-and-drop/drop-target-indicator.component";
import { RootComponent } from "./components/root.component";
import { createLayoutConfig } from "./functions/create-config/create-layout-config.function";
import { Area } from "./models/area.model";
import { shouldWrapInStack } from "./functions/should-wrap-in-stack.function";
import { wrapInStack } from "./functions/wrap-in-stack.function";
import { typeToComponentMap } from "./constants/type-to-component-map.constant";
import { AreaService } from "./services/area.service";
import { TabDropPlaceholderComponent } from "./components/tabs/tab-drop-placeholder.component";
import { DockingLayoutItemComponent } from "./models/docking-layout-item-component.model";
import { StackComponent } from "./components/tabs/stack.component";
import { RowOrColumnComponent } from "./components/grid/row-or-column.component";
import { RowOrColumnParentComponent } from "./models/row-parent-component.model";
import { StackParentComponent } from "./models/stack-parent-component.model";

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
                provide: ViewContainerRef,
                useValue: this.viewContainerRef
            }, {
                provide: DropTargetIndicatorComponent,
                useValue: this.dropTargetIndicator
            }, {
                provide: TabDropPlaceholderComponent,
                useValue: this.tabDropPlaceholder
            }],
            parent: this.injector
        });

        const componentType = typeToComponentMap[itemConfig.type];

        const instance = this.viewContainerRef.createComponent<any>(componentType, {injector}).instance;

        if (componentType === RowOrColumnComponent) {
            const typedInstance = instance as RowOrColumnComponent;

            typedInstance.config = {...itemDefaultConfig, ...itemConfig} as RowConfiguration | ColumnConfiguration;
            typedInstance.parent = parentItem as RowOrColumnParentComponent;
            typedInstance.initialize();

            typedInstance.tryInitContentItemTriggered.subscribe(x => {
                const typedParent = parentItem as RowOrColumnParentComponent;
                if (typedParent.isInitialised === true && x.isInitialised === false) {
                    x.init();
                }
            });


        } else if (componentType === StackComponent) {
            const typedInstance = instance as StackComponent;

            typedInstance.config = itemConfig as StackConfiguration;
            typedInstance.parent = parentItem as StackParentComponent;
            typedInstance.initialize();
        }

        return instance;
    }

    destroy() {
        if (this.isInitialised === false) return;
    }

    private createRootComponent(config: LayoutConfiguration): void {
        const injector = Injector.create({
            providers: [{
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
        this.root.containerElement = this.container;

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
                rowOrColumn.addChild(contentItem, insertBefore ? 0 : undefined);
                rowOrColumn.addChild(column, insertBefore ? undefined : 0);
                column.config[dimension] = 50;
                contentItem.config[dimension] = 50;
                rowOrColumn.callDownwards("setSize");
            } else {
                const sibling = column.contentItems[insertBefore ? 0 : column.contentItems.length - 1];
                column.addChild(contentItem, insertBefore ? 0 : undefined);
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

