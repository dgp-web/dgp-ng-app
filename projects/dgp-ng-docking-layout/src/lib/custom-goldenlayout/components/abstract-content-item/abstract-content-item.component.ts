import { BubblingEvent, ALL_EVENT, EventEmitter, LayoutManagerUtilities } from "../../utilities";
import { ItemConfiguration, ItemType, itemDefaultConfig, ConfigurationError } from "../../types";
import { LayoutManager } from "../../layout-manager";

/**
 * this is the baseclass that all content items inherit from.
 * Most methods provide a subset of what the sub-classes do.
 *
 * It also provides a number of functions for tree traversal
 *
 * @param {LayoutManager} layoutManager
 * @param {ItemConfiguration} config
 * @param {AbstractContentItemComponent} parent
 *
 * @event stateChanged
 * @event beforeItemDestroyed
 * @event itemDestroyed
 * @event itemCreated
 * @event componentCreated
 * @event rowCreated
 * @event columnCreated
 * @event stackCreated
 *
 * @constructor
 */
export abstract class AbstractContentItemComponent extends EventEmitter {

    contentItems: AbstractContentItemComponent[] = [];

    isInitialised = false;
    isMaximised = false;
    isRoot = false;
    isRow = false;
    isColumn = false;
    isStack = false;
    isComponent = false;
    element: any;
    childElementContainer: any;

    private pendingEventPropagations = {};
    private throttledEvents = ["stateChanged"];
    private type: ItemType;
    private config: any;

    constructor(private layoutManager: LayoutManager, config: ItemConfiguration, private parent: AbstractContentItemComponent) {
        super();

        this.type = config.type;
        this.contentItems = [];

        this.isInitialised = false;
        this.isMaximised = false;
        this.isRoot = false;
        this.isRow = false;
        this.isColumn = false;
        this.isStack = false;
        this.isComponent = false;

        this.config = AbstractContentItemComponent.extendItemNode(config);

        this.on(ALL_EVENT, this.propagateEvent, this);

        if (config.content) {
            this.createContentItems(config);
        }

    }

    /**
     * Set the size of the component and its children, called recursively
     *
     * @abstract
     * @returns void
     */
    abstract setSize(width?: number, height?: number): void;

    /**
     * Calls a method recursively downwards on the tree
     *
     * @param   {String} functionName      the name of the function to be called
     * @param   {[Array]}functionArguments optional arguments that are passed to every function
     * @param   {[boolean]} bottomUp          Call methods from bottom to top, defaults to false
     * @param   {[boolean]} skipSelf          Don't invoke the method on the class that calls it, defaults to false
     *
     * @returns {void}
     */
    callDownwards(functionName: string, functionArguments?: any[], bottomUp?: boolean, skipSelf?: boolean) {
        let i;

        if (bottomUp !== true && skipSelf !== true) {
            this[functionName].apply(this, functionArguments || []);
        }
        for (i = 0; i < this.contentItems.length; i++) {
            this.contentItems[i].callDownwards(functionName, functionArguments, bottomUp);
        }
        if (bottomUp === true && skipSelf !== true) {
            this[functionName].apply(this, functionArguments || []);
        }
    }

    /**
     * Removes a child node (and its children) from the tree
     *
     * @param   {AbstractContentItemComponent} contentItem
     *
     * @param keepChild
     * @returns {void}
     */
    removeChild(contentItem: AbstractContentItemComponent, keepChild?: boolean) {

        /*
         * Get the position of the item that's to be removed within all content items this node contains
         */
        const index = this.contentItems.indexOf(contentItem);

        /*
         * Make sure the content item to be removed is actually a child of this item
         */
        if (index === -1) {
            throw new Error("Can't remove child item. Unknown content item");
        }

        /**
         * Call ._$destroy on the content item. this also calls ._$destroy on all its children
         */
        if (keepChild !== true) {
            this.contentItems[index]._$destroy();
        }

        /**
         * Remove the content item from this nodes array of children
         */
        this.contentItems.splice(index, 1);

        /**
         * Remove the item from the configuration
         */
        this.config.content.splice(index, 1);

        /**
         * If this node still contains other content items, adjust their size
         */
        if (this.contentItems.length > 0) {
            this.callDownwards("setSize");

            /**
             * If this was the last content item, remove this node as well
             */
        } else if (!(this.isRoot) && this.config.isClosable === true) {
            this.parent.removeChild(this);
        }
    };

    /**
     * Sets up the tree structure for the newly added child
     * The responsibility for the actual DOM manipulations lies
     * with the concrete item
     *
     * @param {AbstractContentItemComponent} contentItem
     * @param {[Int]} index If omitted item will be appended
     */
    addChild(contentItem: AbstractContentItemComponent, index?: number) {
        if (index === undefined) {
            index = this.contentItems.length;
        }

        this.contentItems.splice(index, 0, contentItem);

        if (this.config.content === undefined) {
            this.config.content = [];
        }

        this.config.content.splice(index, 0, contentItem.config);
        contentItem.parent = this;

        if (contentItem.parent.isInitialised === true && contentItem.isInitialised === false) {
            contentItem._$init();
        }
    }

    /**
     * Replaces oldChild with newChild. this used to use jQuery.replaceWith... which for
     * some reason removes all event listeners, so isn't really an option.
     *
     * @param   {AbstractContentItemComponent} oldChild
     * @param   {AbstractContentItemComponent} newChild
     *
     * @param _$destroyOldChild
     * @returns {void}
     */
    replaceChild(oldChild: AbstractContentItemComponent, newChild: AbstractContentItemComponent, _$destroyOldChild: boolean) {

        newChild = this.layoutManager._$normalizeContentItem(newChild);

        const index = this.contentItems.indexOf(oldChild);
        const parentNode = oldChild.element[0].parentNode;

        if (index === -1) {
            throw new Error("Can't replace child. oldChild is not child of this");
        }

        parentNode.replaceChild(newChild.element[0], oldChild.element[0]);

        /*
         * Optionally destroy the old content item
         */
        if (_$destroyOldChild === true) {
            oldChild.parent = null;
            oldChild._$destroy();
        }

        /*
         * Wire the new contentItem into the tree
         */
        this.contentItems[index] = newChild;
        newChild.parent = this;

        /*
         * Update tab reference
         */
        if (this.isStack) {
            (this as any).header.tabs[index].contentItem = newChild;
        }

        // TODO this doesn't update the config... refactor to leave item nodes untouched after creation
        if (newChild.parent.isInitialised === true && newChild.isInitialised === false) {
            newChild._$init();
        }

        this.callDownwards("setSize");
    }

    /**
     * Convenience method.
     * Shorthand for this.parent.removeChild( this )
     *
     * @returns {void}
     */
    remove() {
        this.parent.removeChild(this);
    }

    /**
     * Removes the component from the layout and creates a new
     * browser window with the component and its children inside
     *
     * @returns {BrowserPopout}
     */
    popout() {
        const browserPopout = this.layoutManager.createPopout(this);
        this.emitBubblingEvent("stateChanged");
        return browserPopout;
    }

    /**
     * Maximises the Item or minimises it if it is already maximised
     *
     * @returns {void}
     */
    toggleMaximise(e?) {
        //noinspection TsLint
        e && e.preventDefault();
        if (this.isMaximised === true) {
            this.layoutManager._$minimiseItem(this);
        } else {
            this.layoutManager._$maximiseItem(this);
        }

        this.isMaximised = !this.isMaximised;
        this.emitBubblingEvent("stateChanged");
    }

    /**
     * Selects the item if it is not already selected
     *
     * @returns {void}
     */
    select() {
        if (this.layoutManager.selectedItem !== this) {
            this.layoutManager.selectItem(this, true);
            this.element.addClass("lm_selected");
        }
    }

    /**
     * De-selects the item if it is selected
     *
     * @returns {void}
     */
    deselect() {
        if (this.layoutManager.selectedItem === this) {
            this.layoutManager.selectedItem = null;
            this.element.removeClass("lm_selected");
        }
    }

    /**
     * Checks whether a provided id is present
     *
     * @public
     * @param   {String}  id
     *
     * @returns {Boolean} isPresent
     */
    hasId(id: string) {
        if (!this.config.id) {
            return false;
        } else if (typeof this.config.id === "string") {
            return this.config.id === id;
        } else if (this.config.id instanceof Array) {
            return new LayoutManagerUtilities().indexOf(id, this.config.id) !== -1;
        }
    }

    /**
     * Adds an id. Adds it as a string if the component doesn't
     * have an id yet or creates/uses an array
     *
     * @public
     * @param {String} id
     *
     * @returns {void}
     */
    addId(id: string) {
        if (this.hasId(id)) {
            return;
        }

        if (!this.config.id) {
            this.config.id = id;
        } else if (typeof this.config.id === "string") {
            this.config.id = [this.config.id, id];
        } else if (this.config.id instanceof Array) {
            this.config.id.push(id);
        }
    }

    /**
     * Removes an existing id. Throws an error
     * if the id is not present
     *
     * @public
     * @param   {String} id
     *
     * @returns {void}
     */
    removeId(id: string) {
        if (!this.hasId(id)) {
            throw new Error("Id not found");
        }

        if (typeof this.config.id === "string") {
            delete this.config.id;
        } else if (this.config.id instanceof Array) {
            const index = new LayoutManagerUtilities().indexOf(id, this.config.id);
            this.config.id.splice(index, 1);
        }
    }

    /****************************************
     * SELECTOR
     ****************************************/
    getItemsByFilter(filter) {
        const result = [];
        const next = function (contentItem) {
            for (let i = 0; i < contentItem.contentItems.length; i++) {

                if (filter(contentItem.contentItems[i]) === true) {
                    result.push(contentItem.contentItems[i]);
                }

                next(contentItem.contentItems[i]);
            }
        };

        next(this);
        return result;
    }

    getItemsById(id: string) {
        return this.getItemsByFilter(function (item) {
            if (item.config.id instanceof Array) {
                return LayoutManagerUtilities()
                    .indexOf(id, item.config.id) !== -1;
            } else {
                return item.config.id === id;
            }
        });
    }

    getItemsByType(type: string) {
        return this._$getItemsByProperty("type", type);
    }

    /****************************************
     * PACKAGE PRIVATE
     ****************************************/
    _$getItemsByProperty(key: string, value) {
        return this.getItemsByFilter(function (item) {
            return item[key] === value;
        });
    }

    //noinspection TsLint
    _$setParent(parent: AbstractContentItemComponent) {
        this.parent = parent;
    }

    _$highlightDropZone(x: number, y: number, area) {
        this.layoutManager.dropTargetIndicator.highlightArea(area);
    }

    _$onDrop(contentItem: AbstractContentItemComponent) {
        this.addChild(contentItem);
    }


    _$hide() {
        this._callOnActiveComponents("hide");
        this.element.hide();
        this.layoutManager.updateSize();
    }

    _$show() {
        this._callOnActiveComponents("show");
        this.element.show();
        this.layoutManager.updateSize();
    }

    _callOnActiveComponents(methodName: string) {
        const stacks = this.getItemsByType("stack");
        let activeContentItem;
        let i;

        for (i = 0; i < stacks.length; i++) {
            activeContentItem = stacks[i].getActiveContentItem();

            if (activeContentItem && activeContentItem.isComponent) {
                activeContentItem.container[methodName]();
            }
        }
    }

    /**
     * Destroys this item ands its children
     *
     * @returns {void}
     */
    _$destroy() {
        this.unsubscribe();
        this.emitBubblingEvent("beforeItemDestroyed");
        this.callDownwards("_$destroy", [], true, true);
        this.element.remove();
        this.emitBubblingEvent("itemDestroyed");
    }

    /**
     * Returns the area the component currently occupies in the format
     *
     * {
	 *		x1: int
	 *		xy: int
	 *		y1: int
	 *		y2: int
	 *		contentItem: contentItem
	 * }
     */
    _$getArea(element) {
        element = element || this.element;

        const offset = element.offset(),
            width = element.width(),
            height = element.height();

        return {
            x1: offset.left,
            y1: offset.top,
            x2: offset.left + width,
            y2: offset.top + height,
            surface: width * height,
            contentItem: this
        };
    }

    /**
     * The tree of content items is created in two steps: First all content items are instantiated,
     * then init is called recursively from top to bottem. this is the basic init function,
     * it can be used, extended or overwritten by the content items
     *
     * Its behaviour depends on the content item
     *
     * @package private
     *
     * @returns {void}
     */
    _$init() {
        let i;
        this.setSize();

        for (i = 0; i < this.contentItems.length; i++) {
            this.childElementContainer.append(this.contentItems[i].element);
        }

        this.isInitialised = true;
        this.emitBubblingEvent("itemCreated");
        this.emitBubblingEvent(this.type + "Created");
    }

    /**
     * Emit an event that bubbles up the item tree.
     *
     * @param   {String} name The name of the event
     *
     * @returns {void}
     */
    emitBubblingEvent(name: string) {
        const event = new BubblingEvent(name, this);
        this.emit(name, event);
    }

    //noinspection TsLint
    /**
     * Private method, creates all content items for this node at initialisation time
     * PLEASE NOTE, please see addChild for adding contentItems add runtime
     * @private
     * @param   {ItemConfiguration} config
     *
     * @returns {void}
     */
    private createContentItems(config: ItemConfiguration) {
        let oContentItem, i;

        if (!(config.content instanceof Array)) {
            throw new ConfigurationError("content must be an Array", config);
        }

        for (i = 0; i < config.content.length; i++) {
            oContentItem = this.layoutManager.createContentItem(config.content[i], this);
            this.contentItems.push(oContentItem);
        }
    }

    //noinspection TsLint
    /**
     * Extends an item configuration node with default settings
     * @private
     * @param   {ItemConfiguration} config
     *
     * @returns {ItemConfiguration} extended config
     */
    private static extendItemNode(config: ItemConfiguration) {

        for (const key in itemDefaultConfig) {
            if (config[key] === undefined) {
                config[key] = itemDefaultConfig[key];
            }
        }

        return config;
    };

    /**
     * Called for every event on the item tree. Decides whether the event is a bubbling
     * event and propagates it to its parent
     *
     * @param    {String} name the name of the event
     * @param   {BubblingEvent} event
     *
     * @returns {void}
     */
    private propagateEvent(name: string, event: BubblingEvent) {
        if (event instanceof BubblingEvent &&
            event.isPropagationStopped === false &&
            this.isInitialised === true) {

            /**
             * In some cases (e.g. if an element is created from a DragSource) it
             * doesn't have a parent and is not below root. If that's the case
             * propagate the bubbling event from the top level of the substree directly
             * to the layoutManager
             */
            if (this.isRoot === false && this.parent) {
                this.parent.emit.apply(this.parent, Array.prototype.slice.call(arguments, 0));
            } else {
                this.scheduleEventPropagationToLayoutManager(name, event);
            }
        }
    }

    /**
     * All raw events bubble up to the root element. Some events that
     * are propagated to - and emitted by - the layoutManager however are
     * only string-based, batched and sanitized to make them more usable
     *
     * @param {String} name the name of the event
     * @param event
     * @private
     * @returns {void}
     */
    private scheduleEventPropagationToLayoutManager(name: string, event) {
        if (new LayoutManagerUtilities().indexOf(name, this.throttledEvents) === -1) {
            this.layoutManager.emit(name, event.origin);
        } else {
            if (this.pendingEventPropagations[name] !== true) {
                this.pendingEventPropagations[name] = true;
                new LayoutManagerUtilities().animFrame(() => this.propagateEventToLayoutManager(name, event));
            }
        }

    }

    /**
     * Callback for events scheduled by _scheduleEventPropagationToLayoutManager
     *
     * @param {String} name the name of the event
     *
     * @param event
     * @private
     * @returns {void}
     */
    private propagateEventToLayoutManager(name: string, event) {
        this.pendingEventPropagations[name] = false;
        this.layoutManager.emit(name, event);
    }


}

