import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ContentBlockEditorState, contentBlockEditorStore, contentBlockEditorStoreFeature } from "./store";
import { DocumentPresentationModel, SectionPresentationModel } from "./components/document-details.component";

export const contentBlockEditorFeatureSelector = createFeatureSelector<ContentBlockEditorState>(
    contentBlockEditorStoreFeature
);

export const getAllDocuments = createSelector(
    contentBlockEditorFeatureSelector,
    contentBlockEditorStore.selectors.documents.getAll
);

export const getAllSections = createSelector(
    contentBlockEditorFeatureSelector,
    contentBlockEditorStore.selectors.sections.getAll
);

export const getAllContentBlocks = createSelector(
    contentBlockEditorFeatureSelector,
    contentBlockEditorStore.selectors.contentBlocks.getAll
);

export const getSelectedContentBlock = createSelector(
    contentBlockEditorFeatureSelector,
    contentBlockEditorStore.selectors.contentBlocks.getFirstSelected
);

export const getSelectedDocument = createSelector(
    contentBlockEditorFeatureSelector,
    contentBlockEditorStore.selectors.documents.getFirstSelected
);

export const getDocumentPresentationModel = createSelector(
    getAllSections,
    getAllContentBlocks,
    getSelectedDocument,
    getSelectedContentBlock,
    (sections, contentBlocks, selectedDocument, selectedContentBlock) => {

        if (!selectedDocument) {
            return null;
        }

        return {
            ...selectedDocument,
            selectedContentBlock,
            sections: sections.filter(section => {
                return section.documentTemplateId === selectedDocument.documentTemplateId
                    && section.documentNumber === selectedDocument.documentNumber;
            }).map(section => {
                return {
                    ...section,
                    contentBlocks: contentBlocks.filter(contentBlock => {
                        return contentBlock.documentTemplateId === section.documentTemplateId
                            && contentBlock.documentNumber === section.documentNumber
                            && contentBlock.sectionNumber === section.sectionNumber;
                    }).sort((a, b) => a.position - b.position)
                } as SectionPresentationModel;
            }).sort((a, b) => a.position - b.position)
        } as DocumentPresentationModel;

    }
);
