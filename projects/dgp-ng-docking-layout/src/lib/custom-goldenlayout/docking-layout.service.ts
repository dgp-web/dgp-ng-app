import { ComponentFactoryResolver, Injectable } from "@angular/core";
import { ComponentRegistry } from "./services/component-registry";
import { ItemConfiguration, LayoutConfiguration } from "./types";
import { EventEmitter } from "./utilities";
import { EventHub } from "./utilities/event-hub";
import { dockingLayoutViewMap } from "../docking-layout/views";
import { AbstractContentItemComponent } from "./components/abstract-content-item.component";
import { DropTargetIndicator } from "./components/drop-target-indicator.component";
import { Root } from "./components/root.component";
import { jqueryErrorMessage } from "./constants/jquery-error-message.constant";
import { isJQueryLoaded } from "./functions/is-jquery-loaded.function";
import { InitializedEvent } from "./models/events/initialized-event.model";
import { SelectionChangedEvent } from "./models/events/selection-changed-event.model";
import { notNullOrUndefined } from "dgp-ng-app";
import { mutatify } from "data-modeling";
import { createLayoutConfig } from "./functions/create-config/create-layout-config.function";
import { Area, AreaSides } from "./models/area.model";
import { getAllContentItems } from "./functions/content-item/get-all-content-items.function";
import { shouldWrapInStack } from "./functions/should-wrap-in-stack.function";
import { wrapInStack } from "./functions/wrap-in-stack.function";
import { typeToComponentMap } from "./constants/type-to-component-map.constant";

/**
 * The main class that will be exposed as GoldenLayout.
 */
@Injectable()
export class DockingLayoutService extends EventEmitter {

    selectedItem: AbstractContentItemComponent;
    config: LayoutConfiguration;
    container: JQuery;
    dropTargetIndicator: DropTargetIndicator;
    tabDropPlaceholder: JQuery;
    private isInitialised = false;
    private itemAreas = [] as Array<Area>;
    private _updatingColumnsResponsive = false;
    private _firstLoad = true;
    private width: number;
    private height: number;
    private root: Root;
    private eventHub: EventHub;

    constructor(
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly componentRegistry: ComponentRegistry
    ) {
        super();
    }

    createDockingLayout(config: LayoutConfiguration, container: HTMLElement) {
        if (!isJQueryLoaded()) throw new Error(jqueryErrorMessage);

        this.container = $(container);
        // TODO: Extract creation to store

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
        this.dropTargetIndicator = new DropTargetIndicator();
        this.updateSize();
        this.create(this.config);
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

        // TODO: Replace this with component factory
        // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.typeToComponentMap[config.type]);
        // const foo = this.componentFactoryResolver.resolveComponentFactory();


        return new typeToComponentMap[itemConfig.type](this, itemConfig, parentItem);
    }

    /**
     * Destroys the LayoutManager instance itself as well as every ContentItem
     * within it. After this is called nothing should be left of the LayoutManager.
     */
    destroy() {
        if (this.isInitialised === false) {
            return;
        }
        this.root.callDownwards("_$destroy", [], true);
        this.root.contentItems = [];
        this.tabDropPlaceholder.remove();
        this.dropTargetIndicator.destroy();
        this.eventHub.destroy();
    }

    selectItem(item: AbstractContentItemComponent, silent: boolean) {

        if (this.config.settings.selectionEnabled !== true) {
            throw new Error("Please set selectionEnabled to true to use this feature");
        }

        if (item === this.selectedItem) {
            return;
        }

        if (notNullOrUndefined(this.selectedItem)) {
            this.selectedItem.deselect();
        }

        if (item && silent !== true) {
            item.select();
        }

        this.selectedItem = item;

        this.emit<SelectionChangedEvent>("selectionChanged", item);
    }

    /*************************
     * PACKAGE PRIVATE
     *************************/

    _$getArea(x: number, y: number): Area {
        let i: number;
        let area: Area;
        let smallestSurface = Infinity;
        let mathingArea: Area = null;

        for (i = 0; i < this.itemAreas.length; i++) {
            area = this.itemAreas[i];

            if (
                x > area.x1 &&
                x < area.x2 &&
                y > area.y1 &&
                y < area.y2 &&
                smallestSurface > area.surface
            ) {
                smallestSurface = area.surface;
                mathingArea = area;
            }
        }

        return mathingArea;
    }

    _$createRootItemAreas() {
        const areaSize = 50;
        const sides: AreaSides = {y2: 0, x2: 0, y1: "y2", x1: "x2"};
        // tslint:disable-next-line:forin
        for (const side in sides) {
            const area = mutatify(this.root._$getArea());
            area.side = side as keyof AreaSides;
            if (sides [side]) {
                area[side] = area[sides [side]] - areaSize;
            } else {
                area[side] = areaSize;
            }
            area.surface = (area.x2 as number - (area.x1 as number)) * (area.y2 as number - (area.y1 as number));
            this.itemAreas.push(area as any); // TODO Fix types
        }
    }

    _$calculateItemAreas(): void {
        let i: number;
        let area: Area;
        const allContentItems = getAllContentItems(this.root);
        this.itemAreas = [];

        /**
         * If the last item is dragged out, highlight the entire container size to
         * allow to re-drop it. allContentItems[ 0 ] === this.root at this point
         *
         * Don't include root into the possible drop areas though otherwise since it
         * will used for every gap in the layout, e.g. splitters
         */
        if (allContentItems.length === 1) {
            this.itemAreas.push(this.root._$getArea());
            return;
        }
        this._$createRootItemAreas();

        for (i = 0; i < allContentItems.length; i++) {

            if (!(allContentItems[i].isStack)) {
                continue;
            }

            area = allContentItems[i]._$getArea();

            if (area === null) {
            } else if (area instanceof Array) {
                this.itemAreas = this.itemAreas.concat(area);
            } else {
                this.itemAreas.push(area);
                const header: any = {};
                Object.assign(header, area);
                Object.assign(header, (area.contentItem as any)._contentAreaDimensions.header.highlightArea); // TODO: Investigate typing
                header.surface = (header.x2 - header.x1) * (header.y2 - header.y1);
                this.itemAreas.push(header);
            }
        }
    }

    private create(config: LayoutConfiguration): void {
        this.root = new Root(this, {content: config.content}, this.container);
        this.root.callDownwards("_$init");
    }

}


