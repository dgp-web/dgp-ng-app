import { EntityTypeMap } from "entity-store";
import { BroadcastInitialStateActionRule } from "./broadcast-initial-state-action-rule.model";
import { BroadcastInitialEntityStoreContentRule } from "./broadcast-initial-entity-store-content-rule.model";

export type BroadcastInitialStateRule<TEntityTypeMap extends EntityTypeMap, TStoreFeature = string> =
    BroadcastInitialStateActionRule<TEntityTypeMap>
    | BroadcastInitialEntityStoreContentRule<TEntityTypeMap, TStoreFeature>;
