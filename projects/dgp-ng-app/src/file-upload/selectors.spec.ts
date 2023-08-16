import { TestBed } from "@angular/core/testing";
import { Store, StoreModule } from "@ngrx/store";
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
    xit("", () => {
    });

});
