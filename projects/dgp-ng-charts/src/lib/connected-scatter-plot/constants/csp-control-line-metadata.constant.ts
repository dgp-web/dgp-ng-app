import { ModelMetadata } from "data-modeling";
import { ConnectedScatterPlotControlLine } from "../models";

export const cspControlLineMetadata: ModelMetadata<ConnectedScatterPlotControlLine> = {
    attributes: {
        label: {
            label: "Label",
            icon: "label"
        },
        value: {
            label: "Value",
            icon: "pin"
        },
        colorHex: {
            label: "Color",
            icon: "palette"
        }
    }
};
