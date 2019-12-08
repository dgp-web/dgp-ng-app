import {TestBed} from "@angular/core/testing";

import {combineReducers, Store, StoreModule} from "@ngrx/store";
import {first} from "rxjs/operators";
import {NoPeonGuard} from "../no-peon.guard";
import {
    _broadcastReducer,
    BroadcastState,
    broadcastStoreFeature
} from "../../broadcast-store";
import {SetOwnBroadcastRoleAction} from "../../actions";
import {BroadcastRole} from "../../models";

describe(NoPeonGuard.name, () => {

    let noPeonGuard: NoPeonGuard;
    let store: Store<BroadcastState>;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    [broadcastStoreFeature]: combineReducers(_broadcastReducer as any)
                } as any)
            ],
            providers: [
                NoPeonGuard
            ]
        });

        noPeonGuard = TestBed.get(NoPeonGuard);
        store = TestBed.get(Store);

        store.dispatch(
            new SetOwnBroadcastRoleAction(BroadcastRole.Peon)
        );

    });

    it("should create.", () => {
        expect(noPeonGuard).toBeDefined();
    });

    it("should create.", async () => {

        const canActivate = await noPeonGuard.canActivate(null, null).pipe(
            first()
        ).toPromise();

        expect(canActivate).toBeFalsy();
    });
});
