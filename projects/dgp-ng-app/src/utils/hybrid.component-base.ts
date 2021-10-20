import { Directive } from "@angular/core";
import { DgpModelEditorComponentBase } from "./model-editor.component-base";
import { Store } from "@ngrx/store";
import { Action, Selector } from "entity-store";
import { notNullOrUndefined } from "./null-checking.functions";
import { of } from "rxjs";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class DgpHybridComponentBase<TModel, TState> extends DgpModelEditorComponentBase<TModel> {

    constructor(
        protected readonly store: Store<TState>
    ) {
        super();
    }

    readonly select = <TV>(x: Selector<TState, TV>) => this.store.select<TV>(x);

    readonly dispatch = (x: Action) => this.store.dispatch(x);

}


/**
 * @deprecated This should not be used anymore. See DgpHybridComponentBase instead
 */
@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class HybridComponentBase<TModel, TState, TData> extends DgpHybridComponentBase<TModel, TState> {

    // tslint:disable-next-line:member-ordering
    readonly data$ = notNullOrUndefined(this.getData) ? this.select(this.getData()) : of(null);

    abstract getData?(): Selector<TState, TData>;
}

