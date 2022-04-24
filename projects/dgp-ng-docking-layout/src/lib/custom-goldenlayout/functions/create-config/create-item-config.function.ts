import { ItemConfiguration } from "../../types";

export function createItemConfig(node: ItemConfiguration) {
    for (const key in node) {
        if (node.hasOwnProperty(key) && key !== "props" && typeof node[key] === "object") {
            createItemConfig(node[key]);
        }
    }
}
