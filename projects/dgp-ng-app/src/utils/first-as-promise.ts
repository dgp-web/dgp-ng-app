import { Observable } from "rxjs";
import { first } from "rxjs/operators";

export function firstAsPromise<T>(observable: Observable<T>): Promise<T>  {
    return observable.pipe(first()).toPromise();
}
