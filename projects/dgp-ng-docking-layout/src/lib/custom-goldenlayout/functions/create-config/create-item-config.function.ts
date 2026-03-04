import { ItemConfiguration } from "../../types";
import { wrapInStack } from "../wrap-in-stack.function";

export function createItemConfig(node: ItemConfiguration) {
    for (const key in node) {
        if (node.hasOwnProperty(key) && key !== "props" && typeof node[key] === "object") {
            createItemConfig(node[key]);
        }
    }

    if (!node || !node.content) return;

    node.content = node.content?.map(contentItem => {
        if (contentItem.type === "component" && node.type !== "stack") {
            return wrapInStack(contentItem as any);
        } else {
            return contentItem;
        }
    });
/*
    for (const contentItem of node.content) {
        if (contentItem.type === "component" && node.type !== "stack") {

        }
    }*/

}
