import {notNullOrUndefined} from "./null-checking.functions";

export function there(payload: any) {
    return notNullOrUndefined(payload);
}
