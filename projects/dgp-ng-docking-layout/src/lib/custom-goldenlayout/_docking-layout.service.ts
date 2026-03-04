import { Injectable, Injector, ViewContainerRef } from "@angular/core";
import { ComponentRegistry } from "./services/component-registry";
import { ColumnConfiguration, ItemConfiguration, LayoutConfiguration, RowConfiguration, StackConfiguration } from "./types";
import { DropTargetIndicatorComponent } from "./components/drag-and-drop/drop-target-indicator.component";
import { ROOT_CONTAINER_ELEMENT, RootComponent, RootDropEvent } from "./components/root.component";
import { createLayoutConfig } from "./functions/create-config/create-layout-config.function";
import { Area, AreaSides } from "./models/area.model";
import { wrapInStack } from "./functions/wrap-in-stack.function";
import { AreaService } from "./services/area.service";
import { TabDropPlaceholderComponent } from "./components/tabs/tab-drop-placeholder.component";
import { DockingLayoutItemComponent } from "./models/docking-layout-item-component.model";
import { RowOrColumnComponent } from "./components/grid/_row-or-column.component";
import { DragProxy } from "./components/drag-and-drop/_drag-proxy.component";
import { DropSegment } from "./models/drop-segment.model";
import { Actions, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import * as _ from "lodash";

import { AddTabToDockingLayoutEvent } from "./models/stack/move-tab-in-docking-layout-event.model";
import { componentDroppedOnStack } from "./store/actions/component-dropped-on-stack.action";
import { removeStackEmptyDueToDragging } from "./store/actions/remove-stack-empty-due-to-dragging.action";
import { componentDragStart } from "./store/actions/component-drag-start.action";
import { createGuid } from "dgp-ng-app";
import { addChildToRowOrCol, AddChildToRowOrColPayload } from "./store/actions/add-child-to-row-or-col.action";
import { removeChildOfRowOrCol, RemoveChildOfRowOrColPayload } from "./store/actions/remove-child-of-row-or-col.action";
import { ReplaceChildOfRowOrColPayload } from "./store/actions/replace-child-of-row-or-col.action";
import { StackComponent } from "./components/tabs/stack.component";
import { addTabToDockingLayout } from "./functions/move-tab-in-docking-layout.function";

/**
 * The main class that will be exposed as GoldenLayout.
 */
@Injectable()
export class DockingLayoutService {

    config: LayoutConfiguration;
    container: JQuery;
    dropTargetIndicator: DropTargetIndicatorComponent;
    tabDropPlaceholder: TabDropPlaceholderComponent;

    private isInitialised = false;
    private root: RootComponent;

    private viewContainerRef: ViewContainerRef;

    constructor(
        private readonly componentRegistry: ComponentRegistry,
        private readonly areaService: AreaService,
        private readonly injector: Injector,
        private readonly actions$: Actions,
    ) {

        /**
         * Stack
         */
        this.actions$.pipe(
            ofType(componentDragStart),
            tap(x => {
                return new DragProxy(
                    x.payload.coordinates,
                    x.payload.dragListener,
                    this,
                    x.payload.contentItemComponent,
                    x.payload.side,
                    x.payload.sided
                );
            })
        ).subscribe();

        this.actions$.pipe(
            ofType(componentDroppedOnStack),
            tap(x => {
                this.handleComponentDroppedOnStack(x.payload);
            })
        ).subscribe();

        this.actions$.pipe(
            ofType(removeStackEmptyDueToDragging),
            tap(x => {
                console.log("removeStackEmptyDueToDragging");
                const stackConfig = x.payload.stackConfig;
                const stackComponent = this.getItemFromConfig<StackComponent>(stackConfig.id);
                const stackParent = this.findParentComponentFromRoot(stackComponent);
                stackParent.removeChild(stackComponent, undefined);
            })
        ).subscribe();

        /**
         * Row or column
         */

        this.actions$.pipe(
            ofType(removeChildOfRowOrCol),
            tap(x => {
                this.removeChildOfRowOrCol(x);
            })
        ).subscribe();

    }

    private addChildToRowOrCol(payload: AddChildToRowOrColPayload) {
        console.log("addChildToRowOrCol", payload);
        const {parentConfig, contentItemConfig, _$suspendResize} = {...payload};
        const addedItemConfig = contentItemConfig;
        const dimension = parentConfig.type === "row" ? "height" : "width";

        let index = payload.index;

        let newItemSize: number,
            itemSize: number;

        if (index === undefined) {
            index = parentConfig.content.length;
        }

        if (parentConfig.content === undefined) {
            parentConfig.content = [];
        }

        if (index === undefined) {
            index = parentConfig.content.length;
        }

        parentConfig.content.splice(index, 0, addedItemConfig);

        newItemSize = (1 / parentConfig.content.length) * 100;

        if (_$suspendResize === true) {
            return;
        }

        for (let itemConfig of parentConfig.content) {
            if (itemConfig.id === addedItemConfig.id) {
                itemConfig[dimension] = newItemSize;
            } else {
                itemSize = itemConfig[dimension] *= (100 - newItemSize) / 100;
                itemConfig[dimension] = itemSize;
            }
        }
    }

    private removeChildOfRowOrCol(payload: RemoveChildOfRowOrColPayload) {
        console.log("removeChildOfRowOrCol");
        const {parentConfig, contentItemConfig} = {...payload};
        const dimension = parentConfig.type === "row" ? "height" : "width";

        const removedItemConfig = contentItemConfig;

        const removedItemSize = removedItemConfig[dimension];


        /**
         * Allocate the space that the removed item occupied to the remaining items
         */
        for (let itemConfig of parentConfig.content) {
            if (itemConfig.id !== removedItemConfig.id) {
                /**
                 * Resize other items
                 */
                itemConfig[dimension] += removedItemSize / (parentConfig.content.length - 1);
            }
        }

        const index = _.findIndex(parentConfig.content, x => x.id === removedItemConfig.id);
        parentConfig.content.splice(index, 1);

        if (parentConfig.content.length === 0
            && parentConfig.isClosable === true
            && (parentConfig.type === "column" || parentConfig.type === "row")) {

            const grandParentConfig = this.findParentComponentConfigFromRoot(parentConfig);

            this.removeChildOfRowOrCol({
                parentConfig: grandParentConfig as any,
                contentItemConfig: parentConfig as any,
                keepChild: undefined
            });

            // TODO: Remove the parent as well if it's empty
            // (parent.parent as RowOrColumnComponent).removeChild(parent, undefined);

        } else if (parentConfig.content.length === 1 && parentConfig.isClosable === true) {
            // TODO: Remove redundant rows or columns

            /* let childItem = parent.contentItems[0];
            parent.contentItems = [];
            parent.parent.replaceChild(parent, childItem as RowOrColumnComponent);*/

            const grandParentConfig = this.findParentComponentConfigFromRoot(parentConfig);
            this.replaceChildToRowOrCol({
                parentConfig: grandParentConfig as any,
                oldChildConfig: parentConfig as any,
                newChildConfig: parentConfig.content[0] as any
            });
        }
    }

    private replaceChildToRowOrCol(payload: ReplaceChildOfRowOrColPayload) {
        console.log("replaceChildToRowOrCol");
        const {parentConfig, newChildConfig, oldChildConfig, destroyOldChild} = {...payload};
        const dimension = parentConfig.type === "row" ? "height" : "width";

        const size = oldChildConfig[dimension];

        // TODO: might not work
        const index = _.findIndex(parentConfig.content, x => x.id === oldChildConfig.id);

        parentConfig.content[index] = newChildConfig;

        newChildConfig[dimension] = size;
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
        this.createRootComponent(this.config);
    }

    handleComponentDroppedOnStack(payload: AddTabToDockingLayoutEvent): void {
        const {targetStackConfig, targetTabDropSegment, addedTab, targetTabHeaderDropIndex} = {...payload};

        const stackConfig = targetStackConfig;
        const stackComponent = this.getItemFromConfig<StackComponent>(stackConfig.id);

        if (targetTabDropSegment === DropSegment.Header) {
            console.log("Drop on stack header");
            stackComponent.resetHeaderDropZone();

            this.config = addTabToDockingLayout({
                layout: this.config,
                event: payload
            });
            console.log(this.config);

            this.root.config = {content: this.config.content};
            this.root.cd.markForCheck();
            return;
        }

        const parentConfig = this.findParentComponentConfigFromRoot(stackConfig);

        /*
        * The item was dropped on the top-, left-, bottom- or right- part of the content. Let's
        * aggregate some conditions to make the if statements later on more readable
        */
        const isVertical = targetTabDropSegment === DropSegment.Top || targetTabDropSegment === DropSegment.Bottom;
        const isHorizontal = targetTabDropSegment === DropSegment.Left || targetTabDropSegment === DropSegment.Right;
        const insertBefore = targetTabDropSegment === DropSegment.Top || targetTabDropSegment === DropSegment.Left;
        const hasCorrectParent = (isVertical && parentConfig.type === "column") || (isHorizontal && parentConfig.type === "row");
        const dimension = isVertical ? "height" : "width";

        /*
         * If the item is dropped on top or bottom of a column or left and right of a row, it's already
         * layd out in the correct way. Just add it as a child
         */
        if (hasCorrectParent) {
            const stackWrapConfig = wrapInStack(addedTab);
            this.addStackToExistingRowOrColumn({
                existingStackConfig: stackComponent.config,
                stackConfig: stackWrapConfig,
                dimension,
                insertBefore
            });
            /*
             * This handles items that are dropped on top or bottom of a row or left / right of a column. We need
             * to create the appropriate contentItem for them to live in
             */
        } else {
            const stackWrapConfig = wrapInStack(addedTab);
            stackConfig.content.push(stackWrapConfig as any);

            this.addStackToNewRowOrColumn({
                existingStackConfig: stackConfig,
                newStackConfig: stackWrapConfig,
                dimension,
                insertBefore,
                isVertical
            });
        }
    }

    addStackToExistingRowOrColumn(payload: {
        readonly existingStackConfig: StackConfiguration;
        readonly stackConfig: StackConfiguration;
        readonly insertBefore: boolean;
        readonly dimension: "width" | "height";
    }) {
        console.log("addStackToExistingRowOrColumn");
        const existingStackConfig = payload.existingStackConfig;
        const stackConfig = payload.stackConfig;
        const insertBefore = payload.insertBefore;
        const dimension = payload.dimension;

        const parent = this.findParentComponentConfigFromRoot(existingStackConfig);

        const index = parent.content.indexOf(existingStackConfig);

        parent.content.splice(insertBefore ? index : index + 1, 0, stackConfig);
        existingStackConfig[dimension] *= 0.5;
        stackConfig[dimension] = existingStackConfig[dimension];
    }

    addStackToNewRowOrColumn(payload: {
        readonly existingStackConfig: StackConfiguration;
        readonly newStackConfig: StackConfiguration;
        readonly isVertical: boolean;
        readonly insertBefore: boolean;
        readonly dimension: "width" | "height";
    }) {
        console.log("addStackToNewRowOrColumn");
        const existingStack = payload.existingStackConfig;
        const newStack = payload.newStackConfig;
        const insertBefore = payload.insertBefore;
        const dimension = payload.dimension;
        const isVertical = payload.isVertical;
        const parent = this.findParentComponentConfigFromRoot(existingStack);

        const type = isVertical ? "column" : "row";

        const rowOrColumnConfig: RowConfiguration | ColumnConfiguration = {
            type,
            id: createGuid(),
            isClosable: true,
            content: [],
            // TODO: what about the dimension???
        };

        const existingStackIndex = parent.content.indexOf(existingStack);
        parent.content.splice(existingStackIndex, 1, rowOrColumnConfig);

        rowOrColumnConfig.content.splice(insertBefore ? 0 : undefined, 0, newStack);
        rowOrColumnConfig.content.splice(insertBefore ? undefined : 0, 0, existingStack);

        /*parent.replaceChild(existingStack, rowOrColumn);

        rowOrColumn.addChild(newStack.config, insertBefore ? 0 : undefined, true);
        rowOrColumn.addChild(existingStack.config, insertBefore ? undefined : 0, true);
*/
        existingStack[dimension] = 50;
        newStack[dimension] = 50;
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

    private getItemFromConfig<T>(itemId: string): T {
        const root = this.root;

        return this.getItemFromConfigInt(itemId, root as any);
    }

    private getItemFromConfigInt<T>(itemId: string, parent: any): T {
        if (parent.config.id === itemId) return parent as any;

        if (parent.contentItems) {
            for (const ci of parent.contentItems) {
                const found = this.getItemFromConfigInt(itemId, ci as any);
                if (found) return found as any;
            }
        }
    }

    findParentComponentConfigFromRoot(stackItem: ItemConfiguration): ItemConfiguration {
        return this.findParentComponentConfig(stackItem, this.root.config);
    }

    /**
     * TODO: It would feel better to work with IDs but the model structure doesn't have artificially created
     * stacks if there's only 1 component in them
     */
    findParentComponentConfig(stackItem: ItemConfiguration, root: ItemConfiguration): ItemConfiguration {

        if (root.content?.some(x => x.id === stackItem.id)) {
            return root as any;
        }

        if (root.content) {
            for (const ci of root.content) {
                const found = this.findParentComponentConfig(stackItem, ci as any);
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

        this.root.dragOver.subscribe(area => {
            this.handelDragOverRoot(area);
        });

        this.root.drop.subscribe(event => {
            this.handleComponentDroppedOnRoot(event);
        });
    }

    private handelDragOverRoot(area: AreaSides) {
        this.tabDropPlaceholder.remove();
        this.dropTargetIndicator.highlightArea(area);
    }

    private handleComponentDroppedOnRoot(event: RootDropEvent) {
        let contentItem = event.contentItem;
        let contentItemConfig = contentItem.config as ItemConfiguration;
        const area = event.area;

        if (contentItem.isComponent) {
            console.log("createNewStackInRoot");
            contentItemConfig = wrapInStack(contentItem.config);
        }

        const type = area.side[0] === "x" ? "row" : "column";
        const dimension = area.side[0] === "x" ? "width" : "height";
        const insertBefore = area.side[1] === "2";
        const firstRootContentItem = this.root.contentItems[0];
        const firstRootContentItemConfig = firstRootContentItem.config;

        if (firstRootContentItem.config.type !== type) {
            console.log("createNewRowOrColumnInRoot");

            const rowOrColumnConfig: RowConfiguration | ColumnConfiguration = {
                type,
                content: [firstRootContentItemConfig, contentItemConfig],
                id: createGuid(),
                isClosable: true
            };

            this.root.config.content = [rowOrColumnConfig];

            firstRootContentItemConfig[dimension] = 50;
            contentItemConfig[dimension] = 50;
        } else {
            console.log("sibling in root");
            const sibling = firstRootContentItem.contentItems[insertBefore ? 0 : firstRootContentItem.contentItems.length - 1];
            const siblingConfig = sibling.config;

            if (insertBefore) {
                firstRootContentItemConfig.content = [contentItemConfig, ...firstRootContentItemConfig.content];
            } else {
                firstRootContentItemConfig.content = [...firstRootContentItemConfig.content, contentItemConfig];
            }
            siblingConfig[dimension] *= 0.5;
            contentItem.config[dimension] = siblingConfig[dimension];
        }
    }

    getArea(x: number, y: number): Area {
        return this.areaService.getArea(x, y);
    }

    calculateItemAreas(): void {
        this.areaService.calculateItemAreas(this.root);
    }

}

