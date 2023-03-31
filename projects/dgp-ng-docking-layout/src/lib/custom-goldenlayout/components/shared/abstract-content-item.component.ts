import { Directive } from "@angular/core";
import { DockingLayoutService } from "../../docking-layout.service";
import { HeaderConfig, ItemConfiguration, itemDefaultConfig } from "../../types";
import { BubblingEvent, EventEmitter, LayoutManagerUtilities } from "../../utilities";
import { goldenLayoutEngineConfig } from "../../constants/golden-layout-engine-config.constant";
import { AreaSides } from "../../models/area.model";
import { ALL_EVENT } from "../../constants/event-types/all-event.constant";
import { stateChangedEventType } from "../../constants/event-types/state-changed-event-type.constant";
import { itemCreatedEventType } from "../../constants/event-types/item-created-event-type.constant";
import { beforeItemDestroyedEventType } from "../../constants/event-types/before-item-destroyed-event-type.constant";
import { itemDestroyedEventType } from "../../constants/event-types/item-destroyed-event-type.constant";
import { createItemTypeCreatedEventType } from "../../functions/create-item-type-created-event-type.function";
import { StackComponent } from "../tabs/stack.component";
import { DropSegment } from "../../models/drop-segment.model";
import { RootComponent } from "../root.component";

/**
 * this is the baseclass that all content items inherit from.
 * Most methods provide a subset of what the sub-classes do.
 *
 * It also provides a number of functions for tree traversal
 */
@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AbstractContentItemComponent extends EventEmitter {

    _side: boolean | DropSegment;
    _sided: boolean;
    _header: HeaderConfig;

    contentItems: (AbstractContentItemComponent | StackComponent)[] = [];

    isInitialised = false;
    isMaximised = false;
    isRoot = false;
    isRow = false;
    isColumn = false;
    isStack = false;
    isComponent = false;

    element: JQuery;
    childElementContainer: JQuery;

    pendingEventPropagations = {};
    throttledEvents = [stateChangedEventType];

    protected constructor(
        readonly dockingLayoutService: DockingLayoutService,
        readonly config: ItemConfiguration,
        public parent: AbstractContentItemComponent | RootComponent
    ) {
        super();

        this.config = {...itemDefaultConfig, ...config};
        this.on(ALL_EVENT, this.propagateEvent, this);
        if (config.content) this.createContentItems(config);
    }

    /**
     * Calls a method recursively downwards on the tree
     */
    callDownwards(functionName: string,
                  functionArguments?: any[],
                  bottomUp?: boolean,
                  skipSelf?: boolean) {
        if (bottomUp !== true && skipSelf !== true) {
            this[functionName].apply(this, functionArguments || []);
        }
        for (let i = 0; i < this.contentItems.length; i++) {
            this.contentItems[i].callDownwards(functionName, functionArguments, bottomUp);
        }
        if (bottomUp === true && skipSelf !== true) {
            this[functionName].apply(this, functionArguments || []);
        }
    }

    /**
     * Removes a child node (and its children) from the tree
     */
    removeChild(contentItem: AbstractContentItemComponent, keepChild?: boolean) {

        /*
         * Get the position of the item that's to be removed within all content items this node contains
         */
        const index = this.contentItems.indexOf(contentItem);

        /**
         * Call .destroy on the content item. this also calls .destroy on all its children
         */
        if (keepChild !== true) {
            this.contentItems[index].destroy();
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
    }

    /**
     * Sets up the tree structure for the newly added child
     * The responsibility for the actual DOM manipulations lies
     * with the concrete item
     */
    addChild(contentItem: AbstractContentItemComponent, index?: number, foo?: boolean) {
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
            contentItem.init();
        }
    }

    /**
     * Replaces oldChild with newChild. this used to use jQuery.replaceWith... which for
     * some reason removes all event listeners, so isn't really an option.
     */
    replaceChild(oldChild: AbstractContentItemComponent, newChild: AbstractContentItemComponent, destroyOldChild?: boolean) {

        const index = this.contentItems.indexOf(oldChild);
        const parentNode = oldChild.element[0].parentNode;

        parentNode.replaceChild(newChild.element[0], oldChild.element[0]);

        /*
         * Optionally destroy the old content item
         */
        if (destroyOldChild === true) {
            oldChild.parent = null;
            oldChild.destroy();
        }

        /*
         * Wire the new contentItem into the tree
         */
        this.contentItems[index] = newChild;
        newChild.parent = this;

        // TODO this doesn't update the config... refactor to leave item nodes untouched after creation
        if (newChild.parent.isInitialised === true && newChild.isInitialised === false) {
            newChild.init();
        }

        this.callDownwards("setSize");
    }

    /**
     * Convenience method.
     * Shorthand for this.parent.removeChild( this )
     */
    remove() {
        this.parent.removeChild(this);
    }

    /****************************************
     * PACKAGE PRIVATE
     ****************************************/
    //noinspection TsLint
    _$setParent(parent: AbstractContentItemComponent) {
        this.parent = parent;
    }

    highlightDropZone(x: number, y: number, area: AreaSides) {
        this.dockingLayoutService.dropTargetIndicator.highlightArea(area);
    }

    hide() {
        this.callOnActiveComponents("hide");
        this.element.hide();
        this.dockingLayoutService.updateSize();
    }

    show() {
        this.callOnActiveComponents("show");
        this.element.show();
        this.dockingLayoutService.updateSize();
    }

    private callOnActiveComponents(methodName: string): void {
        this.contentItems.filter(x => x.config.type === "stack")
            .map(x => x as StackComponent)
            .map(stack => stack.getActiveContentItem())
            .forEach(component => component[methodName]());
    }

    /**
     * Destroys this item ands its children
     */
    destroy() {
        this.unsubscribe();
        this.emitBubblingEvent(beforeItemDestroyedEventType);
        this.callDownwards("destroy", [], true, true);
        this.element.remove();
        this.emitBubblingEvent(itemDestroyedEventType);
    }

    /**
     * The tree of content items is created in two steps: First all content items are instantiated,
     * then init is called recursively from top to bottem. this is the basic init function,
     * it can be used, extended or overwritten by the content items
     *
     * Its behaviour depends on the content item
     *
     * @package private
     */
    init(): void {
        for (let i = 0; i < this.contentItems.length; i++) {
            this.childElementContainer.append(this.contentItems[i].element);
        }

        this.isInitialised = true;
        this.emitBubblingEvent(itemCreatedEventType);
        this.emitBubblingEvent(createItemTypeCreatedEventType(this.config.type));
    }

    /**
     * Emit an event that bubbles up the item tree.
     */
    emitBubblingEvent(name: string) {
        const event = new BubblingEvent(name, this);
        this.emit(name, event);
    }

    /**
     * Private method, creates all content items for this node at initialisation time
     * PLEASE NOTE, please see addChild for adding contentItems add runtime
     */
    private createContentItems(config: ItemConfiguration) {
        this.contentItems = config.content.map(x => this.dockingLayoutService.createContentItem(x, this));
    }

    /**
     * Called for every event on the item tree. Decides whether the event is a bubbling
     * event and propagates it to its parent
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
                (this.parent as AbstractContentItemComponent).emit?.apply(this.parent, Array.prototype.slice.call(arguments, 0));
            } else {
                this.scheduleEventPropagationToLayoutManager(name, event);
            }
        }
    }

    /**
     * All raw events bubble up to the root element. Some events that
     * are propagated to - and emitted by - the layoutManager however are
     * only string-based, batched and sanitized to make them more usable
     */
    private scheduleEventPropagationToLayoutManager(name: string, event) {
        if (new LayoutManagerUtilities().indexOf(name, this.throttledEvents) === -1) {
            this.dockingLayoutService.emit(name, event.origin);
        } else {
            if (this.pendingEventPropagations[name] !== true) {
                this.pendingEventPropagations[name] = true;
                new LayoutManagerUtilities().animFrame(() => this.propagateEventToLayoutManager(name, event));
            }
        }

    }

    /**
     * Callback for events scheduled by _scheduleEventPropagationToLayoutManager
     */
    private propagateEventToLayoutManager(name: string, event) {
        this.pendingEventPropagations[name] = false;
        this.dockingLayoutService.emit(name, event);
    }
}

