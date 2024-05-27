import { Many } from "data-modeling";
import { NormalPlotOptimizationState } from "../models";

export function tryGetCachedNormalP(payload: {
    readonly collectionLength: number;
} & Partial<NormalPlotOptimizationState>): Many<number> {
    if (!payload.Ps) return null;

    return payload.Ps[payload.collectionLength.toString()];
}
