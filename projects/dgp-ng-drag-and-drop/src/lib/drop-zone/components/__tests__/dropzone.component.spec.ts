import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { DgpDropzoneModule } from "../../dropzone.module";
import { DgpDropzoneComponent } from "../dropzone.component";
import { DgpDragAndDropModule } from "../../../data/drag-and-drop.module";

describe(DgpDropzoneComponent.name, () => {

    let fixture: ComponentFixture<DgpDropzoneComponent<any>>;
    let component: DgpDropzoneComponent<any>;

    beforeEach(waitForAsync(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                DgpDragAndDropModule,
                DgpDropzoneModule
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(DgpDropzoneComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component).toBeDefined();
    });

});
