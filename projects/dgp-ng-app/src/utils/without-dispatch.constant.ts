import { EffectConfig } from "@ngrx/effects";

export const withoutDispatch: EffectConfig & {
    functional?: false;
    dispatch: false;
} = {
    dispatch: false
};
