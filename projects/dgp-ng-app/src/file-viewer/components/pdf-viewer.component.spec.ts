import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { PdfViewerComponent } from "./pdf-viewer.component";
import { DgpFileViewerModule } from "../file-viewer.module";

describe(PdfViewerComponent.name, () => {

    let fixture: ComponentFixture<PdfViewerComponent>;
    let component: PdfViewerComponent;

    beforeEach(async(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                DgpFileViewerModule
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(PdfViewerComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component)
            .toBeDefined();
    });

});
