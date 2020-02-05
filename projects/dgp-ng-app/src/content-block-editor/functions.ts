import { ContentBlockId } from "./models";

export function getContentBlockSurrogateKey(
    contentBlockId: ContentBlockId
): string {
    return contentBlockId.documentTemplateId + "." + contentBlockId.documentNumber + "." + contentBlockId.contentBlockNumber;
}
