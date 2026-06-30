import { ModelMetadata } from "data-modeling";
import { HeatmapDemoConfig } from "../../models/heatmap/heatmap-demo-config.model";

export const heatmapDemoConfigMetadata: ModelMetadata<HeatmapDemoConfig> = {
    attributes: {
        rows: {
            min: 1,
            max: 1000,
            step: 1,
            isRequired: true,
            type: "number",
            label: "Rows"
        },
        columns: {
            min: 1,
            max: 1000,
            step: 1,
            isRequired: true,
            type: "number",
            label: "Columns"
        },
        useNullValues: {
            label: "Use empty values"
        }
    }
};
