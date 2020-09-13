import { Selector } from "entity-store";
import { DgpContainer } from "./container.component-base";
import { createOnChangeEffect$ } from "./create-on-change-effect$.function";

export abstract class DgpEffectsBase<TState> extends DgpContainer<TState> {

    protected createOnChangeEffect$<TObserved>(payload: {
        readonly observedSelector: Selector<TState, TObserved>;
    }) {
        return createOnChangeEffect$({
            store: this.store,
            ...payload
        });
    }

}
