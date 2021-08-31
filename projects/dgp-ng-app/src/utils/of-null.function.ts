import { of } from "rxjs";

export function ofNull<T>() {
    return of<T>(null);
}
