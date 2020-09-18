import {filter} from "rxjs/operators";
import {notNullOrUndefined} from "./null-checking.functions";

export function filterNotNullOrUndefined<T>() {
    return filter<T>(notNullOrUndefined);
}

