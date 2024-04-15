import { Many } from "data-modeling";
import { NormalPlotOptimizationState } from "../models";

export function tryGetCachedNormalP(payload: {
    readonly collectionLength: number;
} & Partial<NormalPlotOptimizationState>): Many<number> {
    return payload.Ps[payload.collectionLength.toString()];
}
