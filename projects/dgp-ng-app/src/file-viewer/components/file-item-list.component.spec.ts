import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FileItemListComponent } from "./file-item-list.component";
import { DgpFileViewerModule } from "../file-viewer.module";

describe(FileItemListComponent.name, () => {

    let fixture: ComponentFixture<FileItemListComponent>;
    let component: FileItemListComponent;

    beforeEach(waitForAsync(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                DgpFileViewerModule
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(FileItemListComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component)
            .toBeDefined();
    });

});
