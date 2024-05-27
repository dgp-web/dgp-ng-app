import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { DynamicFileViewerComponent } from "../dynamic-file-viewer.component";
import { DgpFileViewerModule } from "../../file-viewer.module";
import { StoreModule } from "@ngrx/store";

describe(DynamicFileViewerComponent.name, () => {

    let fixture: ComponentFixture<DynamicFileViewerComponent>;
    let component: DynamicFileViewerComponent;

    beforeEach(waitForAsync(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}),
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
