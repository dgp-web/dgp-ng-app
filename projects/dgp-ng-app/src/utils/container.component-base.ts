import { Directive } from "@angular/core";
import { Store } from "@ngrx/store";
import { Action, Selector } from "entity-store";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class DgpContainer<TState = any> {

    constructor(
        protected readonly store: Store<TState>
    ) {
    }

    readonly dispatch = (x: Action) => this.store.dispatch(x);

    readonly select = <TV>(x: Selector<TState, TV>) => this.store.select(x);

}
