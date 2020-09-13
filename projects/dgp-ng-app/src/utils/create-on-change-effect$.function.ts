import {Store} from "@ngrx/store";
import {Selector} from "entity-store";
import {filterNotNullOrUndefined} from "./filter-not-null-or-undefined.function";
import {distinctUntilHashChanged} from "./distinct-until-hash-changed.function";

export function createOnChangeEffect$<TState, TObserved>(payload: {
    readonly store: Store<TState>;
    readonly observedSelector: Selector<TState, TObserved>;
}) {

    return payload.store.select(payload.observedSelector).pipe(
        filterNotNullOrUndefined(),
        distinctUntilHashChanged(),
    );

}
