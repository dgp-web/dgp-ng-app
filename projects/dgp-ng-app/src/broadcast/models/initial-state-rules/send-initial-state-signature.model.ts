import { ComposedEntityActions, EntityStateMap, EntityTypeMap } from "entity-store";

/**
 * @deprecated use BroadcastInitialEntityStoreContentRule instead
 */
export type SendInitialStateSignature<TEntityTypeMap extends EntityTypeMap, TStoreFeature = string> = (
    state: EntityStateMap<TEntityTypeMap>
) => ComposedEntityActions<TEntityTypeMap, TStoreFeature>;
