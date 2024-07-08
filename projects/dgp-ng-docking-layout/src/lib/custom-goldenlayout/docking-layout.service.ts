import { Injectable, Injector, ViewContainerRef } from "@angular/core";
import {
    ComponentConfiguration,
    ITEM_CONFIG,
    ItemConfiguration,
    ItemId,
    LAYOUT_CONFIG,
    LayoutConfiguration,
    PARENT_ITEM_COMPONENT,
    StackConfiguration
} from "./types";
import { EventEmitter } from "./utilities";
import { DropTargetIndicatorComponent } from "./components/drag-and-drop/drop-target-indicator.component";
import { ROOT_CONTAINER_ELEMENT, RootComponent } from "./components/root.component";
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
import { ContentItemCreationService } from "./services/content-item-creation.service";
import { Actions, ofType } from "@ngrx/effects";
import {
    addStackToParentRowOrColumn,
    addStackWithNewParentToParentRowOrColumn,
    removeStackFromParent
} from "./actions/remove-stack-from-parent.action";
import { tap } from "rxjs/operators";

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
        private readonly areaService: AreaService,
        private readonly injector: Injector,
        private readonly contentItemCreationService: ContentItemCreationService,
        private readonly actions$: Actions
    ) {
        super();
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

        this.contentItemCreationService.init({
            layoutConfig: this.config,
            dropTargetIndicator: this.dropTargetIndicator,
            viewContainerRef: this.viewContainerRef,
            tabDropPlaceholder: this.tabDropPlaceholder,
            injector: this.injector,
            typeToComponentMap: typeToComponentMap as any
        });

        this.updateSize();
        this.createRootComponent(this.config);
        this.registerEffects();
    }

    private registerEffects() {
        this.actions$.pipe(
            ofType(removeStackFromParent),
            tap(x => {
                const stackId = x.id;

                this.root.contentItems.forEach(rowOrColumn => {

                    const parent = this.findParentRowOrColumnForStack(x, rowOrColumn);

                    if (!parent) return;
                    parent.contentItems.forEach((child: StackComponent) => {

                        if (child.config.id === stackId) {
                            parent.removeChild(child, undefined);
                        }

                    });
                });

            })
        ).subscribe();

        this.actions$.pipe(
            ofType(addStackToParentRowOrColumn),
            tap(x => {
                const stackId = x.id;

                this.root.contentItems.forEach(rowOrColumn => {

                    const parent = this.findParentRowOrColumnForStack(x, rowOrColumn);

                    if (!parent) return;
                    parent.contentItems.forEach((child: StackComponent) => {

                        if (child.config.id === stackId) {

                            const stack = x.stack;
                            const insertBefore = x.insertBefore;
                            const dimension = x.dimension;
                            const index = parent.contentItems.indexOf(child);
                            parent.addChild(stack, insertBefore ? index : index + 1, true);
                            child.config[dimension] *= 0.5;
                            stack.config[dimension] = child.config[dimension];
                            parent.callLifecycleHookDownwards("setSize");
                        }

                    });
                });

            })
        ).subscribe();

        this.actions$.pipe(
            ofType(addStackWithNewParentToParentRowOrColumn),
            tap(x => {
                const stackId = x.id;

                this.root.contentItems.forEach(rowOrColumn => {

                    const parent = this.findParentRowOrColumnForStack(x, rowOrColumn);

                    if (!parent) return;
                    parent.contentItems.forEach((child: StackComponent) => {

                        if (child.config.id === stackId) {
                            const stack = x.stack;
                            const insertBefore = x.insertBefore;
                            const dimension = x.dimension;
                            const isVertical = x.isVertical;
                            const type = isVertical ? "column" : "row";
                            const newRowOrColumn = this.contentItemCreationService.createContentItem<RowOrColumnComponent>({type}, stack);
                            // TODO: Replace with event emitter
                            rowOrColumn.replaceChild(child, newRowOrColumn);

                            newRowOrColumn.addChild(stack, insertBefore ? 0 : undefined, true);
                            newRowOrColumn.addChild(child, insertBefore ? undefined : 0, true);

                            child.config[dimension] = 50;
                            stack.config[dimension] = 50;
                            newRowOrColumn.callLifecycleHookDownwards("setSize");
                        }

                    });
                });

            })
        ).subscribe();
    }

    private findParentRowOrColumnForStack(payload: ItemId, rowOrColumn: RowOrColumnComponent, result?: RowOrColumnComponent): RowOrColumnComponent {
        if (result) return result;

        for (let child of rowOrColumn.contentItems) {
            if (child.config.type === "stack" && child.config.id === payload.id) {
                result = rowOrColumn;
            }

            if (child.config.type === "row" || child.config.type === "column") {
                result = this.findParentRowOrColumnForStack(payload, child as RowOrColumnComponent, result);
            }
        }

        return result;
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
            this.root.callLifecycleHookDownwards("setSize", [this.width, this.height]);
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
                provide: LAYOUT_CONFIG,
                useValue: this.config
            }, {
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

        return this.viewContainerRef.createComponent<any>(componentType, {injector}).instance;
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
                rowOrColumn.callLifecycleHookDownwards("setSize");
            } else {
                const sibling = column.contentItems[insertBefore ? 0 : column.contentItems.length - 1];
                column.addChild(contentItem, insertBefore ? 0 : undefined, true);
                sibling.config[dimension] *= 0.5;
                contentItem.config[dimension] = sibling.config[dimension];
                column.callLifecycleHookDownwards("setSize");
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

