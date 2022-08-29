import { HTMLSection } from "../models";
import { extractHTMLItemsFromTableSection } from "./extract-html-items-from-table-section.function";
import { extractHTMLItemsFromTextSection } from "./extract-html-items-from-text-section.function";

export function extractHTMLItemsFromSection(payload: HTMLSection): NodeListOf<HTMLElement | Element> {
    switch (payload.type) {
        case "text":
            return extractHTMLItemsFromTextSection(payload.nativeElement);
        case "table":
            return extractHTMLItemsFromTableSection(payload.nativeElement);
    }
}
