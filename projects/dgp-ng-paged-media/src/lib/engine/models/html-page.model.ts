import { Many } from "data-modeling";

export interface HTMLPage {
    readonly itemsOnPage: Many<HTMLElement>;
}
