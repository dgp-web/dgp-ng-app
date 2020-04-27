import { ConfigMinifier, EventEmitter, LayoutManagerUtilities } from "./utilities";
import * as components from "./components";
import { DropTargetIndicator } from "./components/drop-target-indicator/drop-target-indicator.component";
import { ConfigurationError } from "./types/configuration-error";
import { EventHub } from "./utilities/event-hub";
import { LayoutConfiguration } from "./types/golden-layout-configuration";
import { AbstractContentItemComponent } from "./components/abstract-content-item";
import { createGuid } from "dgp-ng-app";
import { stripHtmlTags } from "../common/functions";

declare var $: any;

/**
 * The main class that will be exposed as GoldenLayout.
 */
export class LayoutManager extends EventEmitter {

    private readonly layoutManagerUtilities = new LayoutManagerUtilities();

    private isInitialised: boolean;
    private _isFullPage: boolean;
    private _resizeTimeoutId: any;
    private _components: any;
    private _itemAreas: any[];
    private _resizeFunction: any;
    private _unloadFunction: any;
    private _maximisedItem: any;
    private _maximisePlaceholder: any;
    private _creationTimeoutPassed: boolean;
    private _subWindowsCreated: boolean;
    private _dragSources: any[];
    private _updatingColumnsResponsive: boolean;
    private _firstLoad: boolean;
    private width: number;
    private height: number;
    private root: any;
    private openPopouts: any[];
    selectedItem: AbstractContentItemComponent;
    private isSubWindow: boolean;
    private eventHub: EventHub;
    config: any;
    container: any;
    dropTargetIndicator: any;
    private transitionIndicator: any;
    tabDropPlaceholder: any;
    private _typeToItem: any;

    constructor(config: LayoutConfiguration, container: any) {
        super();
        if (!$ || typeof $.noConflict !== "function") {
            let errorMsg = "jQuery is missing as dependency for GoldenLayout. ";
            errorMsg += "Please either expose $ on GoldenLayout's scope (e.g. window) or add \"jquery\" to ";
            errorMsg += "your paths when using RequireJS/AMD";
            throw new Error(errorMsg);
        }

        this.isInitialised = false;
        this._isFullPage = false;
        this._resizeTimeoutId = null;
        // this._components = {"lm-react-component": lm.utils.ReactComponentHandler};
        this._components = {};
        this._itemAreas = [];
        this._resizeFunction = () => this._onResize();
        this._unloadFunction = () => this._onUnload();
        this._maximisedItem = null;
        this._maximisePlaceholder = $("<div class=\"lm_maximise_place\"></div>");
        this._creationTimeoutPassed = false;
        this._subWindowsCreated = false;
        this._dragSources = [];
        this._updatingColumnsResponsive = false;
        this._firstLoad = true;

        this.width = null;
        this.height = null;
        this.root = null;
        this.openPopouts = [];
        this.selectedItem = null;
        this.isSubWindow = false;
        this.eventHub = new EventHub(this);
        this.config = this._createConfig(config);
        this.container = container;
        this.dropTargetIndicator = null;
        this.transitionIndicator = null;
        this.tabDropPlaceholder = $("<div class=\"lm_drop_tab_placeholder\"></div>");
        /*
                if (this.isSubWindow === true) {
                    $("body")
                        .css("visibility", "hidden");
                }*/

        this._typeToItem = {
            column: this.fnBind(components.RowOrColumn, this, [true]),
            row: this.fnBind(components.RowOrColumn, this, [false]),
            stack: components.Stack,
            component: components.Component
        };
    }

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
    registerComponent(name, constructor) {
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
        next = function (configNode, item) {
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
         * Retrieve config for subwindows
         */
        this._$reconcilePopoutWindows();
        config.openPopouts = [];
        for (i = 0; i < this.openPopouts.length; i++) {
            config.openPopouts.push(this.openPopouts[i].toConfig());
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
         * Create the popout windows straight away. If popouts are blocked
         * an error is thrown on the same 'thread' rather than a timeout and can
         * be caught. This also prevents any further initilisation from taking place.
         */
        if (this._subWindowsCreated === false) {
            this._createSubWindows();
            this._subWindowsCreated = true;
        }


        /**
         * If the document isn't ready yet, wait for it.
         */
        if (document.readyState === "loading" || document.body === null) {
            $(document).ready(() => this.init());
            return;
        }

        /**
         * If this is a subwindow, wait a few milliseconds for the original
         * page's js calls to be executed, then replace the bodies content
         * with GoldenLayout
         */
        if (this.isSubWindow === true && this._creationTimeoutPassed === false) {
            setTimeout(() => this.init(), 7);
            this._creationTimeoutPassed = true;
            return;
        }

        if (this.isSubWindow === true) {
            this._adjustToWindowMode();
        }

        this._setContainer();
        this.dropTargetIndicator = new DropTargetIndicator();
        this.transitionIndicator = new components.TransitionIndicatorComponent();
        this.updateSize();
        this._create(this.config);
        this._bindEvents();
        this.isInitialised = true;
        this._adjustColumnsResponsive();
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

            this._adjustColumnsResponsive();
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
        this._onUnload();
        $(window)
            .off("resize", this._resizeFunction);
        $(window)
            .off("unload beforeunload", this._unloadFunction);
        this.root.callDownwards("_$destroy", [], true);
        this.root.contentItems = [];
        this.tabDropPlaceholder.remove();
        this.dropTargetIndicator.destroy();
        this.transitionIndicator.destroy();
        this.eventHub.destroy();

        this._dragSources.forEach(function (dragSource) {
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
    createContentItem(config, parent) {
        let typeErrorMsg, contentItem;

        if (typeof config.type !== "string") {
            throw new ConfigurationError("Missing parameter 'type'", config);
        }

        if (config.type === "react-component") {
            config.type = "component";
            config.componentName = "lm-react-component";
        }

        if (!this._typeToItem[config.type]) {
            typeErrorMsg = "Unknown type '" + config.type + "'. " +
                "Valid types are " + Object.keys(this._typeToItem)
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
            !(parent instanceof components.Stack) &&

            // and we have a parent
            !!parent &&

            // and it's not the topmost item in a new window
            !(this.isSubWindow === true && parent instanceof components.Root)
        ) {
            config = {
                type: "stack",
                width: config.width,
                height: config.height,
                content: [config]
            };
        }

        contentItem = new this._typeToItem[config.type](this, config, parent);
        return contentItem;
    }

    /**
     * Creates a popout window with the specified content and dimensions
     */
    createPopout(configOrContentItem, dimensions?, parentId?: string, indexInParent?: number) {
        let config = configOrContentItem,

            windowLeft,
            windowTop,
            offset,
            parent,
            child,
            browserPopout;

        const isItem = configOrContentItem instanceof components.AbstractContentItemComponent
            || configOrContentItem instanceof components.AbstractContentItemComponent;
        const self = this;

        parentId = parentId || null;

        if (isItem) {
            config = this.toConfig(configOrContentItem).content;
            parentId = createGuid();

            /**
             * If the item is the only component within a stack or for some
             * other reason the only child of its parent the parent will be destroyed
             * when the child is removed.
             *
             * In order to support this we move up the tree until we find something
             * that will remain after the item is being popped out
             */
            parent = configOrContentItem.parent;
            child = configOrContentItem;
            while (parent.contentItems.length === 1 && !parent.isRoot) {
                parent = parent.parent;
                child = child.parent;
            }

            parent.addId(parentId);
            if (isNaN(indexInParent)) {
                indexInParent = this.layoutManagerUtilities.indexOf(child, parent.contentItems);
            }
        } else {
            if (!(config instanceof Array)) {
                config = [config];
            }
        }


        if (!dimensions && isItem) {
            windowLeft = window.screenX || window.screenLeft;
            windowTop = window.screenY || window.screenTop;
            offset = configOrContentItem.element.offset();

            dimensions = {
                left: windowLeft + offset.left,
                top: windowTop + offset.top,
                width: configOrContentItem.element.width(),
                height: configOrContentItem.element.height()
            };
        }

        if (!dimensions && !isItem) {
            dimensions = {
                left: window.screenX || window.screenLeft + 20,
                top: window.screenY || window.screenTop + 20,
                width: 500,
                height: 309
            };
        }

        if (isItem) {
            configOrContentItem.remove();
        }

        browserPopout = new components.BrowserPopout(config, dimensions, parentId, indexInParent, this);

        browserPopout.on("initialised", function () {
            self.emit("windowOpened", browserPopout);
        });

        browserPopout.on("closed", function () {
            self._$reconcilePopoutWindows();
        });

        this.openPopouts.push(browserPopout);

        return browserPopout;
    }

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

    /**
     * This method is used to get around sandboxed iframe restrictions.
     * If 'allow-top-navigation' is not specified in the iframe's 'sandbox' attribute
     * (as is the case with codepens) the parent window is forbidden from calling certain
     * methods on the child, such as window.close() or setting document.location.href.
     *
     * This prevented GoldenLayout popouts from popping in in codepens. The fix is to call
     * _$closeWindow on the child window's gl instance which (after a timeout to disconnect
     * the invoking method from the close call) closes itself.
     */
    _$closeWindow() {
        window.setTimeout(function () {
            window.close();
        }, 1);
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
            if (sides [side])
                area[side] = area[sides [side]] - areaSize;
            else
                area[side] = areaSize;
            area.surface = (area.x2 - area.x1) * (area.y2 - area.y1);
            this._itemAreas.push(area);
        }
    }

    _$calculateItemAreas() {
        let i, area;
        const allContentItems = this._getAllContentItems();
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
                continue;
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

        if (contentItemOrConfig instanceof components.AbstractContentItemComponent || contentItemOrConfig instanceof components.AbstractContentItemComponent) {
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

    /**
     * Iterates through the array of open popout windows and removes the ones
     * that are effectively closed. This is necessary due to the lack of reliably
     * listening for window.close / unload events in a cross browser compatible fashion.
     */
    _$reconcilePopoutWindows() {
        const openPopouts = [];

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.openPopouts.length; i++) {
            if (this.openPopouts[i].getWindow().closed === false) {
                openPopouts.push(this.openPopouts[i]);
            } else {
                this.emit("windowClosed", this.openPopouts[i]);
            }
        }

        if (this.openPopouts.length !== openPopouts.length) {
            this.emit("stateChanged");
            this.openPopouts = openPopouts;
        }

    }

    /***************************
     * PRIVATE
     ***************************/
    /**
     * Returns a flattened array of all content items,
     * regardles of level or type
     */
    _getAllContentItems() {
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

    /**
     * Binds to DOM/BOM events on init
     */
    _bindEvents() {
        if (this._isFullPage) {
            $(window)
                .resize(this._resizeFunction);
        }
        $(window)
            .on("unload beforeunload", this._unloadFunction);
    }

    /**
     * Debounces resize events
     */
    _onResize() {
        clearTimeout(this._resizeTimeoutId);
        this._resizeTimeoutId = setTimeout(() => this.updateSize(), 100);
    }

    /**
     * Extends the default config with the user specific settings and applies
     * derivations. Please note that there's a seperate method (AbstractContentItem._extendItemNode)
     * that deals with the extension of item configs
     */
    _createConfig(config) {
        const windowConfigKey = this.layoutManagerUtilities.getQueryStringParam("gl-window");

        if (windowConfigKey) {
            this.isSubWindow = true;
            config = localStorage.getItem(windowConfigKey);
            config = JSON.parse(config);
            config = (new ConfigMinifier()).unminifyConfig(config);
            localStorage.removeItem(windowConfigKey);
        }

        config = $.extend(true, {}, { // default config
            openPopouts: [],
            settings: {
                hasHeaders: true,
                constrainDragToContainer: true,
                reorderEnabled: true,
                selectionEnabled: false,
                popoutWholeStack: false,
                blockedPopoutsThrowError: true,
                closePopoutsOnUnload: true,
                showPopoutIcon: true,
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
                popout: "open in new window",
                popin: "pop in",
                tabDropdown: "additional tabs"
            }
        }, config);

        const nextNode = function (node) {
            for (const key in node) {
                if (key !== "props" && typeof node[key] === "object") {
                    nextNode(node[key]);
                } else if (key === "type" && node[key] === "react-component") {
                    node.type = "component";
                    node.componentName = "lm-react-component";
                }
            }
        };

        nextNode(config);

        if (config.settings.hasHeaders === false) {
            config.dimensions.headerHeight = 0;
        }

        return config;
    }

    /**
     * This is executed when GoldenLayout detects that it is run
     * within a previously opened popout window.
     */
    _adjustToWindowMode() {
        const popInButton = $("<div class=\"lm_popin\" title=\"" + this.config.labels.popin + "\">" +
            "<div class=\"lm_icon\"></div>" +
            "<div class=\"lm_bg\"></div>" +
            "</div>");

        popInButton.click(() => this.emit("popIn"));

        document.title = stripHtmlTags(this.config.content[0].title);

        $("head")
            .append($("body link, body style, template, .gl_keep"));

        this.container = $("body")
            .html("")
            .css("visibility", "visible")
            .append(popInButton);

        /*
         * This seems a bit pointless, but actually causes a reflow/re-evaluation getting around
         * slickgrid's "Cannot find stylesheet." bug in chrome
         */
        const x = document.body.offsetHeight; // jshint ignore:line

        /*
         * Expose this instance on the window object
         * to allow the opening window to interact with
         * it
         */
        (window as any).__glInstance = this;
    }

    /**
     * Creates Subwindows (if there are any). Throws an error
     * if popouts are blocked.
     */
    _createSubWindows() {
        let i, popout;

        for (i = 0; i < this.config.openPopouts.length; i++) {
            popout = this.config.openPopouts[i];

            this.createPopout(
                popout.content,
                popout.dimensions,
                popout.parentId,
                popout.indexInParent
            );
        }
    }

    /**
     * Determines what element the layout will be created in
     */
    _setContainer() {
        const container = $(this.container || "body");

        if (container.length === 0) {
            throw new Error("GoldenLayout container not found");
        }

        if (container.length > 1) {
            throw new Error("GoldenLayout more than one container element specified");
        }

        if (container[0] === document.body) {
            this._isFullPage = true;

            $("html, body").css({
                height: "100%",
                margin: 0,
                padding: 0,
                overflow: "hidden"
            });
        }

        this.container = container;
    }

    /**
     * Kicks of the initial, recursive creation chain
     */
    _create(config) {
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

    /**
     * Called when the window is closed or the user navigates away
     * from the page
     */
    _onUnload() {
        if (this.config.settings.closePopoutsOnUnload === true) {
            for (let i = 0; i < this.openPopouts.length; i++) {
                this.openPopouts[i].close();
            }
        }
    }

    /**
     * Adjusts the number of columns to be lower to fit the screen and still maintain minItemWidth.
     */
    _adjustColumnsResponsive() {

        // If there is no min width set, or not content items, do nothing.
        if (!this._useResponsiveLayout() || this._updatingColumnsResponsive || !this.config.dimensions || !this.config.dimensions.minItemWidth || this.root.contentItems.length === 0 || !this.root.contentItems[0].isRow) {
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
        const firstStackContainer = this._findAllStackContainers()[0];
        for (let i = 0; i < stackColumnCount; i++) {
            // Stack from right.
            const column = rootContentItem.contentItems[rootContentItem.contentItems.length - 1];
            this._addChildContentItemsToContainer(firstStackContainer, column);
        }

        this._updatingColumnsResponsive = false;
    }

    /**
     * Determines if responsive layout should be used.
     */
    _useResponsiveLayout() {
        return this.config.settings && (this.config.settings.responsiveMode === "always" || (this.config.settings.responsiveMode === "onload" && this._firstLoad));
    }

    /**
     * Adds all children of a node to another container recursivel
     */
    _addChildContentItemsToContainer(container, node) {
        if (node.type === "stack") {
            node.contentItems.forEach(function (item) {
                container.addChild(item);
                node.removeChild(item, true);
            });
        } else {
            node.contentItems.forEach(x => this._addChildContentItemsToContainer(container, x));
        }
    }

    /**
     * Finds all the stack containers.
     */
    _findAllStackContainers() {
        const stackContainers = [];
        this._findAllStackContainersRecursive(stackContainers, this.root);

        return stackContainers;
    }

    /**
     * Finds all the stack containers.
     */
    _findAllStackContainersRecursive(stackContainers, node) {
        node.contentItems.forEach(x => {
            if (x.type === "stack") {
                stackContainers.push(x);
            } else if (!x.isComponent) {
                this._findAllStackContainersRecursive(stackContainers, x);
            }
        });
    }
}
