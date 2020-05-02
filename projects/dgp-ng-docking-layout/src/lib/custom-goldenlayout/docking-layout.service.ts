import { ComponentFactoryResolver, Injectable } from "@angular/core";
import * as components from "./components";
import { Component, RowOrColumnComponent, StackComponent } from "./components";
import { AbstractContentItemComponent } from "./components/abstract-content-item";
import { DropTargetIndicator } from "./components/drop-target-indicator/drop-target-indicator.component";
import { ConfigurationError } from "./types/configuration-error";
import { ItemConfiguration, LayoutConfiguration } from "./types/golden-layout-configuration";
import { ConfigMinifier, EventEmitter, LayoutManagerUtilities } from "./utilities";
import { EventHub } from "./utilities/event-hub";
import { ComponentDefinition, ContainerDefinition } from "./utilities/models";


export interface TypeToComponentMap {
    readonly [key: string]: typeof AbstractContentItemComponent;
}

/**
 * The main class that will be exposed as GoldenLayout.
 */
@Injectable()
export class DockingLayoutService extends EventEmitter {

    selectedItem: AbstractContentItemComponent;
    config: any;
    container: any;
    dropTargetIndicator: any;
    tabDropPlaceholder: any;
    private readonly layoutManagerUtilities = new LayoutManagerUtilities();
    private isInitialised = false;
    private _isFullPage = false;
    private _resizeTimeoutId: any;
    private _components: any;
    private _itemAreas: any[];
    private _resizeFunction: any;
    private _unloadFunction: any;
    private _maximisedItem: any;
    private _maximisePlaceholder: any;
    private _creationTimeoutPassed: boolean;
    private _dragSources: any[];
    private _updatingColumnsResponsive: boolean;
    private _firstLoad: boolean;
    private width: number;
    private height: number;
    private root: any;
    private eventHub: EventHub;
    private transitionIndicator: any;

    private typeToComponentMap = {
        column: this.fnBind(RowOrColumnComponent, this, [true]),
        row: this.fnBind(RowOrColumnComponent, this, [false]),
        stack: StackComponent,
        component: Component
    };

    constructor(
        private readonly componentFactoryResolver: ComponentFactoryResolver
    ) {
        super();
    }

    createDockingLayout(config: LayoutConfiguration, container: any) {
        if (!$ || typeof $.noConflict !== "function") {
            let errorMsg = "jQuery is missing as dependency for GoldenLayout. ";
            errorMsg += "Please either expose $ on GoldenLayout's scope (e.g. window) or add \"jquery\" to ";
            errorMsg += "your paths when using RequireJS/AMD";
            throw new Error(errorMsg);
        }

        this.isInitialised = false;
        this._isFullPage = false;
        this._resizeTimeoutId = null;
        this._components = {};
        this._itemAreas = [];
        this._resizeFunction = () => this.onResize();
        this._maximisedItem = null;
        this._maximisePlaceholder = $("<div class=\"lm_maximise_place\"></div>");
        this._creationTimeoutPassed = false;
        this._dragSources = [];
        this._updatingColumnsResponsive = false;
        this._firstLoad = true;

        this.width = null;
        this.height = null;
        this.root = null;
        this.selectedItem = null;
        this.eventHub = new EventHub(this);
        this.config = this.createConfig(config);
        this.container = container;
        this.dropTargetIndicator = null;
        this.transitionIndicator = null;
        this.tabDropPlaceholder = $("<div class=\"lm_drop_tab_placeholder\"></div>");
    }

    fnBind(fn, context, boundArgs?) {

        if (Function.prototype.bind !== undefined) {
            return Function.prototype.bind.apply(fn, [context].concat(boundArgs || []));
        }

        const bound = function() {

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

    minifyConfig(config) {
        return (new ConfigMinifier()).minifyConfig(config);
    }

    unminifyConfig(config) {
        return (new ConfigMinifier()).unminifyConfig(config);
    }

    /**
     * Register a component with the layout manager. If a configuration node
     * of type component is reached it will look up componentName and create the
     * associated component
     */
    registerComponent(name, constructor: (container: ContainerDefinition, component: ComponentDefinition<any>) => void) {
        if (typeof constructor !== "function") {
            throw new Error("Please register a constructor function");
        }

        if (this._components[name] !== undefined) {
            throw new Error("Component " + name + " is already registered");
        }

        this._components[name] = constructor;
    }

    /**
     * Creates a layout configuration object based on the the current state
     */
    toConfig(root) {
        let config, next, i;

        if (this.isInitialised === false) {
            throw new Error("Can't create config, layout not yet initialised");
        }

        if (root && !(root instanceof components.AbstractContentItemComponent)) {
            throw new Error("Root must be a ContentItem");
        }

        /*
         * settings & labels
         */
        config = {
            settings: Object.assign({}, this.config.settings),
            dimensions: Object.assign({}, this.config.dimensions),
            labels: Object.assign({}, this.config.labels)
        };

        /*
         * Content
         */
        config.content = [];
        next = function(configNode, item) {
            // tslint:disable-next-line:no-shadowed-variable
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
            next(config, {contentItems: [root]});
        } else {
            next(config, this.root);
        }


        /*
         * Add maximised item
         */
        config.maximisedItemId = this._maximisedItem ? "__glMaximised" : null;
        return config;
    }

    /**
     * Returns a previously registered component
     */
    getComponent(name) {
        if (this._components[name] === undefined) {
            throw new ConfigurationError("Unknown component '" + name + "'");
        }

        return this._components[name];
    }

    /**
     * Creates the actual layout. Must be called after all initial components
     * are registered. Recurses through the configuration and sets up
     * the item tree.
     *
     * If called before the document is ready it adds itself as a listener
     * to the document.ready event
     */
    init() {

        /**
         * If the document isn't ready yet, wait for it.
         */
        if (document.readyState === "loading" || document.body === null) {
            $(document)
                .ready(() => this.init());
            return;
        }


        this.setContainer();
        this.dropTargetIndicator = new DropTargetIndicator();
        this.transitionIndicator = new components.TransitionIndicatorComponent();
        this.updateSize();
        this.create(this.config);
        this.bindEvents();
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

            if (this._maximisedItem) {
                this._maximisedItem.element.width(this.container.width());
                this._maximisedItem.element.height(this.container.height());
                this._maximisedItem.callDownwards("setSize");
            }

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
        $(window)
            .off("resize", this._resizeFunction);
        this.root.callDownwards("_$destroy", [], true);
        this.root.contentItems = [];
        this.tabDropPlaceholder.remove();
        this.dropTargetIndicator.destroy();
        this.transitionIndicator.destroy();
        this.eventHub.destroy();

        this._dragSources.forEach(function(dragSource) {
            dragSource._dragListener.destroy();
            dragSource._element = null;
            dragSource._itemConfig = null;
            dragSource._dragListener = null;
        });
        this._dragSources = [];
    }

    /**
     * Recursively creates new item tree structures based on a provided
     * ItemConfiguration object
     */
    createContentItem(config: ItemConfiguration, parent: AbstractContentItemComponent) {
        let typeErrorMsg, contentItem;

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
            !(parent instanceof components.StackComponent) &&

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
                 this.config.fileTypeViewerMap[fileType.toLowerCase()] ? this.config.fileTypeViewerMap[fileType.toLowerCase()] : this.config.fileTypeViewerMap.default
             );*/

        // TODO: Replace this with component factory
        // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.typeToComponentMap[config.type]);
        return new this.typeToComponentMap[config.type](this, config, parent);
    }

    /*   private loadComponent(fileItem: FileItem) {
           const fileType = fileItem.extension;
           const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
               this.config.fileTypeViewerMap[fileType.toLowerCase()] ? this.config.fileTypeViewerMap[fileType.toLowerCase()] : this.config.fileTypeViewerMap.default
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
     * Attaches DragListener to any given DOM element
     * and turns it into a way of creating new ContentItems
     * by 'dragging' the DOM element into the layout
     */
    createDragSource(element, itemConfig) {
        this.config.settings.constrainDragToContainer = false;
        const dragSource = new components.DragSourceComponent($(element), itemConfig, this);
        this._dragSources.push(dragSource);

        return dragSource;
    }

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

        if (this.selectedItem !== null) {
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
    _$maximiseItem(contentItem) {
        if (this._maximisedItem !== null) {
            this._$minimiseItem(this._maximisedItem);
        }
        this._maximisedItem = contentItem;
        this._maximisedItem.addId("__glMaximised");
        contentItem.element.addClass("lm_maximised");
        contentItem.element.after(this._maximisePlaceholder);
        this.root.element.prepend(contentItem.element);
        contentItem.element.width(this.container.width());
        contentItem.element.height(this.container.height());
        contentItem.callDownwards("setSize");
        this._maximisedItem.emit("maximised");
        this.emit("stateChanged");
    }

    _$minimiseItem(contentItem) {
        contentItem.element.removeClass("lm_maximised");
        contentItem.removeId("__glMaximised");
        this._maximisePlaceholder.after(contentItem.element);
        this._maximisePlaceholder.remove();
        contentItem.parent.callDownwards("setSize");
        this._maximisedItem = null;
        contentItem.emit("minimised");
        this.emit("stateChanged");
    }


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
    _$normalizeContentItem(contentItemOrConfig, parent?: AbstractContentItemComponent) {
        if (!contentItemOrConfig) {
            throw new Error("No content item defined");
        }

        if (this.layoutManagerUtilities.isFunction(contentItemOrConfig)) {
            contentItemOrConfig = contentItemOrConfig();
        }

        if (contentItemOrConfig instanceof components.AbstractContentItemComponent) {
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

        const addChildren = function(contentItem) {
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

    private bindEvents() {
        if (this._isFullPage) {
            $(window)
                .resize(this._resizeFunction);
        }
        $(window)
            .on("unload beforeunload", this._unloadFunction);
    }

    private onResize() {
        clearTimeout(this._resizeTimeoutId);
        this._resizeTimeoutId = setTimeout(() => this.updateSize(), 100);
    }

    private createConfig(config) {
        const windowConfigKey = this.layoutManagerUtilities.getQueryStringParam("gl-window");

        if (windowConfigKey) {
            config = localStorage.getItem(windowConfigKey);
            config = JSON.parse(config);
            config = (new ConfigMinifier()).unminifyConfig(config);
            localStorage.removeItem(windowConfigKey);
        }

        config = $.extend(true, {}, { // default config

            settings: {
                hasHeaders: true,
                constrainDragToContainer: true,
                reorderEnabled: true,
                selectionEnabled: false,
                showMaximiseIcon: true,
                showCloseIcon: true,
                responsiveMode: "onload", // Can be onload, always, or none.
                tabOverlapAllowance: 0, // maximum pixel overlap per tab
                reorderOnTabMenuClick: true,
                tabControlOffset: 10
            },
            dimensions: {
                borderWidth: 5,
                borderGrabWidth: 15,
                minItemHeight: 10,
                minItemWidth: 10,
                headerHeight: 20,
                dragProxyWidth: 300,
                dragProxyHeight: 200
            },
            labels: {
                close: "close",
                maximise: "maximise",
                minimise: "minimise",
                tabDropdown: "additional tabs"
            }
        }, config);

        const nextNode = function(node) {
            for (const key in node) {
                if (key !== "props" && typeof node[key] === "object") {
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

    private setContainer() {
        const container = $(this.container || "body");

        if (container.length === 0) {
            throw new Error("GoldenLayout container not found");
        }

        if (container.length > 1) {
            throw new Error("GoldenLayout more than one container element specified");
        }

        if (container[0] === document.body) {
            this._isFullPage = true;

            $("html, body")
                .css({
                    height: "100%",
                    margin: 0,
                    padding: 0,
                    overflow: "hidden"
                });
        }

        this.container = container;
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

        this.root = new components.Root(this, {content: config.content}, this.container);
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
        const firstStackContainer = this.findAllStackContainers()[0];
        for (let i = 0; i < stackColumnCount; i++) {
            // Stack from right.
            const column = rootContentItem.contentItems[rootContentItem.contentItems.length - 1];
            this.addChildContentItemsToContainer(firstStackContainer, column);
        }

        this._updatingColumnsResponsive = false;
    }

    private useResponsiveLayout() {
        return this.config.settings && (this.config.settings.responsiveMode === "always" || (this.config.settings.responsiveMode === "onload" && this._firstLoad));
    }

    private addChildContentItemsToContainer(container, node) {
        if (node.type === "stack") {
            node.contentItems.forEach(function(item) {
                container.addChild(item);
                node.removeChild(item, true);
            });
        } else {
            node.contentItems.forEach(x => this.addChildContentItemsToContainer(container, x));
        }
    }

    private findAllStackContainers() {
        const stackContainers = [];
        this.findAllStackContainersRecursive(stackContainers, this.root);

        return stackContainers;
    }

    private findAllStackContainersRecursive(stackContainers, node) {
        node.contentItems.forEach(x => {
            if (x.type === "stack") {
                stackContainers.push(x);
            } else if (!x.isComponent) {
                this.findAllStackContainersRecursive(stackContainers, x);
            }
        });
    }
}
