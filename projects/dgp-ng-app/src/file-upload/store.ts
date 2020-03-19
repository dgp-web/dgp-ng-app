import { FactoryProvider, InjectionToken } from "@angular/core";
import { FileUploadEntities, FileUploadState, FileUploadStoreFeature } from "./models";
import { createEntityStore } from "entity-store";
import { ActionReducerMap } from "@ngrx/store";
import { closeFileManager, hideDropTarget, openFileManagerOverlay, showDropTarget } from "./actions";

export const fileUploadEntityStore = createEntityStore<FileUploadEntities, FileUploadStoreFeature>({
    storeFeature: "FileUpload",
    entityTypes: [
        "fileItem"
    ]
});

export const fileUploadReducer = new InjectionToken<FileUploadState>("hamburgerShellReducer");

export const fileUploadReducerImpl: ActionReducerMap<FileUploadState> = {
    ...fileUploadEntityStore.reducers,
    isFileManagerOpen: (state = false, action) => {

        switch (action.type) {
            case openFileManagerOverlay.type:
                return true;
            case closeFileManager.type:
                return false;
            default:
                return state;
        }

    },
    isDropTargetVisible: (state = false, action) => {

        switch (action.type) {
            case showDropTarget.type:
                return true;
            case hideDropTarget.type:
                return false;
            default:
                return state;
        }

    }
};

export function fileUploadReducerFactory() {
    return fileUploadReducerImpl;
}

export const fileUploadReducerProvider: FactoryProvider = {
    provide: fileUploadReducer,
    useFactory: fileUploadReducerFactory
};

