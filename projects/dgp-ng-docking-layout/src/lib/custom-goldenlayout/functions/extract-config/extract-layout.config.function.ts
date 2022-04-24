import { AbstractContentItemComponent } from "../../components/abstract-content-item.component";
import { LayoutConfiguration } from "../../types";
import { Mutable } from "data-modeling";

export function extractLayoutConfig(payload: {
    readonly rootComponent: AbstractContentItemComponent;
    readonly currentConfig: LayoutConfiguration;
}): LayoutConfiguration {
    const config: Mutable<LayoutConfiguration> = {
        settings: payload.currentConfig.settings,
        dimensions: payload.currentConfig.dimensions,
        labels: payload.currentConfig.labels,
        content: []
    };

    this.extractConfigFromItem(config, payload.rootComponent);

    return config;
}
