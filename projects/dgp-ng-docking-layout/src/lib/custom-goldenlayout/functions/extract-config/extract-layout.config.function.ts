import { LayoutConfiguration } from "../../types";
import { Mutable } from "data-modeling";
import { RootComponent } from "../../components/root.component";

export function extractLayoutConfig(payload: {
    readonly rootComponent: RootComponent;
    readonly currentConfig: LayoutConfiguration;
}): LayoutConfiguration {
    const config: Mutable<LayoutConfiguration> = {
        settings: payload.currentConfig.settings,
        dimensions: payload.currentConfig.dimensions,
        content: []
    };

    this.extractConfigFromItem(config, payload.rootComponent);

    return config;
}
