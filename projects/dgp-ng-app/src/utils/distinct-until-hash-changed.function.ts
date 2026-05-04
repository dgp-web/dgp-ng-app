import equal from 'fast-deep-equal';
import { distinctUntilChanged } from "rxjs/operators";
import { getHashCode } from "./get-hash-code.function";

export function distinctUntilHashChanged<T>() {
    return distinctUntilChanged((x: T, y: T) => getHashCode(x) === getHashCode(y));
}


export function distinctUntilDeepChanged<T>() {
  return distinctUntilChanged<T>((prev, curr) => {
    if (prev === curr) return true;

    return equal(prev, curr);
  }); 
}