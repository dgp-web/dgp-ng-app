import { ItemConfiguration } from "../../types";
import { AbstractContentItemComponent } from "../../components/abstract-content-item.component";

export function extractItemConfig(configNode: ItemConfiguration, item: AbstractContentItemComponent) {
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

