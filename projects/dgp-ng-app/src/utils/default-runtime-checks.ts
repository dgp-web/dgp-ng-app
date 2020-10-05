import {RuntimeChecks} from "@ngrx/store";

export const defaultRuntimeChecks: RuntimeChecks = {
    strictStateSerializability: false,
    strictStateImmutability: false,
    strictActionWithinNgZone: false,
    strictActionSerializability: false,
    strictActionImmutability: false
};
