import { ThemePalette } from "@angular/material/core";

export interface InspectorConfig {
    readonly responsive: boolean;
    readonly fieldLabelThemeColor: ThemePalette;
    readonly showFieldIcons: boolean;
    readonly maxContentWidth: string;
    readonly showFieldDescriptions: boolean | "onHover";
}

