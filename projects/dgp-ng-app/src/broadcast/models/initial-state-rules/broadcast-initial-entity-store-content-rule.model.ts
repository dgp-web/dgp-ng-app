import { EntityTypeMap } from "entity-store";
import { SendInitialStateSignature } from "./send-initial-state-signature.model";

export type BroadcastInitialEntityStoreContentRule<TEntityTypeMap extends EntityTypeMap, TStoreFeature = string> = SendInitialStateSignature<TEntityTypeMap, TStoreFeature>;
