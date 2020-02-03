import { createEntityStore } from "entity-store";

export interface DocumentTemplateId {
    readonly documentTemplateId: string;
}

export interface DocumentTemplate extends DocumentTemplateId {
    readonly label: string;
}

export interface DocumentId extends DocumentTemplateId {
    readonly documentNumber: number;
}

export interface DocumentCreationModel extends DocumentTemplateId {
    readonly label: string;
}

export interface Document extends DocumentId {
    readonly label: string;
}

export interface SectionId extends DocumentId {
    readonly sectionNumber: number;
}

export interface Section extends SectionId {
    readonly label: string;
    readonly position: number;
}

export interface ContentBlockTypeId extends DocumentTemplateId {
    readonly contentBlockTypeNumber: number;
}

export interface ContentBlockType extends ContentBlockTypeId {
    readonly label: string;
    readonly description: string;
    readonly matIconName: string;
    readonly position: number;
}

export interface ContentBlockId extends ContentBlockTypeId, SectionId {
    readonly contentBlockNumber: number;
}

export interface ContentBlock extends ContentBlockId {
    readonly position: number;
    readonly label: string;
    readonly content: any;
}


export interface ContentBlockEditorEntities {
    /**
     * Templates
     */
    readonly documentTemplates: DocumentTemplate;
    readonly contentBlockTypes: ContentBlockType;
    /**
     * Concrete documents
     */
    readonly documents: Document;
    readonly sections: Section;
    readonly contentBlocks: ContentBlock;
}
