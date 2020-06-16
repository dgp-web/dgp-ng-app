import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FileManagerComponent } from "./file-manager.component";
import { DgpFileUploadModule } from "../file-upload.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";

describe(FileManagerComponent.name, () => {

    let fixture: ComponentFixture<FileManagerComponent>;
    let component: FileManagerComponent;

    beforeEach(async(async () => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}),
                EffectsModule.forRoot([]),
                RouterTestingModule,
                DgpFileUploadModule,
                MatDialogModule
            ],
            providers: [{
                provide: MatDialogRef,
                useValue: {} as MatDialogRef<FileManagerComponent>
            }]
        });
        await testBed.compileComponents();

        fixture = testBed.createComponent(FileManagerComponent);
        component = fixture.componentInstance;

    }));

    it("should create.", () => {
        expect(component)
            .toBeDefined();
    });

});
