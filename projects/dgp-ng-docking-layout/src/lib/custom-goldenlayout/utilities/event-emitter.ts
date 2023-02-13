import { RxComponent } from "../../common/app";
import { KVS } from "entity-store";
import { GoldenLayoutEvent } from "../models/events/golden-layout-event.model";

export interface CallbackHandle {
    readonly fn: any;
    readonly ctx?: any;
}

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

    /**
     * Alias for unbind
     */
    off = this.unbind;

    /**
     * Alias for emit
     */
    trigger = this.emit;

    /**
     * Listen for events
     */
    on(sEvent: string, fCallback, oContext?) {
        if (!this.subscriptionKVS[sEvent]) {
            this.subscriptionKVS[sEvent] = [];
        }

        this.subscriptionKVS[sEvent].push({fn: fCallback, ctx: oContext});
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
                ctx = subs[i].ctx || {};
                subs[i].fn.apply(ctx, args);
            }
        }

        args.unshift(sEvent);

        const allEventSubs = this.subscriptionKVS[ALL_EVENT].slice();

        for (i = 0; i < allEventSubs.length; i++) {
            ctx = allEventSubs[i].ctx || {};
            allEventSubs[i].fn.apply(ctx, args);
        }
    }

    /**
     * Removes a listener for an event, or all listeners if no callback and context is provided.
     */
    unbind(sEvent, fCallback, oContext) {
        if (!this.subscriptionKVS[sEvent]) {
            throw new Error("No subscribtions to unsubscribe for event " + sEvent);
        }

        // tslint:disable-next-line:one-variable-per-declaration
        let i, bUnbound = false;

        for (i = 0; i < this.subscriptionKVS[sEvent].length; i++) {
            if
            (
                (!fCallback || this.subscriptionKVS[sEvent][i].fn === fCallback) &&
                (!oContext || oContext === this.subscriptionKVS[sEvent][i].ctx)
            ) {
                this.subscriptionKVS[sEvent].splice(i, 1);
                bUnbound = true;
            }
        }

        if (bUnbound === false) {
            throw new Error("Nothing to unbind for " + sEvent);
        }
    }

}
