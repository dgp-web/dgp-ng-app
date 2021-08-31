import { EntityTypeMap } from "entity-store";
import { BroadcastInitialStateRule } from "./broadcast-initial-state-rule.model";

export type BroadCastInitialStateRules<TEntityTypeMap extends EntityTypeMap, TStoreFeature = string> = ReadonlyArray<BroadcastInitialStateRule<TEntityTypeMap, TStoreFeature>>;
