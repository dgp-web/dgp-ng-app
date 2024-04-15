import { createReducer, on } from "@ngrx/store";
import { initialNormalPlotState } from "../constants";
import { NormalPlotOptimizationState } from "../models";
import { cacheNormalP } from "../actions";

export const normalPlotOptimizationReducer = createReducer<NormalPlotOptimizationState>(
    initialNormalPlotState,
    on(cacheNormalP, (state, action) => {
        return {
            ...state,
            [action.P.length]: action.P
        };
    })
);
