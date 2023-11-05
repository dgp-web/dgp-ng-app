import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { JpgViewerComponent } from "../jpg-viewer.component";
import { DgpFileViewerModule } from "../../file-viewer.module";

describe(JpgViewerComponent.name, () => {

    let fixture: ComponentFixture<JpgViewerComponent>;
    let component: JpgViewerComponent;

    beforeEach(waitForAsync(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                DgpFileViewerModule
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(JpgViewerComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component)
            .toBeDefined();
    });

});
