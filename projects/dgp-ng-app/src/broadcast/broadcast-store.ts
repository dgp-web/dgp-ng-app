import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import { isNullOrUndefined } from "util";
import { FactoryProvider, InjectionToken } from "@angular/core";
import { BroadcastRole } from "./models/broadcast-role.model";
import { SetOwnBroadcastRoleAction, setOwnBroadcastRoleActionType } from "./actions/broadcast-channel.actions";

export const broadcastStoreFeature = "Broadcast";
export const broadcastStoreFeatureSelector = createFeatureSelector(broadcastStoreFeature);

export interface BroadcastState {
    readonly ownRole: BroadcastRole;
}

export const broadcastReducer = new InjectionToken<ActionReducerMap<BroadcastState>>("BroadcastStoreReducer");

export const broadcastReducerImpl: ActionReducerMap<BroadcastState> = {
    ownRole: (state: BroadcastRole = BroadcastRole.None, action: SetOwnBroadcastRoleAction): BroadcastRole => {

        switch (action.type) {
            case setOwnBroadcastRoleActionType: {
                return action.payload;
            }
            default:
                return state;
        }

    }
};

export function broadcastReducerFactory(): ActionReducerMap<BroadcastState> {
    return broadcastReducerImpl;
}

export const broadcastReducerProviders = [{
    provide: broadcastReducer,
    useFactory: broadcastReducerFactory
} as FactoryProvider];


export const getOwnBroadcastRoleSelector = createSelector(
    broadcastStoreFeatureSelector, (x: BroadcastState) => {
        if (isNullOrUndefined(x)) {
            return null;
        }

        return x.ownRole;
    }
);
