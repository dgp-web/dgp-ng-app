import { HTMLSection } from "../models";
import { extractHTMLItemsFromTableSection } from "./extract-html-items-from-table-section.function";
import { extractHTMLItemsFromHeadingSection } from "./extract-html-items-from-heading-section.function";
import { extractHTMLItemsFromTextSection } from "./extract-html-items-from-text-section.function";

export function extractHTMLItemsFromSection(payload: HTMLSection): NodeListOf<HTMLElement> {
    switch (payload.type) {
        case "text":
            return extractHTMLItemsFromTextSection(payload.nativeElement);
        case "table":
            return extractHTMLItemsFromTableSection(payload.nativeElement) as any;
        case "heading":
            return extractHTMLItemsFromHeadingSection(payload.nativeElement) as any;
    }
}
