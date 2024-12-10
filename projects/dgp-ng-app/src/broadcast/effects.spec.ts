import { TestBed, waitForAsync } from "@angular/core/testing";
import { Observable, of, ReplaySubject } from "rxjs";
import { first } from "rxjs/operators";
import { Action, Store, StoreModule } from "@ngrx/store";
import { EffectsMetadata, getEffectsMetadata } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";

import { MatSnackBarModule } from "@angular/material/snack-bar";

import { BroadcastEffects } from "./effects";
import { BroadcastFunctionsTestData } from "./functions/__tests__/broadcast-functions.test-data.spec";
import { BroadcastState, broadcastStoreFeature } from "./store";
import {
    leaderActionTypePrefix,
    peonActionTypePrefix,
    SetOwnBroadcastRoleAction,
    setOwnBroadcastRoleActionType
} from "./actions";
import { BroadcastChannelService } from "./services/broadcast-channel.service";
import { BroadcastAction, BroadcastHeartbeat, BroadcastRole } from "./models";
import { BROADCAST_REDUCER } from "./broadcast-store.module";
import { BROADCAST_CONFIG } from "./constants/broadcast-config-injection-token.constant";
import { defaultBroadcastConfig } from "./constants/default-broadcast-config.model";

describe(BroadcastEffects.name, () => {

    const unprefixedActionType = " ABC";

    const unprefixedAction: Action = {
        type: unprefixedActionType
    };

    const leaderAction: Action = {
        type: leaderActionTypePrefix + unprefixedActionType
    };

    const peonAction: Action = {
        type: peonActionTypePrefix + unprefixedActionType
    };

    const setOwnBroadcastRoleAction: SetOwnBroadcastRoleAction = {
        type: setOwnBroadcastRoleActionType,
        payload: BroadcastRole.None
    };

    const heartbeats = BroadcastFunctionsTestData.heartbeats;

    const channelServiceStub: Partial<BroadcastChannelService> = {
        postHeartbeat(heartbeat: BroadcastHeartbeat): void {
        },
        postAction(action: BroadcastAction): void {
        },
        getHeartbeat$(): Observable<BroadcastHeartbeat> {
            return of(BroadcastFunctionsTestData.heartbeat02);
        },
        getAction$(): Observable<BroadcastAction> {
            return of(leaderAction as BroadcastAction);
        }
    };

    let effects: BroadcastEffects;
    let metadata: EffectsMetadata<BroadcastEffects>;
    let actions: ReplaySubject<Action>;
    let channelService: BroadcastChannelService;
    let store: Store<BroadcastState>;

    beforeEach(waitForAsync(async () => {

        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    [broadcastStoreFeature]: BROADCAST_REDUCER as any
                }),
                MatSnackBarModule
            ],
            providers: [
                BroadcastEffects,
                {
                    provide: BROADCAST_CONFIG,
                    useValue: defaultBroadcastConfig
                },
                {
                    provide: BroadcastChannelService,
                    useValue: channelServiceStub
                },
                provideMockActions(() => actions)
            ]
        });

        actions = new ReplaySubject(3);

        effects = TestBed.inject(BroadcastEffects);
        metadata = getEffectsMetadata(effects);
        effects.selectedDataId = BroadcastFunctionsTestData.dataId01;
        (effects as any).participant = BroadcastFunctionsTestData.participant01;
        channelService = TestBed.inject(BroadcastChannelService);
        store = TestBed.inject(Store);

        actions.next(leaderAction);
        actions.next(peonAction);
        actions.next(setOwnBroadcastRoleAction);
    }));

    it("should create.", () => {
        expect(effects)
            .toBeDefined();
    });

    it(`should register broadcastHeartbeat$ that doesn't dispatch an action`, () => {
        expect(metadata.broadcastHeartbeat$)
            .toEqual({dispatch: false, useEffectsErrorHandler: true});
    });

    it(`should register observeBroadcastedHeartbeats$ that dispatches an action`, () => {
        expect(metadata.observeBroadcastHeartbeats$)
            .toEqual({dispatch: true, useEffectsErrorHandler: true});
    });

    it(`should register broadcastLeaderAction$ that doesn't dispatch an action`, () => {
        expect(metadata.broadcastLeaderAction$)
            .toEqual({dispatch: false, useEffectsErrorHandler: true});
    });

    it(`should register broadcastPeonAction$ that doesn't dispatch an action`, () => {
        expect(metadata.broadcastPeonAction$)
            .toEqual({dispatch: false, useEffectsErrorHandler: true});
    });

    it(`should register observeBroadcastedActions$ that dispatches an action`, () => {
        expect(metadata.observeBroadcastActions$)
            .toEqual({dispatch: true, useEffectsErrorHandler: true});
    });

    it(`should register createLeaderAction$ that dispatches an action`, () => {
        expect(metadata.createLeaderAction$)
            .toEqual({dispatch: true, useEffectsErrorHandler: true});
    });

    it(`should register displayBroadcastRoleInBrowserTabTitle$ that doesn't dispatch an action`, () => {
        expect(metadata.displayBroadcastRoleInBrowserTabTitle$)
            .toEqual({dispatch: false, useEffectsErrorHandler: true});
    });

    it(`broadcastLeaderAction$ should call channelService.postAction`, async () => {

        spyOn(channelService, "postAction");

        await effects.broadcastLeaderAction$.pipe(
            first()
        )
            .toPromise();

        const expectedArgument: BroadcastAction = {
            type: leaderAction.type,
            participantId: effects.participant.participantId,
            participantCreationDate: effects.participant.participantCreationDate,
            dataId: effects.selectedDataId,
            canBeLeader: true
        };

        expect(channelService.postAction)
            .toHaveBeenCalledWith(expectedArgument);

    });

    it(`broadcastPeonAction$ should call channelService.postAction`, async () => {

        spyOn(channelService, "postAction");

        await effects.broadcastPeonAction$.pipe(
            first()
        )
            .toPromise();

        const expectedArgument: BroadcastAction = {
            type: peonAction.type,
            participantId: effects.participant.participantId,
            participantCreationDate: effects.participant.participantCreationDate,
            dataId: effects.selectedDataId,
            canBeLeader: true
        };

        expect(channelService.postAction)
            .toHaveBeenCalledWith(expectedArgument);

    });

    /* xit(`observeBroadcastedActions$ should subscribe to channelService.getAction$()
     and filter and trim incoming actions.`, async () => {

         spyOn(functions, "filterIncomingBroadcastAction").and.returnValue(true);
         spyOn(functions, "trimIncomingBroadcastAction");

         await effects.observeBroadcastedActions$.pipe(
             first()
         ).toPromise();

         const expectedArgument: FilterIncomingBroadcastActionPayload = {
             action: leaderAction as BroadcastAction,
             dataId: effects.selectedDataId,
             ownBroadcastRole: effects.ownBroadcastRole
         };

         expect(functions.filterIncomingBroadcastAction).toHaveBeenCalledWith(expectedArgument);
         expect(functions.trimIncomingBroadcastAction).toHaveBeenCalledWith(leaderAction);

     });

     xit(`displayBroadcastRoleInBrowserTabTitle$ should subscribe to setOwnBroadcastRoleActionType
     and call shouldUpdateBrowserTabBroadcastRoleDisplay`, async () => {

         spyOn(functions, "shouldUpdateBrowserTabBroadcastRoleDisplay").and.callThrough();

         await effects.displayBroadcastRoleInBrowserTabTitle$.pipe(
             first()
         ).toPromise();

         expect(functions.shouldUpdateBrowserTabBroadcastRoleDisplay).toHaveBeenCalledWith({
             currentBroadcastRole: setOwnBroadcastRoleAction.payload,
             currentBrowserTabTitle: window.document.title
         }, defaultShouldUpdateBrowserTabBroadcastRoleDisplayConfig);

     });*/

});
