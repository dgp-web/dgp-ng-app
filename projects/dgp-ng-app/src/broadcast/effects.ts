import { Inject, Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { bufferTime, distinctUntilChanged, filter, first, map, switchMap, tap } from "rxjs/operators";
import { BroadcastState, getOwnBroadcastRoleSelector } from "./store";
import { from, interval, of } from "rxjs";
import { isNullOrUndefined } from "util";
import { createBroadcastHeartbeat } from "./functions/create-broadcast-heartbeat.function";
import { createBroadcastParticipant } from "./functions/create-broadcast-participant.function";
import {
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
    BROADCAST_CONFIG,
    BroadcastAction,
    BroadcastConfig,
    BroadcastHeartbeat,
    BroadCastInitialStateRules,
    BroadcastParticipant,
    BroadcastRole,
    SendInitialStateSignature
} from "./models";

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
export class BroadcastEffects {

    participant: BroadcastParticipant = createBroadcastParticipant();

    selectedDataId: any;
    ownBroadcastRole: BroadcastRole;

    heartbeat$ = interval(this.config.heartbeartBroadcastInterval);

    @Effect({
        dispatch: false
    })
    readonly cacheDataId$ = this.actions$.pipe(
        ofType(setBroadcastChannelDataId),
        tap(action => {
            this.selectedDataId = action.payload;
        })
    );

    @Effect({
        dispatch: false
    })
    readonly cacheOwnBroadcastRole$ = this.store.pipe(
        select(getOwnBroadcastRoleSelector)
    )
        .pipe(
            tap((ownBroadcastRole: BroadcastRole) => {
                this.ownBroadcastRole = ownBroadcastRole;
            })
        );

    @Effect({
        dispatch: false
    })
    readonly broadcastHeartbeat$ = this.heartbeat$.pipe(
        tap(() => {

            const heartbeat: BroadcastHeartbeat = createBroadcastHeartbeat({
                participant: this.participant,
                dataId: this.selectedDataId
            });

            this.channelService.postHeartbeat(heartbeat);
        })
    );

    @Effect()
    readonly observeBroadcastedHeartbeats$ = this.channelService
        .getHeartbeat$()
        .pipe(
            bufferTime(this.config.incomingHeartbeatBufferInterval),
            map((heartbeartsFromOtherParticipants: BroadcastHeartbeat[]) => {

                return getBroadcastHeartbeatsForInterval({
                    heartbeatsFromOtherParticipants: heartbeartsFromOtherParticipants,
                    participant: this.participant,
                    dataId: this.selectedDataId
                });

            }),
            map((heartbeats: BroadcastHeartbeat[]) => {

                const shouldChangeRoleResult = shouldBroadcastParticipantChangeRole({
                    currentBroadcastRole: this.ownBroadcastRole,
                    heartbeats,
                    participantId: this.participant.participantId
                });

                if (shouldChangeRoleResult.shouldChangeRole) {

                    // TODO: Experimental feature for trimming startAsPeon=true
                    /* if (this.ownBroadcastRole === BroadcastRole.Peon) {
                         if (window.location.href.includes("startAsPeon=true")) {
                             window.location.href = window.location.href.replace("startAsPeon=true", "");
                         }
                     }*/

                    return setOwnBroadcastRole({broadcastRole: shouldChangeRoleResult.newBroadcastRole});
                } else {
                    return null;
                }

            }),
            filter(x => !isNullOrUndefined(x))
        );

    @Effect({
        dispatch: false
    })
    readonly displayBroadcastRoleInBrowserTabTitle$ = this.actions$.pipe(
        ofType(setOwnBroadcastRole),
        filter(() => !isNullOrUndefined(this.config.updateBrowserTabTitleConfig)),
        tap(action => {

            const result = shouldUpdateBrowserTabBroadcastRoleDisplay({
                currentBroadcastRole: action.broadcastRole,
                currentBrowserTabTitle: window.document.title
            }, this.config.updateBrowserTabTitleConfig);

            if (result.shouldUpdateRoleDisplay) {
                window.document.title = result.updatedBrowserTabTitle;
            }

        })
    );

    @Effect({
        dispatch: false
    })
    readonly broadcastPeonAction$ = this.actions$.pipe(
        filter((action: Action) => action.type.startsWith(peonActionTypePrefix)),
        tap((action: Action) => {

            const actionMessage = createBroadcastAction({
                participant: this.participant,
                dataId: this.selectedDataId,
                action
            });
            this.channelService.postAction(actionMessage);
        })
    );

    @Effect()
    readonly createLeaderAction$ = this.store.pipe(
        select(getOwnBroadcastRoleSelector),
        switchMap((broadcastRole: BroadcastRole) => {

            if (broadcastRole === BroadcastRole.Leader) {
                return this.actions$.pipe(
                    filter(filterActionToPrefixWithLeaderPredicate)
                );
            } else {
                return of(null);
            }

        }),
        filter(x => !isNullOrUndefined(x)),
        map((action: Action) => {
            return Object.assign({}, action, {
                type: leaderActionTypePrefix + action.type
            });
        })
    );

    @Effect({
        dispatch: false
    })
    readonly broadcastLeaderAction$ = this.actions$.pipe(
        filter((action: Action) => action.type.startsWith(leaderActionTypePrefix)),
        tap((action: Action) => {

            const actionMessage = createBroadcastAction({
                participant: this.participant,
                dataId: this.selectedDataId,
                action
            });

            this.channelService.postAction(actionMessage);

        })
    );


    @Effect()
    readonly observeBroadcastedActions$ = this.channelService
        .getAction$()
        .pipe(
            filter((action: BroadcastAction) => {

                return filterIncomingBroadcastAction({
                    action,
                    dataId: this.selectedDataId,
                    ownBroadcastRole: this.ownBroadcastRole
                });

            }),
            map(x => trimIncomingBroadcastAction(x))
        );

    @Effect()
    readonly sendInitialData$ = this.actions$.pipe(
        ofType(requestInitialData),
        switchMap(() => this.store.select(getOwnBroadcastRoleSelector)
            .pipe(first())),
        filter(role => role === BroadcastRole.Leader
            && this.config.sendInitialState !== null
            && this.config.sendInitialState !== undefined),
        switchMap(() => this.store.pipe(first())),
        switchMap(state => {

            if (Array.isArray(this.config.sendInitialState)) {

                const actionFactories = this.config.sendInitialState as BroadCastInitialStateRules<any>;

                return from(actionFactories.map(actionFactory => actionFactory(state as any)));

            } else {

                const actionFactory = this.config.sendInitialState as SendInitialStateSignature<any>;
                return from([
                    prefixAction({
                        action: actionFactory(state as any),
                        prefix: leaderActionTypePrefix
                    })
                ]);

            }

        })
    );

    @Effect()
    readonly requestInitialData$ = this.store.select(getOwnBroadcastRoleSelector)
        .pipe(
            distinctUntilChanged(),
            filter(role => role === BroadcastRole.Peon
                && this.config.sendInitialState !== null
                && this.config.sendInitialState !== undefined),
            map(() => prefixAction({
                action: requestInitialData,
                prefix: peonActionTypePrefix
            }))
        );

    @Effect({
        dispatch: false
    })
    readonly openUrlAsPeon$ = this.actions$.pipe(
        ofType(openUrlAsPeon),
        switchMap(action => this.store.select(getOwnBroadcastRoleSelector).pipe(
            first(),
            tap(broadcastRole => {
                window.open(action.url + "?startAsPeon=true");

                if (broadcastRole !== BroadcastRole.Leader) {
                    this.store.dispatch(setOwnBroadcastRole({
                        broadcastRole: BroadcastRole.Leader
                    }));
                }

            })
        ))
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<BroadcastState>,
        private readonly channelService: BroadcastChannelService,
        @Inject(BROADCAST_CONFIG)
        private readonly config: BroadcastConfig
    ) {
    }

}
