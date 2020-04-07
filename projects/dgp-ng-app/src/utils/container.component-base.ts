import { Directive } from "@angular/core";
import { Store } from "@ngrx/store";
import { Selector } from "entity-store";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class DgpContainer<TState = any> {

    readonly select = <TV>(x: Selector<TState, TV>) => this.store.select(x);

    constructor(
        protected readonly store: Store<TState>
    ) {
    }

}
