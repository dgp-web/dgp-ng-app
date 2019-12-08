import {EntityState} from "entity-store";

export interface KeyValueStoreConfig {
    readonly initialState: EntityState<any>;
}
