import { createAction, props } from "@ngrx/store";
import { Many } from "data-modeling";

export const cacheNormalP = createAction("[DgpCharts] CacheNormalP", props<{
    readonly P: Many<number>;
}>());
