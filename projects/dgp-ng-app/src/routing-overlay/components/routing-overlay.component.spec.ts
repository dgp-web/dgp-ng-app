import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DgpRoutingOverlayModule } from "../routing-overlay.module";
import { RoutingOverlayComponent } from "./routing-overlay.component";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { RouterTestingModule } from "@angular/router/testing";

describe(RoutingOverlayComponent.name, () => {

    let fixture: ComponentFixture<RoutingOverlayComponent>;
    let component: RoutingOverlayComponent;

    beforeEach(async(async () => {

        await TestBed.configureTestingModule({
            imports: [
                DgpRoutingOverlayModule,
                StoreModule.forRoot({}, {
                    runtimeChecks: {
                        strictStateSerializability: true,
                        strictStateImmutability: true,
                        strictActionSerializability: true,
                        strictActionImmutability: true
                    }
                }),
                EffectsModule.forRoot([]),
                RouterTestingModule
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(RoutingOverlayComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component)
            .toBeDefined();
    });

});
