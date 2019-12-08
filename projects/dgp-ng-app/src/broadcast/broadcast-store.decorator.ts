import { Action, ActionsSubject, ReducerManager, select, StateObservable, Store } from "@ngrx/store";
import {ClassProvider, Inject, Injectable} from "@angular/core";
import { getOwnBroadcastRoleSelector } from "./broadcast-store";
import { Subscription } from "rxjs";
import {BROADCAST_CONFIG, BroadcastConfig, BroadcastRole} from "./models";
import {prefixAction, shouldPrefixAction} from "./functions";
import {peonActionTypePrefix} from "./actions";

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

        let _action = action;

        const shouldPrefixActionWithPeonResult = shouldPrefixAction({
            action,
            actualBroadcastRole: this.broadcastRole,
            triggeringBroadcastRole: BroadcastRole.Peon,
            triggeringActionPrefixes: this.config.actionTypesToPrefixWithPeon
        });

        if (shouldPrefixActionWithPeonResult) {
            _action = prefixAction({
                action: _action,
                prefix: peonActionTypePrefix
            });
        }

        super.dispatch(_action);

    }

    next<V extends Action = Action>(action: V): void {

        let _action = action;

        const shouldPrefixActionWithPeonResult = shouldPrefixAction({
            action,
            actualBroadcastRole: this.broadcastRole,
            triggeringBroadcastRole: BroadcastRole.Peon,
            triggeringActionPrefixes: this.config.actionTypesToPrefixWithPeon
        });

        if (shouldPrefixActionWithPeonResult) {
            _action = prefixAction({
                action: _action,
                prefix: peonActionTypePrefix
            });
        }

        super.next(_action);

    }

}

export const broadcastStoreProvider: ClassProvider = {
    provide: Store,
    useClass: BroadcastStoreDecorator
};
