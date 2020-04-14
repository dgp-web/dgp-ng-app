import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ChangeDetectionStrategy } from "@angular/core";
import { EmptyStateComponent } from "./empty-state.component";
import { DgpEmptyStateModule } from "../empty-state.module";

describe(EmptyStateComponent.name, () => {

    let fixture: ComponentFixture<EmptyStateComponent>;
    let component: EmptyStateComponent;

    beforeEach(async(async () => {

        await TestBed.configureTestingModule({
            imports: [
                DgpEmptyStateModule
            ]
        })
            .compileComponents();

        TestBed.overrideComponent(EmptyStateComponent, {
            set: {
                changeDetection: ChangeDetectionStrategy.Default
            }
        });

        fixture = TestBed.createComponent(EmptyStateComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component)
            .toBeDefined();
    });


});
