import {KeyValueStoreConfig, keyValueStoreFeature} from "../models";
import {createEntityReducer} from "entity-store";

export function createKVSReducer(config: KeyValueStoreConfig) {
    return createEntityReducer({
        entityType: keyValueStoreFeature,
        storeFeature: keyValueStoreFeature,
        initialState: config.initialState
    });
}
