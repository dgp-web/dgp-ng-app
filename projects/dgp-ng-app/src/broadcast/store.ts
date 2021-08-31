import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { setOwnBroadcastRole } from "./actions";
import { isNullOrUndefined } from "../utils/null-checking.functions";
import { BroadcastRole } from "./models";

export const broadcastStoreFeature = "Broadcast";
export const broadcastStoreFeatureSelector = createFeatureSelector<BroadcastState>(broadcastStoreFeature);

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
    broadcastStoreFeatureSelector, x => {
        if (isNullOrUndefined(x)) return null;

        return x.ownRole;
    }
);
