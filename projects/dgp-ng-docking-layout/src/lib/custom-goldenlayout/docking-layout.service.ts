import { ComponentFactoryResolver, Injectable, Injector, ViewContainerRef } from "@angular/core";
import { ComponentRegistry } from "./services/component-registry";
import {
    ComponentConfiguration,
    ITEM_CONFIG,
    ItemConfiguration,
    LayoutConfiguration,
    PARENT_ITEM_COMPONENT,
    StackConfiguration
} from "./types";
import { EventEmitter } from "./utilities";
import { EventHub } from "./utilities/event-hub";
import { DropTargetIndicatorComponent } from "./components/drag-and-drop/drop-target-indicator.component";
import { ROOT_CONFIG, ROOT_CONTAINER_ELEMENT, RootComponent } from "./components/root.component";
import { jqueryErrorMessage } from "./constants/jquery-error-message.constant";
import { isJQueryLoaded } from "./functions/is-jquery-loaded.function";
import { InitializedEvent } from "./models/events/initialized-event.model";
import { createLayoutConfig } from "./functions/create-config/create-layout-config.function";
import { Area } from "./models/area.model";
import { shouldWrapInStack } from "./functions/should-wrap-in-stack.function";
import { wrapInStack } from "./functions/wrap-in-stack.function";
import { typeToComponentMap } from "./constants/type-to-component-map.constant";
import { AreaService } from "./services/area.service";
import { TabDropPlaceholderComponent } from "./components/tabs/tab-drop-placeholder.component";
import { DockingLayoutItemComponent } from "./models/docking-layout-item-component.model";

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
    private eventHub: EventHub;

    private viewContainerRef: ViewContainerRef;

    constructor(
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly componentRegistry: ComponentRegistry,
        private readonly areaService: AreaService,
        private readonly injector: Injector
    ) {
        super();
    }

    getViewContainerRef() {
        return this.viewContainerRef;
    }

    getInjector() {
        return this.injector;
    }

    createDockingLayout(config: LayoutConfiguration,
                        viewContainerRef: ViewContainerRef) {

        if (!isJQueryLoaded()) throw new Error(jqueryErrorMessage);

        this.viewContainerRef = viewContainerRef;
        const container = viewContainerRef.element.nativeElement as HTMLElement;
        this.container = $(container);

        this.eventHub = new EventHub(this);
        this.config = createLayoutConfig(config);
        this.dropTargetIndicator = null;
        this.tabDropPlaceholder = viewContainerRef.createComponent(TabDropPlaceholderComponent).instance;
    }

    getComponent = x => this.componentRegistry.getComponent(x);

    init() {
        const dropTargetIndicatorComponentRef = this.viewContainerRef.createComponent(DropTargetIndicatorComponent);
        dropTargetIndicatorComponentRef.changeDetectorRef.markForCheck();
        this.dropTargetIndicator = dropTargetIndicatorComponentRef.instance;
        this.updateSize();
        this.createRootComponent(this.config);
    }

    registerInitialization() {
        this.isInitialised = true;
        this.emit<InitializedEvent>("initialised");
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

        if (shouldWrapInStack({
            itemConfig,
            parentItem
        })) {
            itemConfig = wrapInStack(itemConfig as ComponentConfiguration) as StackConfiguration;
        }

        const injector = Injector.create({
            providers: [{
                provide: ITEM_CONFIG,
                useValue: itemConfig
            }, {
                provide: PARENT_ITEM_COMPONENT,
                useValue: parentItem
            }],
            parent: this.injector
        });

        const componentType = typeToComponentMap[itemConfig.type];

        return this.viewContainerRef.createComponent<any>(componentType, {injector}).instance;
    }

    destroy() {
        if (this.isInitialised === false) return;
        this.root.callDownwards("destroy", [], true);
        this.eventHub.destroy();
    }

    private createRootComponent(config: LayoutConfiguration): void {
        const injector = Injector.create({
            providers: [{
                provide: ROOT_CONFIG,
                useValue: {content: config.content}
            }, {
                provide: ROOT_CONTAINER_ELEMENT,
                useValue: this.container
            }],
            parent: this.injector
        });
        const rootComponentRef = this.viewContainerRef.createComponent(RootComponent, {injector});
        rootComponentRef.changeDetectorRef.markForCheck();
        this.root = rootComponentRef.instance;
    }

    getArea(x: number, y: number): Area {
        return this.areaService.getArea(x, y);
    }

    calculateItemAreas(): void {
        this.areaService.calculateItemAreas(this.root);
    }

}

