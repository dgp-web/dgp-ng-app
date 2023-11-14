import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FileUploadState, fileUploadStoreFeature } from "./models";
import { getAll } from "entity-store";
import { getSelectedActionContextValue } from "../action-context/selectors/get-selected-action-context-value.selector";
import { getSelectedActionContextType } from "../action-context/selectors/get-selected-action-context-type.selector";
import { FileItem, FileItemListModel } from "../file-viewer/models";

export const fileUploadFeatureSelector = createFeatureSelector<FileUploadState>(fileUploadStoreFeature);

export const getFileItemState = createSelector(fileUploadFeatureSelector, x => x.fileItem);
export const getDirectoryState = createSelector(fileUploadFeatureSelector, x => x.directory);

export const getAllFileItems = createSelector(getFileItemState, x => getAll(x));
export const getFileItemKVS = createSelector(getFileItemState, x => x.entities);
export const getAllDirectories = createSelector(getDirectoryState, x => getAll(x));

export const getFileItemListModel = createSelector(
    getAllDirectories, getFileItemKVS, (directories, fileItemKVS) => {
        return {
            directories, fileItemKVS
        } as FileItemListModel;
    });
 
export const getSelectedFileItem = createSelector(
    getSelectedActionContextValue,
    getSelectedActionContextType, (value, type) => {

        if (type !== "fileItem") return null;
        if (!value) return null;

        return value as FileItem;
    }
);

export const isFileManagerOpen = createSelector(fileUploadFeatureSelector, x => x.isFileManagerOpen);

export const canOpenFileDrawer = createSelector(fileUploadFeatureSelector, x => x.initialConfig.canOpenFileDrawer);

export const isAddFilesDisabled = createSelector(fileUploadFeatureSelector, x => !x.initialConfig.editingCapabilities.canAddFiles);
export const isRemoveFilesDisabled = createSelector(fileUploadFeatureSelector, x => !x.initialConfig.editingCapabilities.canRemoveFiles);

export const isDropTargetVisible = createSelector(fileUploadFeatureSelector,
    x => x.initialConfig.editingCapabilities.canAddFiles
        && (x.isDropTargetVisible || x.fileItem.ids.length === 0)
);
