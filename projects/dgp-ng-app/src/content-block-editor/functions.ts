import { ContentBlockId, DocumentId } from "./models";

export function getDocumentSurrogateKey(
    documentId: DocumentId
): string {
    return documentId.documentTemplateId + "." + documentId.documentNumber;
}

export function getContentBlockSurrogateKey(
    contentBlockId: ContentBlockId
): string {
    return getDocumentSurrogateKey(contentBlockId ) + contentBlockId.contentBlockNumber;
}
