import { Injectable, Injector, ViewContainerRef } from "@angular/core";
import { DropTargetIndicatorComponent } from "../components/drag-and-drop/drop-target-indicator.component";
import { TabDropPlaceholderComponent } from "../components/tabs/tab-drop-placeholder.component";
import {
    ComponentConfiguration,
    ITEM_CONFIG,
    ItemConfiguration,
    LAYOUT_CONFIG,
    LayoutConfiguration,
    PARENT_ITEM_COMPONENT,
    PARENT_ITEM_CONFIG,
    StackConfiguration
} from "../types";
import { DockingLayoutItemComponent } from "../models/docking-layout-item-component.model";
import { shouldWrapInStack } from "../functions/should-wrap-in-stack.function";
import { wrapInStack } from "../functions/wrap-in-stack.function";

export interface ContentItemCreationServiceInit {
    readonly viewContainerRef: ViewContainerRef;
    readonly dropTargetIndicator: DropTargetIndicatorComponent;
    readonly tabDropPlaceholder: TabDropPlaceholderComponent;
    readonly injector: Injector;
    readonly layoutConfig: LayoutConfiguration;
    readonly typeToComponentMap: any;
}

@Injectable()
export class ContentItemCreationService {

    private config: ContentItemCreationServiceInit;

    init(config: ContentItemCreationServiceInit) {
        this.config = config;
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
                provide: PARENT_ITEM_CONFIG,
                useValue: parentItem.config
            }, {
                provide: LAYOUT_CONFIG,
                useValue: this.config.layoutConfig
            }, {
                provide: ViewContainerRef,
                useValue: this.config.viewContainerRef
            }, {
                provide: DropTargetIndicatorComponent,
                useValue: this.config.dropTargetIndicator
            }, {
                provide: TabDropPlaceholderComponent,
                useValue: this.config.tabDropPlaceholder
            }],
            parent: this.config.injector
        });

        const componentType = this.config.typeToComponentMap[itemConfig.type];

        return this.config.viewContainerRef.createComponent<any>(componentType, {injector}).instance;
    }
}
