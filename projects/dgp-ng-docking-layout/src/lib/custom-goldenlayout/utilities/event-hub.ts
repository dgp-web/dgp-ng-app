import { ALL_EVENT, EventEmitter } from "./event-emitter";

declare var $: any;

/**
 * An EventEmitter singleton that propagates events
 * across multiple windows. This is a little bit trickier since
 * windows are allowed to open childWindows in their own right
 *
 * This means that we deal with a tree of windows. Hence the rules for event propagation are:
 *
 * - Propagate events from this layout to both parents and children
 * - Propagate events from parent to this and children
 * - Propagate events from children to the other children (but not the emitting one) and the parent
 */
export class EventHub extends EventEmitter {
    private readonly layoutManager: any;
    private readonly boundOnEventFromChild: any;
    private childEventSource: null;
    private dontPropagateToParent: null;

    constructor(layoutManager) {
        super();

        this.layoutManager = layoutManager;
        this.dontPropagateToParent = null;
        this.childEventSource = null;
        this.on(ALL_EVENT, (e) => this._onEventFromThis() as any);
        this.boundOnEventFromChild = this._onEventFromChild;
        $(window)
            .on("gl_child_event", this.boundOnEventFromChild);
    }

    /**
     * Called on every event emitted on this eventHub, regardles of origin.
     */
    _onEventFromThis() {
        const args = Array.prototype.slice.call(arguments);

        if (this.layoutManager.isSubWindow && args[0] !== this.dontPropagateToParent) {
            this._propagateToParent(args);
        }
        this._propagateToChildren(args);

        // Reset
        this.dontPropagateToParent = null;
        this.childEventSource = null;
    }

    /**
     * Called by the parent layout.
     */
    _$onEventFromParent(args) {
        this.dontPropagateToParent = args[0];
        this.emit(args);
    }

    /**
     * Callback for child events raised on the window
     */
    _onEventFromChild(event) {
        this.childEventSource = event.originalEvent.__gl;
        this.emit(event.originalEvent.__glArgs);
    }

    /**
     * Propagates the event to the parent by emitting
     * it on the parent's DOM window
     */
    _propagateToParent(args) {
        let event;
        const eventName = "gl_child_event";

        if (document.createEvent) {
            event = window.opener.document.createEvent("HTMLEvents");
            event.initEvent(eventName, true, true);
        } else {
            event = window.opener.document.createEventObject();
            event.eventType = eventName;
        }

        event.eventName = eventName;
        event.__glArgs = args;
        event.__gl = this.layoutManager;

        if (document.createEvent) {
            window.opener.dispatchEvent(event);
        } else {
            window.opener.fireEvent("on" + event.eventType, event);
        }
    }

    /**
     * Propagate events to children
     */
    _propagateToChildren(args) {
        // tslint:disable-next-line:one-variable-per-declaration
        let childGl, i;

        for (i = 0; i < this.layoutManager.openPopouts.length; i++) {
            childGl = this.layoutManager.openPopouts[i].getGlInstance();

            if (childGl && childGl !== this.childEventSource) {
                childGl.eventHub._$onEventFromParent(args);
            }
        }
    }

    /**
     * Destroys the EventHub
     */
    destroy() {
        $(window)
            .off("gl_child_event", this.boundOnEventFromChild);
    }
}
