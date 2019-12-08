import {broadcastStoreProvider, BroadcastStoreDecorator} from "../broadcast-store.decorator";
import {TestBed} from "@angular/core/testing";
import {Action, Store, StoreModule} from "@ngrx/store";
import {BroadcastRole} from "../models";
import {peonActionTypePrefix} from "../actions";
import * as functions from "../functions";
import {broadcastStoreFeature} from "../broadcast-store";

describe(BroadcastStoreDecorator.name, () => {

    let decoratedStore: BroadcastStoreDecorator<any>;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    [broadcastStoreFeature]: {
                        ownBroadcastRole: BroadcastRole.Peon
                    } as any
                })
            ],
            providers: [
                broadcastStoreProvider
            ]
        });

        decoratedStore = TestBed.get(Store) as BroadcastStoreDecorator<any>;

    });

    // TODO: Update
    /*it(`dispatch should call shouldPrefixActionWithPeon with the value of the broadcastRole member and the
    passed action.`, () => {

        const broadcastRole = BroadcastRole.Peon;
        decoratedStore.broadcastRole = broadcastRole;

        spyOn(functions, "shouldPrefixActionWithPeon").and.callThrough();

        const action: Action = {
            type: "Example Type"
        };
        decoratedStore.dispatch(action);

        expect(functions.shouldPrefixActionWithPeon).toHaveBeenCalled();

    });*/

    /*it(`dispatch should call prefixAction if the passed action should be prefixed.`, () => {

        const broadcastRole = BroadcastRole.Peon;
        decoratedStore.broadcastRole = broadcastRole;

        spyOn(functions, "shouldPrefixActionWithPeon").and.returnValue(true);
        spyOn(functions, "prefixAction").and.callThrough();

        const action: Action = {
            type: "Example Type"
        };
        decoratedStore.dispatch(action);

        expect(functions.prefixAction).toHaveBeenCalledWith({
            action: action,
            prefix: peonActionTypePrefix
        });

    });*/

});
