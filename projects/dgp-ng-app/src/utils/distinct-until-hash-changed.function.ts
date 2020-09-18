import {distinctUntilChanged} from "rxjs/operators";
import {getHashCode} from "./get-hash-code.function";

export function distinctUntilHashChanged<T>() {
    return distinctUntilChanged((x: T, y: T) => getHashCode(x) === getHashCode(y));
}
