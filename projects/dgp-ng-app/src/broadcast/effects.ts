import { Inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { bufferTime, distinctUntilChanged, filter, first, map, switchMap, tap } from "rxjs/operators";
import { BroadcastState, getOwnBroadcastRoleSelector } from "./store";
import { from, interval, of } from "rxjs";
import { createBroadcastHeartbeat } from "./functions/create-broadcast-heartbeat.function";
import { createBroadcastParticipant } from "./functions/create-broadcast-participant.function";
import {
    compositeActionTypePrefix,
    leaderActionTypePrefix,
    openUrlAsPeon,
    peonActionTypePrefix,
    requestInitialData,
    setBroadcastChannelDataId,
    setOwnBroadcastRole
} from "./actions";
import { trimIncomingBroadcastAction } from "./functions/trim-incoming-broadcast-action.function";
import { shouldBroadcastParticipantChangeRole } from "./functions/should-broadcast-participant-change-role.function";
import { createBroadcastAction } from "./functions/create-broadcast-action.function";
import { filterIncomingBroadcastAction } from "./functions/filter-incoming-broadcast-action.function";
import { shouldUpdateBrowserTabBroadcastRoleDisplay } from "./functions/should-update-browser-tab-broadcast-role-display.function";
import { BroadcastChannelService } from "./services/broadcast-channel.service";
import { filterActionToPrefixWithLeaderPredicate } from "./functions/filter-action-to-prefix-with-leader.predicate";
import { prefixAction } from "./functions/prefix-action.function";
import {
    BroadcastConfig,
    BroadcastHeartbeat,
    BroadCastInitialStateRules,
    BroadcastParticipant,
    BroadcastRole,
    SendInitialStateSignature
} from "./models";
import { CompositeEntityAction } from "entity-store";
import { BROADCAST_CONFIG } from "./constants";
import { filterNotNullOrUndefined } from "../utils/filter-not-null-or-undefined.function";
import { notNullOrUndefined } from "../utils/null-checking.functions";
import { DgpContainer } from "../utils/container.component-base";
import { firstAsPromise } from "../utils/first-as-promise";
import { ofNull } from "../utils/of-null.function";


export function tryTrimSelectionFromCompositeEntityAction(action: Action,
                                                          config: BroadcastConfig): any {

    if (action.type.startsWith(compositeActionTypePrefix)) {

        const typedAction = action as CompositeEntityAction<any, any>;

        if (config.syncSelection) {
            /**
             * Synchronize everything but the selection
             * which the client has to manage itself
             */
            return new CompositeEntityAction({
                add: typedAction.payload.add,
                clear: typedAction.payload.clear,
                remove: typedAction.payload.remove,
                set: typedAction.payload.set,
                update: typedAction.payload.update,
                select: typedAction.payload.select
            });
        } else {
            /**
             * Synchronize everything but the selection
             * which the client has to manage itself
             */
            return new CompositeEntityAction({
                add: typedAction.payload.add,
                clear: typedAction.payload.clear,
                remove: typedAction.payload.remove,
                set: typedAction.payload.set,
                update: typedAction.payload.update
            });
        }


    } else {
        return action;
    }

}

export function getBroadcastHeartbeatsForInterval(payload: {
    heartbeatsFromOtherParticipants: ReadonlyArray<BroadcastHeartbeat>;
    participant: BroadcastParticipant;
    dataId: any;
}): BroadcastHeartbeat[] {

    return payload.heartbeatsFromOtherParticipants.concat([
        createBroadcastHeartbeat({
            participant: payload.participant,
            dataId: payload.dataId
        })]);
}


@Injectable()
export class BroadcastEffects extends DgpContainer<BroadcastState> {

    readonly participant = createBroadcastParticipant(this.config.canBeLeader);
    readonly heartbeat$ = interval(this.config.heartbeartBroadcastInterval);

    selectedDataId: any;

    ownBroadcastRole: BroadcastRole;

    readonly cacheDataId$ = createEffect(() => this.actions$.pipe(
        ofType(setBroadcastChannelDataId),
        tap(action => {
            this.selectedDataId = action.payload;
        })
    ), {dispatch: false});

    readonly cacheOwnBroadcastRole$ = createEffect(() => this.select(getOwnBroadcastRoleSelector)
        .pipe(
            tap(ownBroadcastRole => {
                this.ownBroadcastRole = ownBroadcastRole;
            })
        ), {dispatch: false});

    readonly broadcastHeartbeat$ = createEffect(() => this.heartbeat$.pipe(
        tap(() => {

            const heartbeat = createBroadcastHeartbeat({
                participant: this.participant,
                dataId: this.selectedDataId
            });

            this.channelService.postHeartbeat(heartbeat);
        })
    ), {dispatch: false});

    readonly observeBroadcastedHeartbeats$ = createEffect(() => this.channelService
        .getHeartbeat$()
        .pipe(
            bufferTime(this.config.incomingHeartbeatBufferInterval),
            map(heartbeatsFromOtherParticipants => getBroadcastHeartbeatsForInterval({
                heartbeatsFromOtherParticipants,
                participant: this.participant,
                dataId: this.selectedDataId
            })),
            map(heartbeats => {

                const shouldChangeRoleResult = shouldBroadcastParticipantChangeRole({
                    currentBroadcastRole: this.ownBroadcastRole,
                    heartbeats,
                    participantId: this.participant.participantId
                });

                if (shouldChangeRoleResult.shouldChangeRole) {
                    return setOwnBroadcastRole({broadcastRole: shouldChangeRoleResult.newBroadcastRole});
                } else {
                    return null;
                }

            }),
            filterNotNullOrUndefined()
        ));

    readonly displayBroadcastRoleInBrowserTabTitle$ = createEffect(() => this.actions$.pipe(
        ofType(setOwnBroadcastRole),
        filter(() => notNullOrUndefined(this.config.updateBrowserTabTitleConfig)),
        tap(action => {

            const result = shouldUpdateBrowserTabBroadcastRoleDisplay({
                currentBroadcastRole: action.broadcastRole,
                currentBrowserTabTitle: window.document.title
            }, this.config.updateBrowserTabTitleConfig);

            if (!result.shouldUpdateRoleDisplay) return;

            window.document.title = result.updatedBrowserTabTitle;

        })
    ));

    readonly broadcastPeonAction$ = createEffect(() => this.actions$.pipe(
        filter(action => action.type.startsWith(peonActionTypePrefix)),
        tap(action => {

            const actionMessage = createBroadcastAction({
                participant: this.participant,
                dataId: this.selectedDataId,
                action
            });
            this.channelService.postAction(actionMessage);
        })
    ), {dispatch: false});

    readonly createLeaderAction$ = createEffect(() => this.select(getOwnBroadcastRoleSelector).pipe(
        switchMap(broadcastRole => {

            if (broadcastRole !== BroadcastRole.Leader) return ofNull();

            return this.actions$.pipe(
                filter(filterActionToPrefixWithLeaderPredicate),
                map(x => tryTrimSelectionFromCompositeEntityAction(x, this.config))
            );

        }),
        filterNotNullOrUndefined(),
        map(action => ({
            ...action,
            type: leaderActionTypePrefix + action.type
        }))
    ));

    readonly broadcastLeaderAction$ = createEffect(() => this.actions$.pipe(
        filter(action => action.type.startsWith(leaderActionTypePrefix)),
        tap(action => {

            const actionMessage = createBroadcastAction({
                participant: this.participant,
                dataId: this.selectedDataId,
                action
            });

            this.channelService.postAction(actionMessage);

        })
    ), {dispatch: false});


    readonly observeBroadcastActions$ = createEffect(() => this.channelService
        .getAction$()
        .pipe(
            filter(action => {

                return filterIncomingBroadcastAction({
                    action,
                    dataId: this.selectedDataId,
                    ownBroadcastRole: this.ownBroadcastRole
                });

            }),
            map(x => trimIncomingBroadcastAction(x))
        ));

    readonly sendInitialData$ = createEffect(() => this.actions$.pipe(
        ofType(requestInitialData),
        switchMap(() => firstAsPromise(this.select(getOwnBroadcastRoleSelector))),
        filter(role => role === BroadcastRole.Leader
            && this.config.sendInitialState !== null
            && this.config.sendInitialState !== undefined),
        switchMap(() => firstAsPromise(this.store)),
        switchMap(state => {

            if (Array.isArray(this.config.sendInitialState)) {

                const actionFactories = this.config.sendInitialState as BroadCastInitialStateRules<any>;

                return from(actionFactories.map(actionFactory => actionFactory(state as any)));

            } else {

                // noinspection JSDeprecatedSymbols
                const actionFactory = this.config.sendInitialState as SendInitialStateSignature<any>;
                return from([
                    prefixAction({
                        action: actionFactory(state as any),
                        prefix: leaderActionTypePrefix
                    })
                ]);

            }

        })
    ));

    readonly requestInitialData$ = createEffect(() => this.select(getOwnBroadcastRoleSelector)
        .pipe(
            distinctUntilChanged(),
            filter(role => role === BroadcastRole.Peon
                && this.config.sendInitialState !== null
                && this.config.sendInitialState !== undefined),
            map(() => prefixAction({
                action: requestInitialData,
                prefix: peonActionTypePrefix
            }))
        ));

    readonly openUrlAsPeon$ = createEffect(() => this.actions$.pipe(
        ofType(openUrlAsPeon),
        switchMap(action => this.select(getOwnBroadcastRoleSelector).pipe(
            first(),
            tap(broadcastRole => {
                window.open(action.url + "?startAsPeon=true");

                if (broadcastRole !== BroadcastRole.Leader) {
                    this.dispatch(setOwnBroadcastRole({
                        broadcastRole: BroadcastRole.Leader
                    }));
                }

            })
        ))
    ), {dispatch: false});

    constructor(
        private readonly actions$: Actions,
        protected readonly store: Store<BroadcastState>,
        private readonly channelService: BroadcastChannelService,
        @Inject(BROADCAST_CONFIG)
        private readonly config: BroadcastConfig
    ) {
        super(store);
    }

}
