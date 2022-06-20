import { Many } from "data-modeling";
import { HTMLPageContent } from "./html-page-content.model";

export interface PagedHTMLContent {
    readonly pages: Many<HTMLPageContent>;
}
