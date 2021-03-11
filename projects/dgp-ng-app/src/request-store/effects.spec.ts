import { TestBed, waitForAsync } from "@angular/core/testing";
import { EffectsMetadata, getEffectsMetadata } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { ReplaySubject } from "rxjs";
import { StoreModule } from "@ngrx/store";
import { first } from "rxjs/operators";
import { RequestEffects } from "./effects";
import { scheduleRequest } from "./actions";
import * as functions from "./functions";

xdescribe(RequestEffects.name, () => {

    let effects: RequestEffects;
    let metadata: EffectsMetadata<RequestEffects>;
    let actions: ReplaySubject<any>;

    beforeEach(waitForAsync(async () => {

        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot(null),
            ],
            providers: [
                RequestEffects,
                provideMockActions(() => actions),
                // appReducerProviders
            ]
        }).compileComponents();

        effects = TestBed.inject(RequestEffects);
        metadata = getEffectsMetadata(effects);
        actions = new ReplaySubject(1);
    }));

    it("should create", () => {
        expect(effects).toBeDefined();
    });

    it(`should register scheduleRequest$ that doesn't dispatch an action.`, () => {
        expect(metadata.scheduleRequest$).toEqual({dispatch: false, useEffectsErrorHandler: true});
    });

    it(`should call observeRequest() with the passed request.`, async () => {

        spyOn(functions, "observeRequest").and.callThrough();

        const request$ = Promise.resolve();
        actions.next(scheduleRequest({  request$ }));

        await effects.scheduleRequest$.pipe(first()).toPromise();

        expect(functions.observeRequest).toHaveBeenCalled();

    });

});
