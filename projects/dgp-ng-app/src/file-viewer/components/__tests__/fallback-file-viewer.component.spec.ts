import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FallbackFileViewerComponent } from "../fallback-file-viewer.component";
import { DgpFileViewerModule } from "../../file-viewer.module";

describe(FallbackFileViewerComponent.name, () => {

    let fixture: ComponentFixture<FallbackFileViewerComponent>;
    let component: FallbackFileViewerComponent;

    beforeEach(waitForAsync(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                DgpFileViewerModule
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(FallbackFileViewerComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component)
            .toBeDefined();
    });

});
