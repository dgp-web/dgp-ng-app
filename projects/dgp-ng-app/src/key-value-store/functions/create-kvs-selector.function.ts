import {createFeatureSelector, createSelector} from "@ngrx/store";
import {keyValueStoreFeature} from "../models";
import {EntityState} from "entity-store";

export const kvsFeatureSelector = createFeatureSelector<EntityState<any>>(keyValueStoreFeature);

export function createKVSSelector<TValue>(key: string) {
    return createSelector(
        kvsFeatureSelector,
        state => {
            return state.entities[key] as TValue;
        }
    );
}
