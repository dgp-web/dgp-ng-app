import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { DgpInspectorConfigFormComponent } from "../inspector-config-form.component";
import { DgpInspectorConfigModule } from "../../inspector-config.module";

describe(DgpInspectorConfigFormComponent.name, () => {

    let fixture: ComponentFixture<DgpInspectorConfigFormComponent>;
    let component: DgpInspectorConfigFormComponent;

    beforeEach(waitForAsync(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                DgpInspectorConfigModule
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(DgpInspectorConfigFormComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component).toBeDefined();
    });

});
