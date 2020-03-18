import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FileUploadState, fileUploadStoreFeature } from "./models";
import { getAll, getFirstSelected } from "entity-store";

export const fileUploadFeatureSelector = createFeatureSelector<FileUploadState>(fileUploadStoreFeature);

export const getFileItemState = createSelector(fileUploadFeatureSelector, x => x.fileItem);

export const getAllFileItems = createSelector(getFileItemState, getAll);

export const getSelectedFileItem = createSelector(getFileItemState, getFirstSelected);
