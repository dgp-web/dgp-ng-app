import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { DgpFileManagerDrawerLayout } from "../file-manager-drawer-layout.component";
import { DgpFileUploadModule } from "../../file-upload.module";
import { DgpNgAppTestingModule } from "../../../__tests__/dgp-ng-app-testing.module";

describe(DgpFileManagerDrawerLayout.name, () => {

    let fixture: ComponentFixture<DgpFileManagerDrawerLayout>;
    let component: DgpFileManagerDrawerLayout;

    beforeEach(waitForAsync(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                DgpNgAppTestingModule,
                DgpFileUploadModule,
                DgpFileManagerDrawerLayout
            ]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(DgpFileManagerDrawerLayout);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component).toBeDefined();
    });

});
