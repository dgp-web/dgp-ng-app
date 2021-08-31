import { Inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { bufferTime, distinctUntilChanged, filter, first, map, switchMap, tap } from "rxjs/operators";
import { BroadcastState, getOwnBroadcastRoleSelector } from "./store";
import { interval } from "rxjs";
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
import { BroadcastConfig, BroadCastInitialStateRules, BroadcastRole, SendInitialStateSignature } from "./models";
import { BROADCAST_CONFIG } from "./constants";
import { filterNotNullOrUndefined } from "../utils/filter-not-null-or-undefined.function";
import { notNullOrUndefined } from "../utils/null-checking.functions";
import { DgpContainer } from "../utils/container.component-base";
import { firstAsPromise } from "../utils/first-as-promise";
import { tryTrimSelectionFromCompositeEntityAction } from "./functions/try-trim-selection-from-composite-entity-action.function";
import { withoutDispatch } from "../utils/without-dispatch.constant";
import { getBroadcastHeartbeatsForInterval } from "./functions/get-broadcast-heartbeats-for-interval.function";


@Injectable()
export class BroadcastEffects extends DgpContainer<BroadcastState> {

    readonly participant = createBroadcastParticipant(this.config.canBeLeader);
    readonly heartbeat$ = interval(this.config.heartbeartBroadcastInterval);

    selectedDataId: any;

    ownBroadcastRole: BroadcastRole;

    // noinspection JSUnusedGlobalSymbols
    readonly cacheDataId$ = createEffect(() => this.actions$.pipe(
        ofType(setBroadcastChannelDataId),
        tap(action => this.selectedDataId = action.payload)
    ), withoutDispatch);

    // noinspection JSUnusedGlobalSymbols
    readonly cacheOwnBroadcastRole$ = createEffect(() => this.select(getOwnBroadcastRoleSelector).pipe(
        tap(ownBroadcastRole => this.ownBroadcastRole = ownBroadcastRole)
    ), withoutDispatch);

    readonly broadcastHeartbeat$ = createEffect(() => this.heartbeat$.pipe(
        map(() => createBroadcastHeartbeat({
            participant: this.participant, dataId: this.selectedDataId
        })),
        tap(heartbeat => this.channelService.postHeartbeat(heartbeat))
    ), withoutDispatch);

    readonly observeBroadcastHeartbeats$ = createEffect(() => this.channelService.getHeartbeat$().pipe(
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
            const broadcastRole = shouldChangeRoleResult.newBroadcastRole;

            if (shouldChangeRoleResult.shouldChangeRole) return setOwnBroadcastRole({broadcastRole});
            else return null;

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
        map(action => createBroadcastAction({
            participant: this.participant,
            dataId: this.selectedDataId,
            action
        })),
        tap(actionMessage => this.channelService.postAction(actionMessage))
    ), withoutDispatch);

    readonly createLeaderAction$ = createEffect(() => this.select(getOwnBroadcastRoleSelector).pipe(
        filter(broadcastRole => broadcastRole === BroadcastRole.Leader),
        switchMap(() => this.actions$.pipe(
            filter(filterActionToPrefixWithLeaderPredicate),
            map(x => tryTrimSelectionFromCompositeEntityAction(x, this.config))
        )),
        map(action => ({...action, type: leaderActionTypePrefix + action.type}))
    ));

    readonly broadcastLeaderAction$ = createEffect(() => this.actions$.pipe(
        filter(action => action.type.startsWith(leaderActionTypePrefix)),
        map(action => createBroadcastAction({
            participant: this.participant,
            dataId: this.selectedDataId,
            action
        })),
        tap(actionMessage => this.channelService.postAction(actionMessage))
    ), withoutDispatch);
    
    readonly observeBroadcastActions$ = createEffect(() => this.channelService.getAction$().pipe(
        filter(action => filterIncomingBroadcastAction({
            action,
            dataId: this.selectedDataId,
            ownBroadcastRole: this.ownBroadcastRole
        })),
        map(trimIncomingBroadcastAction)
    ));

    // noinspection JSUnusedGlobalSymbols
    readonly sendInitialData$ = createEffect(() => this.actions$.pipe(
        ofType(requestInitialData),
        switchMap(() => firstAsPromise(this.select(getOwnBroadcastRoleSelector))),
        filter(role => role === BroadcastRole.Leader && notNullOrUndefined(this.config.sendInitialState)),
        switchMap(() => firstAsPromise(this.store)),
        switchMap(state => {

            if (Array.isArray(this.config.sendInitialState)) {
                const actionFactories = this.config.sendInitialState as BroadCastInitialStateRules<any>;
                return actionFactories.map(actionFactory => actionFactory(state as any));
            } else {
                // noinspection JSDeprecatedSymbols
                const actionFactory = this.config.sendInitialState as SendInitialStateSignature<any>;
                return [
                    prefixAction({
                        action: actionFactory(state as any),
                        prefix: leaderActionTypePrefix
                    })
                ];
            }

        })
    ));

    // noinspection JSUnusedGlobalSymbols
    readonly requestInitialData$ = createEffect(() => this.select(getOwnBroadcastRoleSelector).pipe(
        distinctUntilChanged(),
        filter(role => role === BroadcastRole.Peon && notNullOrUndefined(this.config.sendInitialState)),
        map(() => prefixAction({
            action: requestInitialData,
            prefix: peonActionTypePrefix
        }))
    ));

    // noinspection JSUnusedGlobalSymbols
    readonly openUrlAsPeon$ = createEffect(() => this.actions$.pipe(
        ofType(openUrlAsPeon),
        switchMap(action => this.select(getOwnBroadcastRoleSelector).pipe(
            first(),
            tap(broadcastRole => {
                window.open(action.url + "?startAsPeon=true");
                if (broadcastRole !== BroadcastRole.Leader) return;
                this.dispatch(setOwnBroadcastRole({broadcastRole: BroadcastRole.Leader}));
            })
        ))
    ), withoutDispatch);

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
