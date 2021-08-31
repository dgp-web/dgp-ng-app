import { EffectConfig } from "@ngrx/effects/src/models";

export const withoutDispatch: EffectConfig = {
    dispatch: false
};
