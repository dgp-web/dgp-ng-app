import { ComponentFactoryResolver, Injectable, Injector, ViewContainerRef } from "@angular/core";
import { ComponentRegistry } from "./services/component-registry";
import { ITEM_CONFIG, ItemConfiguration, LayoutConfiguration, PARENT_ITEM_COMPONENT } from "./types";
import { EventEmitter } from "./utilities";
import { EventHub } from "./utilities/event-hub";
import { dockingLayoutViewMap } from "../docking-layout/views";
import { AbstractContentItemComponent } from "./components/abstract-content-item.component";
import { DropTargetIndicatorComponent } from "./components/drop-target-indicator.component";
import { ROOT_CONFIG, ROOT_CONTAINER_ELEMENT, RootComponent } from "./components/root.component";
import { jqueryErrorMessage } from "./constants/jquery-error-message.constant";
import { isJQueryLoaded } from "./functions/is-jquery-loaded.function";
import { InitializedEvent } from "./models/events/initialized-event.model";
import { SelectionChangedEvent } from "./models/events/selection-changed-event.model";
import { notNullOrUndefined } from "dgp-ng-app";
import { createLayoutConfig } from "./functions/create-config/create-layout-config.function";
import { Area } from "./models/area.model";
import { shouldWrapInStack } from "./functions/should-wrap-in-stack.function";
import { wrapInStack } from "./functions/wrap-in-stack.function";
import { typeToComponentMap } from "./constants/type-to-component-map.constant";
import { AreaService } from "./services/area.service";

/**
 * The main class that will be exposed as GoldenLayout.
 */
@Injectable()
export class DockingLayoutService extends EventEmitter {

    selectedItem: AbstractContentItemComponent;
    config: LayoutConfiguration;
    container: JQuery;
    dropTargetIndicator: DropTargetIndicatorComponent;
    tabDropPlaceholder: JQuery;

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

    createDockingLayout(config: LayoutConfiguration,
                        viewContainerRef: ViewContainerRef) {

        if (!isJQueryLoaded()) throw new Error(jqueryErrorMessage);

        this.viewContainerRef = viewContainerRef;
        const container = viewContainerRef.element.nativeElement as HTMLElement;
        this.container = $(container);

        this.eventHub = new EventHub(this);
        this.config = createLayoutConfig(config);
        this.dropTargetIndicator = null;
        this.tabDropPlaceholder = $(
            dockingLayoutViewMap.tabDropPlaceholder.render()
        );

        /*this.on("stateChanged", (x) => {
            console.log(x);
            try {
                console.log(this.toConfig(this.root));
            } catch (e) {
                console.error(e);
            }
        });*/
    }

    getComponent = x => this.componentRegistry.getComponent(x);

    init() {
        this.dropTargetIndicator = new DropTargetIndicatorComponent();
        this.updateSize();
        this.createRootComponent(this.config);
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

        if (this.isInitialised === true) {
            this.root.callDownwards("setSize", [this.width, this.height]);
        }
    }

    createContentItem(itemConfig: ItemConfiguration, parentItem: AbstractContentItemComponent): AbstractContentItemComponent {

        if (shouldWrapInStack({itemConfig, parentItem})) itemConfig = wrapInStack(itemConfig);

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

        return this.viewContainerRef.createComponent<any>(componentType as any, {injector}).instance;
    }

    destroy() {
        if (this.isInitialised === false) return;
        this.root.callDownwards("_$destroy", [], true);
        this.root.contentItems = [];
        this.tabDropPlaceholder.remove();
        this.dropTargetIndicator.destroy();
        this.eventHub.destroy();
    }

    selectItem(item: AbstractContentItemComponent, silent: boolean) {

        if (item === this.selectedItem) return;

        if (notNullOrUndefined(this.selectedItem)) this.selectedItem.deselect();

        if (item && silent !== true) item.select();

        this.selectedItem = item;

        this.emit<SelectionChangedEvent>("selectionChanged", item);
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
        this.root = this.viewContainerRef.createComponent(RootComponent, {injector}).instance;
    }

    getArea(x: number, y: number): Area {
        return this.areaService.getArea(x, y);
    }

    calculateItemAreas(): void {
        this.areaService.calculateItemAreas(this.root);
    }

}

