import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { PngViewerComponent } from "../png-viewer.component";
import { DgpFileViewerModule } from "../../file-viewer.module";

describe(PngViewerComponent.name, () => {

    let fixture: ComponentFixture<PngViewerComponent>;
    let component: PngViewerComponent;

    beforeEach(waitForAsync(async () => {

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
