import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { DgpFileViewerModule } from "../file-viewer.module";
import { FileViewerComponent } from "./file-viewer.component";

describe(FileViewerComponent.name, () => {

    let fixture: ComponentFixture<FileViewerComponent>;
    let component: FileViewerComponent;

    beforeEach(waitForAsync(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                DgpFileViewerModule
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(FileViewerComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component)
            .toBeDefined();
    });

});
