import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ContentBlockEditorState, contentBlockEditorStore, contentBlockEditorStoreFeature } from "./store";

export const contentBlockEditorFeatureSelector = createFeatureSelector<ContentBlockEditorState>(
    contentBlockEditorStoreFeature
);

export const getAllDocuments = createSelector(
    contentBlockEditorFeatureSelector,
    contentBlockEditorStore.selectors.documents.getAll
);
