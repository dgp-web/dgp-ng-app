import { Many } from "data-modeling";
import { HTMLPage } from "./html-page.model";

export interface PagedHTML {
    readonly pages: Many<HTMLPage>;
}
