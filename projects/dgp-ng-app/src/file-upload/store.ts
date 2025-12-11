import { defaultFileUploadConfig, FileUploadEntities, FileUploadState, FileUploadStoreFeature } from "./models";
import { createEntityStore } from "entity-store";
import { ActionReducerMap, createReducer, on } from "@ngrx/store";
import { closeFileManager, hideDropTarget, openFileManagerOverlay, setConfig, setIsFileDrawerOpen, showDropTarget } from "./actions";
import { DrawerMode } from "../drawer-layout/models";

export const fileUploadEntityStore = createEntityStore<FileUploadEntities, FileUploadStoreFeature>({
    storeFeature: "FileUpload",
    entityTypes: [
        "directory",
        "fileItem"
    ]
});

export const fileUploadReducer: ActionReducerMap<FileUploadState> = {
    ...fileUploadEntityStore.reducers,
    isFileManagerOpen: createReducer(false,
        on(openFileManagerOverlay, () => true),
        on(closeFileManager, () => false),
    ),
    isDropTargetVisible: createReducer(false,
        on(showDropTarget, () => true),
        on(hideDropTarget, () => false),
    ),
    initialConfig: createReducer(defaultFileUploadConfig,
        on(setConfig, (state, action) => action.config)
    ),
    fileDrawerLayout: createReducer({isDrawerOpen: true, drawerMode: DrawerMode.Side},
        on(setIsFileDrawerOpen, (state, action) => {
            return {
                ...state,
                isDrawerOpen: action.isDrawerOpen
            };
        })
    ),
};

