import { ItemType } from "../types";

export function createItemTypeCreatedEventType(payload: ItemType): string {
    return payload + "Created";
}
