import { RxComponent } from "../../common/app";
import { KVS } from "entity-store";
import { GoldenLayoutEvent } from "../models/events/golden-layout-event.model";
import { Callback } from "../models/events/callback.model";
import { CallbackHandle } from "../models/events/callback-handle.model";
import { ALL_EVENT } from "../constants/all-event.constant";

/**
 * A generic and very fast EventEmitter
 * implementation. On top of emitting the
 * actual event it emits an
 *
 * lm.utils.EventEmitter.ALL_EVENT
 *
 * event for every event triggered. This allows
 * to hook into it and proxy events forwards
 */
export class EventEmitter extends RxComponent {

    private readonly subscriptionKVS: KVS<Array<CallbackHandle>> = {
        [ALL_EVENT]: []
    };

    off = this.unbind;

    trigger = this.emit;

    on(event: string, callback: Callback, context?: any) {
        if (!this.subscriptionKVS[event]) this.subscriptionKVS[event] = [];

        this.subscriptionKVS[event].push({callback, context});
    }

    /**
     * Emit an event and notify listeners
     */
    emit<TEvent extends GoldenLayoutEvent = any>(sEvent: TEvent[0], x?: TEvent[1]) {
        let context: any;
        let args: any;

        args = Array.prototype.slice.call(arguments, 1);

        let subscriptions = this.subscriptionKVS[sEvent];

        if (subscriptions) {
            subscriptions = subscriptions.slice();
            subscriptions.forEach(subscription => {
                context = subscription.context || {};
                subscription.callback.apply(context, args);
            });
        }

        args.unshift(sEvent);

        const eventHandles = this.subscriptionKVS[ALL_EVENT].slice();

        eventHandles.forEach(eventHandle => {
            context = eventHandle.context || {};
            eventHandle.callback.apply(context, args);
        });
    }

    /**
     * Removes a listener for an event, or all listeners if no callback and context is provided.
     */
    unbind(event: string, callback: Callback, context: any) {
        let i: number;
        let bUnbound = false;

        for (i = 0; i < this.subscriptionKVS[event].length; i++) {
            if
            (
                (!callback || this.subscriptionKVS[event][i].callback === callback) &&
                (!context || context === this.subscriptionKVS[event][i].context)
            ) {
                this.subscriptionKVS[event].splice(i, 1);
                bUnbound = true;
            }
        }
    }

}
