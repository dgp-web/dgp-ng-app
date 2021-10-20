import { Directive } from "@angular/core";
import { DgpModelEditorComponentBase } from "./model-editor.component-base";
import { Store } from "@ngrx/store";
import { Action, Selector } from "entity-store";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class HybridComponentBase<TModel, TState, TData> extends DgpModelEditorComponentBase<TModel> {

    constructor(
        protected readonly store: Store<TState>
    ) {
        super();
    }

    readonly select = <TV>(x: Selector<TState, TV>) => this.store.select<TV>(x);

    readonly dispatch = (x: Action) => this.store.dispatch(x);

}
