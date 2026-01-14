import { TestBed } from "@angular/core/testing";
import { EffectsMetadata, EffectsModule, getEffectsMetadata } from "@ngrx/effects";
import { ReplaySubject } from "rxjs";
import { StoreModule } from "@ngrx/store";
import { provideMockActions } from "@ngrx/effects/testing";
import { FileUploadEffects } from "./file-upload.effects";
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { defaultFileUploadConfig, FILE_UPLOAD_CONFIG, fileUploadStoreFeature } from "./models";
import { fileUploadReducer } from "./store";
import { defaultRuntimeChecks } from "../utils/default-runtime-checks";
import { FILE_UPLOAD_REDUCER, fileUploadReducerProvider } from "./file-upload.module";
import { actionContextStoreFeature } from "../action-context/constants/action-context-store-feature.constant";
import { actionContextReducer } from "../action-context/reducers/action-context.reducer";

describe(FileUploadEffects.name, () => {

    let effects: FileUploadEffects;
    let metadata: EffectsMetadata<FileUploadEffects>;
    let actions: ReplaySubject<any>;

    beforeEach(() => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                }, {runtimeChecks: defaultRuntimeChecks}),
                EffectsModule.forRoot([
                    FileUploadEffects
                ]),
                RouterTestingModule,
                MatDialogModule,
                StoreModule.forFeature(fileUploadStoreFeature, fileUploadReducer),
                StoreModule.forFeature(actionContextStoreFeature, actionContextReducer)
            ],
            providers: [
                provideMockActions(() => actions), {
                    provide: FILE_UPLOAD_CONFIG,
                    useValue: defaultFileUploadConfig
                },
                fileUploadReducerProvider
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
