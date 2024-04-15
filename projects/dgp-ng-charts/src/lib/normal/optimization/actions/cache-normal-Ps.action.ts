import { createAction, props } from "@ngrx/store";
import { Many } from "data-modeling";

export const cacheNormalPs = createAction("[DgpCharts] CacheNormalPs", props<{
    readonly Ps: Many<Many<number>>;
}>());
