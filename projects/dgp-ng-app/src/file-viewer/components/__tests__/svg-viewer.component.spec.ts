import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { SvgViewerComponent } from "../svg-viewer.component";
import { DgpFileViewerModule } from "../../file-viewer.module";
import { StoreModule } from "@ngrx/store";

describe(SvgViewerComponent.name, () => {

    let fixture: ComponentFixture<SvgViewerComponent>;
    let component: SvgViewerComponent;

    beforeEach(waitForAsync(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}),
                DgpFileViewerModule
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(SvgViewerComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component)
            .toBeDefined();
    });

});
