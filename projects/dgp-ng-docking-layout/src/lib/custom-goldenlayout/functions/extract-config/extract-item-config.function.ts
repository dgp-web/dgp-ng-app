import { ItemConfiguration } from "../../types";

export function extractItemConfig(configNode: ItemConfiguration, item: any) {
    let key: string;
    let i: number;

    for (key in item.config) {
        if (key !== "content") {
            configNode[key] = item.config[key];
        }
    }

    if (item.contentItems.length) {
        configNode.content = [];

        for (i = 0; i < item.contentItems.length; i++) {
            configNode.content[i] = {} as any; // TODO: Typing is not correct;
            this.extractConfigFromItem(configNode.content[i], item.contentItems[i]);
        }
    }
}

