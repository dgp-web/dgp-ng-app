import { defaultFileUploadConfig, FileUploadEntities, FileUploadState, FileUploadStoreFeature } from "./models";
import { createEntityStore } from "entity-store";
import { ActionReducerMap } from "@ngrx/store";
import { closeFileManager, hideDropTarget, openFileManagerOverlay, setConfig, showDropTarget } from "./actions";

export const fileUploadEntityStore = createEntityStore<FileUploadEntities, FileUploadStoreFeature>({
    storeFeature: "FileUpload",
    entityTypes: [
        "directory",
        "fileItem"
    ]
});

export const fileUploadReducer: ActionReducerMap<FileUploadState> = {
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

    },
    initialConfig: (state = defaultFileUploadConfig, action) => {
        if (action.type === setConfig.type) {
            return (action as any).config;
        } else {
            return state;
        }
    }
};

