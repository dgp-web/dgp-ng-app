import { RxComponent } from "../../common/app";
import { KVS } from "entity-store";
import { GoldenLayoutEvent } from "../models/events/golden-layout-event.model";
import { Callback } from "../models/events/callback.model";
import { CallbackHandle } from "../models/events/callback-handle.model";

/**
 * The name of the event that's triggered for every other event
 *
 * usage
 *
 * myEmitter.on( eventEmitterFactory.ALL_EVENT, function( eventName, argsArray ){
 * 	//do stuff
 * });
 */
export const ALL_EVENT = "__all";

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
        // tslint:disable-next-line:one-variable-per-declaration
        let i, ctx, args;

        args = Array.prototype.slice.call(arguments, 1);

        let subs = this.subscriptionKVS[sEvent];

        if (subs) {
            subs = subs.slice();
            for (i = 0; i < subs.length; i++) {
                ctx = subs[i].context || {};
                subs[i].callback.apply(ctx, args);
            }
        }

        args.unshift(sEvent);

        const allEventSubs = this.subscriptionKVS[ALL_EVENT].slice();

        for (i = 0; i < allEventSubs.length; i++) {
            ctx = allEventSubs[i].context || {};
            allEventSubs[i].callback.apply(ctx, args);
        }
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
