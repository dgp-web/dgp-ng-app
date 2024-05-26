import { createReducer, on } from "@ngrx/store";
import { initialNormalPlotState } from "../constants";
import { NormalPlotOptimizationState } from "../models";
import { cacheNormalP, cacheNormalPs } from "../actions";

export const normalPlotOptimizationReducer = createReducer<NormalPlotOptimizationState>(
    initialNormalPlotState,
    on(cacheNormalP, (state, action) => {
        return {
            ...state,
            [action.P.length]: action.P
        };
    }),
    on(cacheNormalPs, (state, action) => {

        let updatedState = {...state};

        action.Ps.forEach(P => {
            updatedState = {
                ...updatedState,
                [P.length]: P
            };
        });

        return updatedState;
    })
);
