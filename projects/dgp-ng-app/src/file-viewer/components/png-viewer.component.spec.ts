import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { PngViewerComponent } from "./png-viewer.component";
import { DgpFileViewerModule } from "../file-viewer.module";

describe(PngViewerComponent.name, () => {

    let fixture: ComponentFixture<PngViewerComponent>;
    let component: PngViewerComponent;

    beforeEach(async(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                DgpFileViewerModule
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(PngViewerComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component)
            .toBeDefined();
    });

});
