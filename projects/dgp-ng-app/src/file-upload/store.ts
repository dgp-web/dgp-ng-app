import { FactoryProvider, InjectionToken } from "@angular/core";
import { FileUploadEntities, FileUploadStoreFeature } from "./models";
import { createEntityStore } from "entity-store";

export const fileUploadEntityStore = createEntityStore<FileUploadEntities, FileUploadStoreFeature>({
    storeFeature: "FileUpload",
    entityTypes: [
        "fileItem"
    ]
});

export const fileUploadReducer = new InjectionToken<typeof fileUploadEntityStore.reducers>("hamburgerShellReducer");

export function fileUploadReducerFactory() {
    return fileUploadEntityStore.reducers;
}

export const fileUploadReducerProvider: FactoryProvider = {
    provide: fileUploadReducer,
    useFactory: fileUploadReducerFactory
};

