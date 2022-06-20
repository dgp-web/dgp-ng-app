import { PageSize } from "../models";

export function createHTMLWrapperElement<K extends keyof HTMLElementTagNameMap>(tagName: K, pageSize: PageSize) {

    const element = document.createElement(tagName);
    document.body.appendChild(element);
    element.style.width = pageSize.width + pageSize.widthUnit;

    return element;
}
