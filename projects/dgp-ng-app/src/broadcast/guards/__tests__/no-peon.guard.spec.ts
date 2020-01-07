import {TestBed} from "@angular/core/testing";

import {combineReducers, Store, StoreModule} from "@ngrx/store";
import {first} from "rxjs/operators";
import {NoPeonGuard} from "../no-peon.guard";
import {
    broadcastReducerImpl,
    BroadcastState,
    broadcastStoreFeature
} from "../../broadcast-store";
import { SetOwnBroadcastRoleAction } from "../../actions/broadcast-channel.actions";
import { BroadcastRole } from "../../models/broadcast-role.model";

describe(NoPeonGuard.name, () => {

    let noPeonGuard: NoPeonGuard;
    let store: Store<BroadcastState>;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    [broadcastStoreFeature]: combineReducers(broadcastReducerImpl as any)
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