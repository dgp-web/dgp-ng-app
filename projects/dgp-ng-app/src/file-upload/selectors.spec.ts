import { TestBed } from "@angular/core/testing";
import { EffectsMetadata, EffectsModule, getEffectsMetadata } from "@ngrx/effects";
import { ReplaySubject } from "rxjs";
import { Store, StoreModule } from "@ngrx/store";
import { provideMockActions } from "@ngrx/effects/testing";
import { FileUploadState, fileUploadStoreFeature } from "./models";
import { fileUploadReducer } from "./store";

describe("File-upload selectors", () => {

    let store: Store<FileUploadState>;

    beforeEach(() => {

        const testBed = TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    [fileUploadStoreFeature]: fileUploadReducer
                } as any),
            ]
        });

        store = testBed.inject(Store);

    });

    // TODO

});
