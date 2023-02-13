import { KVS } from "entity-store";
import { ComponentConstructor } from "../services/component-registry";

export type ComponentKVS = KVS<ComponentConstructor>;
