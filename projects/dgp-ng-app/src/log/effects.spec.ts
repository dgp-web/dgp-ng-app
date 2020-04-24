import { LogEffects } from "./effects";
import { DgpLogModule } from "./log.module";
import { TestBed, async } from "@angular/core/testing";
import { StoreModule } from "@ngrx/store";
import { RouterTestingModule } from "@angular/router/testing";
import { getEffectsMetadata, EffectsMetadata, EffectsModule } from "@ngrx/effects";
import { ReplaySubject } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";

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
                        strictActionSerializability: true,
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
                // appReducerProviders
            ]
        });

        effects = testBed.inject(LogEffects);
        metadata = getEffectsMetadata(effects);
        actions = new ReplaySubject(1);
    }));

    it("should create", () => {
        expect(effects).toBeDefined();
    });

    it("");

});
