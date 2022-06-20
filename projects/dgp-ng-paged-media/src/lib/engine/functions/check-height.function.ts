import { PageContentSize } from "../models";

export function checkHeight(payload: {
    readonly height: number;
    readonly pageContentSize: PageContentSize;
}) {
    const height = payload.height;
    const pageContentSize = payload.pageContentSize;

    if (height > pageContentSize.height) throw Error("Item height exceeds page height. This is not allowed.");
}
