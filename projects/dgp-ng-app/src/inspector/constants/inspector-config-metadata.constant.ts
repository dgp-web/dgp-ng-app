import { ModelMetadata } from "data-modeling";
import { InspectorConfig } from "../models";

export const inspectorConfigMetadata: ModelMetadata<InspectorConfig> = {
    attributes: {
        fieldLabelThemeColor: {
            label: "Label color",
            icon: "label",
            description: `Theme color of data labels.`,
            type: "string",
            defaultValue: undefined
        },
        maxContentWidth: {
            label: "Content width",
            icon: "space_bar",
            description: `Space reserved for displayed values.`,
            type: "string",
            defaultValue: "240px"
        },
        responsive: {
            label: "Responsive",
            icon: "repartition",
            description: `Display values below labels if there's little space`,
            type: "boolean",
            defaultValue: true
        },
        showFieldDescriptions: {
            label: "Descriptions",
            icon: "description",
            description: `Whether and where to display descriptions.`,
            type: "boolean",
            defaultValue: true
        },
        showFieldIcons: {
            label: "Icons",
            icon: "category",
            description: `Display icons for data fields.`,
            type: "boolean",
            defaultValue: true
        }
    }
};
