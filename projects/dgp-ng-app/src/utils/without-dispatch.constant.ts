import { EffectConfig } from "@ngrx/effects/src/models";

export const withoutDispatch: EffectConfig & {
    functional?: false;
    dispatch: false;
} = {
    dispatch: false
};
