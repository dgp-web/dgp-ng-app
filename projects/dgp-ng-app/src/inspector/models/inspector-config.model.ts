import { ThemePalette } from "@angular/material/core";

export interface InspectorConfig {
    readonly responsive: boolean;
    readonly fieldLabelThemeColor: ThemePalette;
    readonly showFieldIcons: boolean;
    readonly maxContentWidth: string;
}

export const inspectorDefaultConfig: InspectorConfig = {
    responsive: true,
    showFieldIcons: true,
    fieldLabelThemeColor: undefined,
    maxContentWidth: "240px"
};
