import { Inject, Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { bufferTime, filter, map, switchMap, tap } from "rxjs/operators";
import { BroadcastState, getOwnBroadcastRoleSelector } from "../broadcast-store";
import { interval, of } from "rxjs";
import { isNullOrUndefined } from "util";
import { BroadcastHeartbeat } from "../models/broadcast-heartbeat.model";
import { BroadcastParticipant } from "../models/broadcast-participant.model";
import { createBroadcastHeartbeat } from "../functions/create-broadcast-heartbeat.function";
import { createBroadcastParticipant } from "../functions/create-broadcast-participant.function";
import { BroadcastRole } from "../models/broadcast-role.model";
import {
    leaderActionTypePrefix,
    peonActionTypePrefix, SetBroadcastChannelDataIdAction,
    setBroadcastChannelDataIdActionType, SetOwnBroadcastRoleAction,
    setOwnBroadcastRoleActionType
} from "../actions/broadcast-channel.actions";
import { trimIncomingBroadcastAction } from "../functions/trim-incoming-broadcast-action.function";
import { shouldBroadcastParticipantChangeRole } from "../functions/should-broadcast-participant-change-role.function";
import { createBroadcastAction } from "../functions/create-broadcast-action.function";
import { filterIncomingBroadcastAction } from "../functions/filter-incoming-broadcast-action.function";
import { BroadcastAction } from "../models/broadcast-action.model";
import { shouldUpdateBrowserTabBroadcastRoleDisplay } from "../functions/should-update-browser-tab-broadcast-role-display.function";
import { BroadcastChannelService } from "../services/broadcast-channel.service";
import { filterActionToPrefixWithLeaderPredicate } from "../functions/filter-action-to-prefix-with-leader.predicate";
import { BROADCAST_CONFIG, BroadcastConfig } from "../models/broadcast-config.model";

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
    cacheDataId$ = this.actions$.pipe(
        ofType<SetBroadcastChannelDataIdAction>(setBroadcastChannelDataIdActionType),
        tap(action => {
            this.selectedDataId = action.payload;
        })
    );

    @Effect({
        dispatch: false
    })
    cacheOwnBroadcastRole$ = this.store.pipe(
        select(getOwnBroadcastRoleSelector)
    ).pipe(
        tap((ownBroadcastRole: BroadcastRole) => {
            this.ownBroadcastRole = ownBroadcastRole;
        })
    );

    @Effect({
        dispatch: false
    })
    broadcastHeartbeat$ = this.heartbeat$.pipe(
        tap(() => {

            const heartbeat: BroadcastHeartbeat = createBroadcastHeartbeat({
                participant: this.participant,
                dataId: this.selectedDataId
            });

            this.channelService.postHeartbeat(heartbeat);
        })
    );

    @Effect()
    observeBroadcastedHeartbeats$ = this.channelService
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
                    return new SetOwnBroadcastRoleAction(shouldChangeRoleResult.newBroadcastRole);
                } else {
                    return null;
                }

            }),
            filter(x => !isNullOrUndefined(x))
        );

    @Effect({
        dispatch: false
    })
    displayBroadcastRoleInBrowserTabTitle$ = this.actions$.pipe(
        ofType(setOwnBroadcastRoleActionType),
        filter(() => !isNullOrUndefined(this.config.updateBrowserTabTitleConfig)),
        tap((action: SetOwnBroadcastRoleAction) => {

            const result = shouldUpdateBrowserTabBroadcastRoleDisplay({
                currentBroadcastRole: action.payload,
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
    broadcastPeonAction$ = this.actions$.pipe(
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
    createLeaderAction$ = this.store.pipe(
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
    broadcastLeaderAction$ = this.actions$.pipe(
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
    observeBroadcastedActions$ = this.channelService
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

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<BroadcastState>,
        private readonly channelService: BroadcastChannelService,
        @Inject(BROADCAST_CONFIG)
        private readonly config: BroadcastConfig
    ) {

    }

}