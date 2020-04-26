import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { SvgViewerComponent } from "./svg-viewer.component";
import { DgpFileViewerModule } from "../file-viewer.module";

describe(SvgViewerComponent.name, () => {

    let fixture: ComponentFixture<SvgViewerComponent>;
    let component: SvgViewerComponent;

    beforeEach(async(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
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
