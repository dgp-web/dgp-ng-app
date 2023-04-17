import { KVS } from "entity-store";
import { EventSubscription } from "../models/events/event-subscription.model";
import { ALL_EVENT } from "../constants/event-types/all-event.constant";

export function createEventSubscriptionKVS(): KVS<Array<EventSubscription>> {
    return {
        [ALL_EVENT]: []
    };
}
