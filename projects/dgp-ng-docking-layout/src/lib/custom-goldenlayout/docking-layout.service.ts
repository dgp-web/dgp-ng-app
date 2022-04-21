import { ComponentFactoryResolver, Injectable } from "@angular/core";
import { addChildContentItemsToContainer, findAllStackContainers } from "./functions";
import { defaultLayoutConfig } from "./models";
import { ComponentRegistry } from "./services/component-registry";
import { ConfigurationError, ItemConfiguration, LayoutConfiguration } from "./types";
import { EventEmitter } from "./utilities";
import { EventHub } from "./utilities/event-hub";
import { dockingLayoutViewMap } from "../docking-layout/views";
import { AbstractContentItemComponent } from "./components/abstract-content-item.component";
import { RowOrColumnComponent } from "./components/row-or-column.component";
import { StackComponent } from "./components/stack.component";
import { Component } from "./components/component.component";
import { DropTargetIndicator } from "./components/drop-target-indicator.component";
import { Root } from "./components/root.component";
import { jqueryErrorMessage } from "./constants/jquery-error-message.constant";
import { isJQueryLoaded } from "./functions/is-jquery-loaded.function";

/*export interface TypeToComponentMap {
    readonly [key: string]: typeof AbstractContentItemComponent;
}*/

/**
 * The main class that will be exposed as GoldenLayout.
 */
@Injectable()
export class DockingLayoutService extends EventEmitter {

    selectedItem: AbstractContentItemComponent;
    config: any;
    container: JQuery;
    dropTargetIndicator: any;
    tabDropPlaceholder: JQuery;
    private isInitialised = false;
    private _itemAreas = [];
    private _updatingColumnsResponsive = false;
    private _firstLoad = true;
    private width: number;
    private height: number;
    private root: Root;
    private eventHub: EventHub;

    private typeToComponentMap = {
        column: this.fnBind(RowOrColumnComponent, this, [true]),
        row: this.fnBind(RowOrColumnComponent, this, [false]),
        stack: StackComponent,
        component: Component
    };

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
        this.config = this.createConfig(config);
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

    // TODO: This can be removed by extracting 2 components
    fnBind(fn, context, boundArgs?) {

        if (Function.prototype.bind !== undefined) {
            return Function.prototype.bind.apply(fn, [context].concat(boundArgs || []));
        }

        const bound = function () {

            // Join the already applied arguments to the now called ones (after converting to an array again).
            const args = (boundArgs || []).concat(Array.prototype.slice.call(arguments, 0));

            // If not being called as a constructor
            if (!(this instanceof bound)) {
                // return the result of the function called bound to target and partially applied.
                return fn.apply(context, args);
            }
            // If being called as a constructor, apply the function bound to self.
            fn.apply(this, args);
        };
        // Attach the prototype of the function to our newly created function.
        bound.prototype = fn.prototype;
        return bound;
    }

    getComponent = x => this.componentRegistry.getComponent(x);

    /**
     * Creates the actual layout. Must be called after all initial components
     * are registered. Recurses through the configuration and sets up
     * the item tree.
     */
    init() {
        this.dropTargetIndicator = new DropTargetIndicator();
        this.updateSize();
        this.create(this.config);
        this.isInitialised = true;
        this.adjustColumnsResponsive();
        this.emit("initialised");
    }

    /**
     * Updates the layout managers size
     */
    updateSize(width?, height?) {
        if (arguments.length === 2) {
            this.width = width;
            this.height = height;
        } else {
            this.width = this.container.width();
            this.height = this.container.height();
        }

        if (this.isInitialised === true) {
            this.root.callDownwards("setSize", [this.width, this.height]);

            this.adjustColumnsResponsive();
        }
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

    /**
     * Recursively creates new item tree structures based on a provided
     * ItemConfiguration object
     */
    createContentItem(config: ItemConfiguration, parent: AbstractContentItemComponent): AbstractContentItemComponent {
        let typeErrorMsg;

        if (typeof config.type !== "string") {
            throw new ConfigurationError("Missing parameter 'type'", config);
        }

        if (!this.typeToComponentMap[config.type]) {
            typeErrorMsg = "Unknown type '" + config.type + "'. " +
                "Valid types are " + Object.keys(this.typeToComponentMap)
                    .join(",");

            throw new ConfigurationError(typeErrorMsg);
        }


        /**
         * We add an additional stack around every component that's not within a stack anyways.
         */
        if (
            // If this is a component
            config.type === "component" &&

            // and it's not already within a stack
            !(parent instanceof StackComponent) &&

            // and we have a parent
            !!parent
        ) {
            config = {
                type: "stack",
                width: config.width,
                height: config.height,
                content: [config]
            };
        }

        /*     const fileType = fileItem.extension;
             const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
                 this.config.fileTypeViewerMap[fileType.toLowerCase()] ? this.config.fileTypeViewerMap[fileType.toLowerCase()] :
                 this.config.fileTypeViewerMap.default
             );*/

        // TODO: Replace this with component factory
        // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.typeToComponentMap[config.type]);
        // const foo = this.componentFactoryResolver.resolveComponentFactory();

        return new this.typeToComponentMap[config.type](this, config, parent);
    }

    /*   private loadComponent(fileItem: FileItem) {
           const fileType = fileItem.extension;
           const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
               this.config.fileTypeViewerMap[fileType.toLowerCase()] ? this.config.fileTypeViewerMap[fileType.toLowerCase()] :
               this.config.fileTypeViewerMap.default
           );
           this.viewContainerRef.clear();
           const componentRef = this.viewContainerRef.createComponent(componentFactory);
           const viewerComponent = componentRef.instance as FileViewerComponentBase;
           viewerComponent.fileItem = this.fileItem;
       }

       private clear() {
           this.viewContainerRef.clear();
       }
   */

    /**
     * Programmatically selects an item. This deselects
     * the currently selected item, selects the specified item
     * and emits a selectionChanged event
     */
    selectItem(item: AbstractContentItemComponent, _$silent) {

        if (this.config.settings.selectionEnabled !== true) {
            throw new Error("Please set selectionEnabled to true to use this feature");
        }

        if (item === this.selectedItem) {
            return;
        }

        if (this.selectedItem !== null && this.selectedItem !== undefined) {
            this.selectedItem.deselect();
        }

        if (item && _$silent !== true) {
            item.select();
        }

        this.selectedItem = item;

        this.emit("selectionChanged", item);
    }

    /*************************
     * PACKAGE PRIVATE
     *************************/

    _$getArea(x, y) {
        let i, area, smallestSurface = Infinity, mathingArea = null;

        for (i = 0; i < this._itemAreas.length; i++) {
            area = this._itemAreas[i];

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
        const sides = {y2: 0, x2: 0, y1: "y2", x1: "x2"};
        // tslint:disable-next-line:forin
        for (const side in sides) {
            const area = this.root._$getArea();
            area.side = side;
            if (sides [side]) {
                area[side] = area[sides [side]] - areaSize;
            } else {
                area[side] = areaSize;
            }
            area.surface = (area.x2 - area.x1) * (area.y2 - area.y1);
            this._itemAreas.push(area);
        }
    }

    _$calculateItemAreas() {
        let i, area;
        const allContentItems = this.getAllContentItems();
        this._itemAreas = [];

        /**
         * If the last item is dragged out, highlight the entire container size to
         * allow to re-drop it. allContentItems[ 0 ] === this.root at this point
         *
         * Don't include root into the possible drop areas though otherwise since it
         * will used for every gap in the layout, e.g. splitters
         */
        if (allContentItems.length === 1) {
            this._itemAreas.push(this.root._$getArea());
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
                this._itemAreas = this._itemAreas.concat(area);
            } else {
                this._itemAreas.push(area);
                const header: any = {};
                Object.assign(header, area);
                Object.assign(header, area.contentItem._contentAreaDimensions.header.highlightArea);
                header.surface = (header.x2 - header.x1) * (header.y2 - header.y1);
                this._itemAreas.push(header);
            }
        }
    }

    /**
     * Takes a contentItem or a configuration and optionally a parent
     * item and returns an initialised instance of the contentItem.
     * If the contentItem is a function, it is first called
     */
    _$normalizeContentItem(contentItemOrConfig: ItemConfiguration, parent?: AbstractContentItemComponent) {

        if (contentItemOrConfig instanceof AbstractContentItemComponent) {
            return contentItemOrConfig;
        }

        if ($.isPlainObject(contentItemOrConfig) && contentItemOrConfig.type) {
            const newContentItem = this.createContentItem(contentItemOrConfig, parent);
            newContentItem.callDownwards("_$init");
            return newContentItem;
        } else {
            throw new Error("Invalid contentItem");
        }
    }

    private getAllContentItems() {
        const allContentItems = [];

        const addChildren = function (contentItem) {
            allContentItems.push(contentItem);

            if (contentItem.contentItems instanceof Array) {
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < contentItem.contentItems.length; i++) {
                    addChildren(contentItem.contentItems[i]);
                }
            }
        };

        addChildren(this.root);

        return allContentItems;
    }

    private createConfig(config) {

        config = $.extend(true, {}, defaultLayoutConfig, config);

        const nextNode = function (node) {
            for (const key in node) {
                if (node.hasOwnProperty(key) && key !== "props" && typeof node[key] === "object") {
                    nextNode(node[key]);
                }
            }
        };

        nextNode(config);

        if (config.settings.hasHeaders === false) {
            config.dimensions.headerHeight = 0;
        }

        return config;
    }

    private create(config) {
        let errorMsg;

        if (!(config.content instanceof Array)) {
            if (config.content === undefined) {
                errorMsg = "Missing setting 'content' on top level of configuration";
            } else {
                errorMsg = "Configuration parameter 'content' must be an array";
            }

            throw new ConfigurationError(errorMsg, config);
        }

        if (config.content.length > 1) {
            errorMsg = "Top level content can't contain more then one element.";
            throw new ConfigurationError(errorMsg, config);
        }

        this.root = new Root(this, {content: config.content}, this.container);
        this.root.callDownwards("_$init");

        if (config.maximisedItemId === "__glMaximised") {
            this.root.getItemsById(config.maximisedItemId)[0].toggleMaximise();
        }
    }

    private adjustColumnsResponsive() {

        // If there is no min width set, or not content items, do nothing.
        if (!this.useResponsiveLayout()
            || this._updatingColumnsResponsive
            || !this.config.dimensions
            || !this.config.dimensions.minItemWidth
            || this.root.contentItems.length === 0
            || !this.root.contentItems[0].isRow) {
            this._firstLoad = false;
            return;
        }

        this._firstLoad = false;

        // If there is only one column, do nothing.
        const columnCount = this.root.contentItems[0].contentItems.length;
        if (columnCount <= 1) {
            return;
        }

        // If they all still fit, do nothing.
        const minItemWidth = this.config.dimensions.minItemWidth;
        const totalMinWidth = columnCount * minItemWidth;
        if (totalMinWidth <= this.width) {
            return;
        }

        // Prevent updates while it is already happening.
        this._updatingColumnsResponsive = true;

        // Figure out how many columns to stack, and put them all in the first stack container.
        const finalColumnCount = Math.max(Math.floor(this.width / minItemWidth), 1);
        const stackColumnCount = columnCount - finalColumnCount;

        const rootContentItem = this.root.contentItems[0];
        const firstStackContainer = findAllStackContainers(this.root)[0];
        for (let i = 0; i < stackColumnCount; i++) {
            // Stack from right.
            const column = rootContentItem.contentItems[rootContentItem.contentItems.length - 1];
            addChildContentItemsToContainer(firstStackContainer, column);
        }

        this._updatingColumnsResponsive = false;
    }

    private useResponsiveLayout() {
        return this.config.settings && (this.config.settings.responsiveMode === "always"
            || (this.config.settings.responsiveMode === "onload" && this._firstLoad));
    }

    toConfig(root) {
        let config, next;

        /*
         * settings & labels
         */
        config = {
            settings: this.config.settings,
            dimensions: this.config.dimensions,
            labels: this.config.labels
        };

        /*
         * Content
         */
        config.content = [];
        next = function (configNode, item) {
            let key, i;

            for (key in item.config) {
                if (key !== "content") {
                    configNode[key] = item.config[key];
                }
            }

            if (item.contentItems.length) {
                configNode.content = [];

                for (i = 0; i < item.contentItems.length; i++) {
                    configNode.content[i] = {};
                    next(configNode.content[i], item.contentItems[i]);
                }
            }
        };

        if (root) {
            next(config, {
                contentItems: [root]
            });
        } else {
            next(config, this.root);
        }

        return config;
    }

}
