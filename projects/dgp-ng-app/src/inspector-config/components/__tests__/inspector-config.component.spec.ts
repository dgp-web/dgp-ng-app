import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { DgpInspectorConfigComponent } from "../inspector-config.component";
import { DgpInspectorConfigModule } from "../../inspector-config.module";

describe(DgpInspectorConfigComponent.name, () => {

    let fixture: ComponentFixture<DgpInspectorConfigComponent>;
    let component: DgpInspectorConfigComponent;

    beforeEach(waitForAsync(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                DgpInspectorConfigModule
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(DgpInspectorConfigComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component).toBeDefined();
    });

});
