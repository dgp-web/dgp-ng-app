import { Action, ActionsSubject, ReducerManager, select, StateObservable, Store } from "@ngrx/store";
import { ClassProvider, Inject, Injectable } from "@angular/core";
import { getOwnBroadcastRoleSelector } from "./store";
import { Subscription } from "rxjs";
import { prefixAction } from "./functions/prefix-action.function";
import { peonActionTypePrefix } from "./actions";
import { shouldPrefixAction } from "./functions/should-prefix-action.function";
import { BroadcastConfig, BroadcastRole } from "./models";
import { BROADCAST_CONFIG } from "./constants/broadcast-config-injection-token.constant";

@Injectable()
export class BroadcastStoreDecorator<T> extends Store<T> {

    broadcastRole: BroadcastRole;
    private ownBroadcastRoleSubscription: Subscription;

    constructor(
        @Inject(StateObservable)
            state$: StateObservable,
        @Inject(ActionsSubject)
            actionsObserver: ActionsSubject,
        @Inject(ReducerManager)
            reducerManager: ReducerManager,
        @Inject(BROADCAST_CONFIG)
        private config: BroadcastConfig) {
        super(state$, actionsObserver, reducerManager);

        this.ownBroadcastRoleSubscription = state$.pipe(
            select(getOwnBroadcastRoleSelector)
        ).subscribe(x => {
            this.broadcastRole = x;
        }, (e) => {
            throw e;
        });

    }

    dispatch<V extends Action = Action>(action: V): void {

        let localAction = action;

        const shouldPrefixActionWithPeonResult = shouldPrefixAction({
            action,
            actualBroadcastRole: this.broadcastRole,
            triggeringBroadcastRole: BroadcastRole.Peon,
            triggeringActionPrefixes: this.config.actionTypesToPrefixWithPeon
        });

        if (shouldPrefixActionWithPeonResult) {
            localAction = prefixAction({
                action: localAction,
                prefix: peonActionTypePrefix
            });
        }

        super.dispatch(localAction as any);

    }

    next<V extends Action = Action>(action: V): void {

        let localAction = action;

        const shouldPrefixActionWithPeonResult = shouldPrefixAction({
            action,
            actualBroadcastRole: this.broadcastRole,
            triggeringBroadcastRole: BroadcastRole.Peon,
            triggeringActionPrefixes: this.config.actionTypesToPrefixWithPeon
        });

        if (shouldPrefixActionWithPeonResult) {
            localAction = prefixAction({
                action: localAction,
                prefix: peonActionTypePrefix
            });
        }

        super.next(localAction);

    }

}

export const broadcastStoreProvider: ClassProvider = {
    provide: Store,
    useClass: BroadcastStoreDecorator
};
