import { InspectorConfig } from "../models/inspector-config.model";
import { Provider, ValueProvider } from "@angular/core";
import { DEFAULT_INSPECTOR_CONFIG, inspectorDefaultConfig } from "../constants";

export function provideDefaultInspectorConfig(payload: Partial<InspectorConfig>): Provider {

    const resolvedConfig: InspectorConfig = {
        ...inspectorDefaultConfig,
        ...payload
    };

    return {
        provide: DEFAULT_INSPECTOR_CONFIG,
        useValue: resolvedConfig
    } as ValueProvider;

}
