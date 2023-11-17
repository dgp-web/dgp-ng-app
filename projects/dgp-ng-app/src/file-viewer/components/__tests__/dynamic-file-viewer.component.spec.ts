import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { DynamicFileViewerComponent } from "../dynamic-file-viewer.component";
import { DgpFileViewerModule } from "../../file-viewer.module";

describe(DynamicFileViewerComponent.name, () => {

    let fixture: ComponentFixture<DynamicFileViewerComponent>;
    let component: DynamicFileViewerComponent;

    beforeEach(waitForAsync(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                DgpFileViewerModule
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(DynamicFileViewerComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component)
            .toBeDefined();
    });

});
