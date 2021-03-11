import { LogEffects } from "./effects";
import { DgpLogModule } from "./log.module";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { StoreModule } from "@ngrx/store";
import { RouterTestingModule } from "@angular/router/testing";
import { getEffectsMetadata, EffectsMetadata, EffectsModule } from "@ngrx/effects";
import { of, ReplaySubject } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { first } from "rxjs/operators";
import { addLogEntry, logError } from "./actions";
import { Severity } from "./models";
import { logStore } from "./reducers";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from "@angular/material/snack-bar";

describe(LogEffects.name, () => {

    let effects: LogEffects;
    let metadata: EffectsMetadata<LogEffects>;
    let actions: ReplaySubject<any>;
    let snackBar: MatSnackBar;

    beforeEach(waitForAsync(() => {

        const testBed = TestBed.configureTestingModule({
            imports: [

                StoreModule.forRoot({}, {
                    runtimeChecks: {
                        strictActionImmutability: true,
                        strictActionSerializability: true,
                        strictStateImmutability: true,
                        strictStateSerializability: true
                    }
                }),
                EffectsModule.forRoot([]),
                RouterTestingModule,
                DgpLogModule,
                NoopAnimationsModule
            ],
            providers: [
                LogEffects,
                provideMockActions(() => actions),
            ]
        });

        effects = testBed.inject(LogEffects);
        metadata = getEffectsMetadata(effects);

        actions = new ReplaySubject(1);
        snackBar = testBed.inject(MatSnackBar);
    }));

    it("should create", () => {
        expect(effects)
            .toBeDefined();
    });

    it("should register logError$ that dispatches an action", () => {
        expect(metadata.logError$)
            .toEqual({dispatch: true, useEffectsErrorHandler: true});
    });

    it(`logError$ should react to logError() and return addLogEntry()`, async () => {

        const action = logError({
            payload: {
                title: "title",
                error: {}
            }
        });

        actions.next(action);

        const result = await effects.logError$.pipe(first())
            .toPromise();

        const expectedResult = addLogEntry({
            logEntry: {
                severity: Severity.Error,
                timeStamp: new Date().valueOf(),
                title: action.payload.title,
                content: action.payload.error
            }
        });

        expect(result.logEntry.severity)
            .toEqual(expectedResult.logEntry.severity);
        expect(result.logEntry.content)
            .toEqual(expectedResult.logEntry.content);
        expect(result.logEntry.title)
            .toEqual(expectedResult.logEntry.title);

    });

    it("should register addLogEntry$ that dispatches an action", () => {
        expect(metadata.addLogEntry$)
            .toEqual({dispatch: true, useEffectsErrorHandler: true});
    });

    it(`addLogEntry$ should react to addLogEntry() and call logStore.actions.composeEntityActions`, async () => {

        const action = addLogEntry({
            logEntry: {
                severity: Severity.Error,
                timeStamp: new Date().valueOf(),
                title: "title",
                content: {}
            }
        });

        actions.next(action);

        spyOn(logStore.actions, "composeEntityActions")
            .and
            .callThrough();

        await effects.addLogEntry$.pipe(first())
            .toPromise();

        expect(logStore.actions.composeEntityActions)
            .toHaveBeenCalledWith({
                add: {
                    logEntry: {
                        [action.logEntry.timeStamp.toString()]: action.logEntry
                    }
                }
            });

    });

    it("should register showErrorSnack$ that doesn't dispatch an action", () => {
        expect(metadata.showErrorSnack$)
            .toEqual({dispatch: false, useEffectsErrorHandler: true});
    });

    it(`showErrorSnack$ should open a snack`, async () => {

        const action = addLogEntry({
            logEntry: {
                severity: Severity.Error,
                timeStamp: new Date().valueOf(),
                title: "title",
                content: {}
            }
        });

        actions.next(action);

        spyOn(snackBar, "open").and.returnValue({
            onAction: () => of(null),
        } as unknown as MatSnackBarRef<SimpleSnackBar>);

        await effects.showErrorSnack$.pipe(first())
            .toPromise();

        expect(snackBar.open).toHaveBeenCalledWith(action.logEntry.title, "Show log", {
            duration: 5000
        });
    });

});
