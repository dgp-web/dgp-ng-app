import { TestBed } from "@angular/core/testing";
import { EffectsMetadata, EffectsModule, getEffectsMetadata } from "@ngrx/effects";
import { ReplaySubject } from "rxjs";
import { StoreModule } from "@ngrx/store";
import { provideMockActions } from "@ngrx/effects/testing";

describe($Effects.name, () => {

    let effects: $Effects;
    let metadata: EffectsMetadata<$Effects>;
    let actions: ReplaySubject<any>;

    beforeEach(() => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}),
                EffectsModule.forRoot([
                    $Effects
                ]),
            ],
            providers: [
                provideMockActions(() => actions)
            ]
        });

        effects = testBed.inject($Effects);
        metadata = getEffectsMetadata(effects);

        actions = new ReplaySubject(1);

    });

    it(`should create`, () => {
        expect(effects)
            .toBeDefined();
    });

});
