import { TestBed } from "@angular/core/testing";
import { EffectsMetadata, EffectsModule, getEffectsMetadata } from "@ngrx/effects";
import { ReplaySubject } from "rxjs";
import { StoreModule } from "@ngrx/store";
import { provideMockActions } from "@ngrx/effects/testing";
import { FileUploadEffects } from "./file-upload.effects";
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { defaultFileUploadConfig, FILE_UPLOAD_CONFIG } from "./models";

describe(FileUploadEffects.name, () => {

    let effects: FileUploadEffects;
    let metadata: EffectsMetadata<FileUploadEffects>;
    let actions: ReplaySubject<any>;

    beforeEach(() => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}),
                EffectsModule.forRoot([
                    FileUploadEffects
                ]),
                RouterTestingModule,
                MatDialogModule
            ],
            providers: [
                provideMockActions(() => actions), {
                    provide: FILE_UPLOAD_CONFIG,
                    useValue: defaultFileUploadConfig
                }
            ]
        });

        effects = testBed.inject(FileUploadEffects);
        metadata = getEffectsMetadata(effects);

        actions = new ReplaySubject(1);

    });

    it(`should create`, () => {
        expect(effects)
            .toBeDefined();
    });

});
