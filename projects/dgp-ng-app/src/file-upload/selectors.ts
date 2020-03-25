import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FileUploadState, fileUploadStoreFeature } from "./models";
import { getAll, getFirstSelected } from "entity-store";
import { FileItemListModel } from "../file-viewer/components/file-item-list.component";

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

export const getSelectedFileItem = createSelector(getFileItemState, x => getFirstSelected(x));

export const isFileManagerOpen = createSelector(fileUploadFeatureSelector, x => x.isFileManagerOpen);


export const isAddFilesDisabled = createSelector(fileUploadFeatureSelector, x => !x.initialConfig.editingCapabilities.canAddFiles);
export const isRemoveFilesDisabled = createSelector(fileUploadFeatureSelector, x => !x.initialConfig.editingCapabilities.canRemoveFiles);


export const isDropTargetVisible = createSelector(fileUploadFeatureSelector,
    x => x.initialConfig.editingCapabilities.canAddFiles && (x.isDropTargetVisible || x.fileItem.ids.length === 0)
);
