import { createEntityStore, EntityStateMap } from "entity-store";
import { ContentBlockEditorEntities } from "./models";

export type ContentBlockEditorStoreFeature = "ContentBlockEditor";
export const contentBlockEditorStoreFeature: ContentBlockEditorStoreFeature = "ContentBlockEditor";


export const contentBlockEditorStore = createEntityStore<ContentBlockEditorEntities, ContentBlockEditorStoreFeature>({
    entityTypes: ["documentTemplates", "contentBlockTypes", "documents", "sections", "contentBlocks"],
    storeFeature: "ContentBlockEditor"
});

export type ContentBlockEditorState = EntityStateMap<ContentBlockEditorEntities>;
