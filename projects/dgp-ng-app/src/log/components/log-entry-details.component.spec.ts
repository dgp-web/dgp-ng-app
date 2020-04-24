import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { LogEntryDetailsComponent } from "./log-entry-details.component";
import { DgpLogModule } from "../log.module";
import { StoreModule } from "@ngrx/store";
import { RouterTestingModule } from "@angular/router/testing";
import { EffectsModule } from "@ngrx/effects";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe(LogEntryDetailsComponent.name, () => {

    let fixture: ComponentFixture<LogEntryDetailsComponent>;
    let component: LogEntryDetailsComponent;

    beforeEach(async(async () => {

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
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(LogEntryDetailsComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component)
            .toBeDefined();
    });

});
