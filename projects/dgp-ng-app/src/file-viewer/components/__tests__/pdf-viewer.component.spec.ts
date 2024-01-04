import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { PdfViewerComponent } from "../pdf-viewer.component";
import { DgpFileViewerModule } from "../../file-viewer.module";
import { StoreModule } from "@ngrx/store";

describe(PdfViewerComponent.name, () => {

    let fixture: ComponentFixture<PdfViewerComponent>;
    let component: PdfViewerComponent;

    beforeEach(waitForAsync(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot(),
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
