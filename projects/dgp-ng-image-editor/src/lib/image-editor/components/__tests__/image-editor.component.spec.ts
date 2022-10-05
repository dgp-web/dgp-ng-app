import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DgpImageEditorComponent } from "../image-editor.component";
import { DgpImageEditorModule } from "../../image-editor.module";

describe(DgpImageEditorComponent.name, () => {

    let fixture: ComponentFixture<DgpImageEditorComponent>;
    let component: DgpImageEditorComponent;

    beforeEach(async(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                DgpImageEditorModule
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(DgpImageEditorComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component).toBeDefined();
    });

});
