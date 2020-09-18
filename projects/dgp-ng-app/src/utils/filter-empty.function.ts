import {filter} from "rxjs/operators";

export function filterEmpty<T extends ReadonlyArray<TItem>, TItem>() {
    return filter<T>(x => x.length !== 0);
}
