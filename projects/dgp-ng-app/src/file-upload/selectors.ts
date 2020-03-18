import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FileUploadState, fileUploadStoreFeature } from "./models";
import { getAll } from "entity-store";

export const fileUploadFeatureSelector = createFeatureSelector<FileUploadState>(fileUploadStoreFeature);

export const getAllFileItems = createSelector(
    fileUploadFeatureSelector, x => getAll(x.fileItem)
);
