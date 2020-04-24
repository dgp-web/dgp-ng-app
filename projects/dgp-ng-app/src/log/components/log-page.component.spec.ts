import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ChangeDetectionStrategy } from "@angular/core";
import { LogPageComponent } from "./log-page.component";
import { DgpLogModule, LOG_STORE_REDUCER } from "../log.module";
import { RouterTestingModule } from "@angular/router/testing";
import { StoreModule } from "@ngrx/store";
import { logStoreFeature } from "../models";
import { EffectsModule } from "@ngrx/effects";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe(LogPageComponent.name, () => {

    let fixture: ComponentFixture<LogPageComponent>;
    let component: LogPageComponent;


    beforeEach(async(async () => {

        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                StoreModule.forRoot({}, {
                    runtimeChecks: {
                        strictActionImmutability: true,
                        strictActionSerializability: true,
                        strictStateImmutability: true,
                        strictStateSerializability: true
                    }
                }),
                EffectsModule.forRoot([]),
                DgpLogModule,
                NoopAnimationsModule
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LogPageComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component)
            .toBeDefined();
    });

});
