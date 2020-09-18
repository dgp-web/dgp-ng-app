import {notNullOrUndefined} from "./null-checking.functions";

export function resolveOverridableValue<TValue>(payload: {
    readonly computedValue: TValue;
    readonly overriddenValue?: TValue;
}): TValue {
    return notNullOrUndefined(payload.overriddenValue)
        ? payload.overriddenValue
        : payload.computedValue;
}
