import { ActionReducerMap, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { isNullOrUndefined } from "util";
import { FactoryProvider, InjectionToken } from "@angular/core";
import { BroadcastRole } from "./models/broadcast-role.model";
import { setOwnBroadcastRole } from "./actions/broadcast-channel.actions";

export const broadcastStoreFeature = "Broadcast";
export const broadcastStoreFeatureSelector = createFeatureSelector(broadcastStoreFeature);

export interface BroadcastState {
    readonly ownRole: BroadcastRole;
}

export const broadcastReducer = new InjectionToken<ActionReducerMap<BroadcastState>>("BroadcastStoreReducer");

export const broadcastReducerImpl = createReducer(
    BroadcastRole.None,
    on(setOwnBroadcastRole, ((state, action) => {
        return action.broadcastRole;
    }))
);

export function broadcastReducerFactory() {
    return broadcastReducerImpl;
}

export const broadcastReducerProvider: FactoryProvider = {
    provide: broadcastReducer,
    useFactory: broadcastReducerFactory
};


export const getOwnBroadcastRoleSelector = createSelector(
    broadcastStoreFeatureSelector, (x: BroadcastState) => {
        if (isNullOrUndefined(x)) {
            return null;
        }

        return x.ownRole;
    }
);
