import { PageSize } from "../models";

export function checkHeight(payload: {
    readonly height: number;
    readonly pageSize: PageSize;
}) {
    const height = payload.height;
    const pageSize = payload.pageSize;

    if (height > pageSize.height) throw Error("Item height exceeds page height. This is not allowed.");
}
