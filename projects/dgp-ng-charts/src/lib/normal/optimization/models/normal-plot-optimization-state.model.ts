import { KVS } from "entity-store";
import { Many } from "data-modeling";

export interface NormalPlotOptimizationState {
    /**
     * Index of P values for lengths of collections
     */
    readonly Ps: KVS<Many<number>>;
}
