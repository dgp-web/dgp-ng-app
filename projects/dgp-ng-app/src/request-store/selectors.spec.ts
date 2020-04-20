import { TestBed } from "@angular/core/testing";
import { Store, StoreModule } from "@ngrx/store";
import { DgpRequestStoreModule } from "./request-store.module";
import { RequestStoreState } from "./models";
import { hasPendingRequests } from "./selectors";
import { first } from "rxjs/operators";
import { scheduleRequest } from "./actions";
import { EffectsModule } from "@ngrx/effects";

describe("request selectors", () => {

    let store: Store<RequestStoreState>;

    beforeEach(() => {
        const testBed = TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}, {
                    runtimeChecks: {
                        strictActionImmutability: false,
                        strictActionSerializability: false,
                        strictStateImmutability: true,
                        strictStateSerializability: true
                    }
                }),
                EffectsModule.forRoot([]),
                DgpRequestStoreModule
            ]
        });

        store = testBed.inject(Store);
    });

    it(`hasPendingRequests should return true when pendingRequests is > 0`, async () => {

        let hasRequests = await store.select(hasPendingRequests)
            .pipe(first())
            .toPromise();

        expect(hasRequests)
            .toBeFalsy();

        store.dispatch(scheduleRequest({request$: Promise.resolve()}));

        hasRequests = await store.select(hasPendingRequests)
            .pipe(first())
            .toPromise();
        
        expect(hasRequests)
            .toBeTruthy();

    });

});
