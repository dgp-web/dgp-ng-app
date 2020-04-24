import { LogEffects } from "./effects";
import { DgpLogModule } from "./log.module";
import { TestBed, async } from "@angular/core/testing";
import { StoreModule, Store } from "@ngrx/store";
import { RouterTestingModule } from "@angular/router/testing";
import { getEffectsMetadata, EffectsMetadata, EffectsModule } from "@ngrx/effects";
import { ReplaySubject } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { first } from "rxjs/operators";
import { addLogEntry, logError } from "./actions";
import { Severity } from "./models";

describe(LogEffects.name, () => {

    let effects: LogEffects;
    let metadata: EffectsMetadata<LogEffects>;
    let actions: ReplaySubject<any>;

    beforeEach(async(() => {

        const testBed = TestBed.configureTestingModule({
            imports: [

                StoreModule.forRoot({}, {
                    runtimeChecks: {
                        strictActionImmutability: true,
                        strictActionSerializability: false,
                        strictStateImmutability: true,
                        strictStateSerializability: true
                    }
                }),
                EffectsModule.forRoot([]),
                RouterTestingModule,
                DgpLogModule
            ],
            providers: [
                LogEffects,
                provideMockActions(() => actions),
            ]
        });

        effects = testBed.inject(LogEffects);
        metadata = getEffectsMetadata(effects);

        actions = new ReplaySubject(1);
    }));

    it("should create", () => {
        expect(effects).toBeDefined();
    });

    it("should register logError$ that dispatches an action", () => {
        expect(metadata.logError$).toEqual({dispatch: true, useEffectsErrorHandler: true});
    });

    it(`logError$ should react to logError() and return addLogEntry()`, async () => {

        const action = logError({
            payload: {
                title: "title",
                error: {}
            }
        });

        actions.next(action);

        const result = await effects.logError$.pipe(first()).toPromise();

        const expectedResult = addLogEntry({
            logEntry: {
                severity: Severity.Error,
                timeStamp: new Date(),
                title: action.payload.title,
                content: action.payload.error
            }
        });

        expect(result.logEntry.severity).toEqual(
            expectedResult.logEntry.severity
        );

        expect(result.logEntry.content).toEqual(
            expectedResult.logEntry.content
        );

        expect(result.logEntry.title).toEqual(
            expectedResult.logEntry.title
        );

    });

});
