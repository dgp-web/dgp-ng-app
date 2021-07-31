import {Params} from "@angular/router";

export function getAs<T>(params: Params): T {
    return params as T;
}
