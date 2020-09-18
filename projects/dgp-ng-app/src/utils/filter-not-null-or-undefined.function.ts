import {filter} from "rxjs/operators";
import {notNullOrUndefined} from "dgp-ng-app";

export function filterNotNullOrUndefined<T>() {
    return filter<T>(notNullOrUndefined);
}

