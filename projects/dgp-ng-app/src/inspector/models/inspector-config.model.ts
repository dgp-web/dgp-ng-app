import { ThemePalette } from "@angular/material/core";

export interface InspectorConfig {
    readonly responsive: boolean;
    readonly fieldLabelMatThemeColor: ThemePalette;
    readonly showFieldIcons: boolean;
    readonly maxContentWidth: string;
}

export const inspectorDefaultConfig: InspectorConfig = {
    responsive: true,
    showFieldIcons: true,
    fieldLabelMatThemeColor: undefined,
    maxContentWidth: "240px"
};
