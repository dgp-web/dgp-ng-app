import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { isNullOrUndefined } from "util";
import { setOwnBroadcastRole } from "./actions";
import { BroadcastRole } from "./models";

export const broadcastStoreFeature = "Broadcast";
export const broadcastStoreFeatureSelector = createFeatureSelector(broadcastStoreFeature);

export interface BroadcastState {
    readonly ownRole: BroadcastRole;
}

export const broadcastReducer = createReducer<BroadcastState>(
    {ownRole: BroadcastRole.None},
    on(setOwnBroadcastRole, (state, action) => {
        return {
            ownRole: action.broadcastRole
        };
    })
);


export const getOwnBroadcastRoleSelector = createSelector(
    broadcastStoreFeatureSelector, (x: BroadcastState) => {
        if (isNullOrUndefined(x)) {
            return null;
        }

        return x.ownRole;
    }
);
