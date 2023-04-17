import { ModelMetadata } from "data-modeling";
import { cspControlLineMetadata } from "./csp-control-line-metadata.constant";
import { cardinalYAxisMetadata } from "./cardinal-y-axis-metadata.constant";
import { cardinalXAxisMetadata } from "./cardinal-x-axis-metadata.constant";
import { ConnectedScatterPlot } from "../models";

export const connectedScatterPlotMetadata: ModelMetadata<ConnectedScatterPlot> = {
    label: "Connected scatter plot",

    attributes: {
        ...cardinalXAxisMetadata.attributes,
        ...cardinalYAxisMetadata.attributes,
        chartTitle: {
            label: "Chart title",
            icon: "label"
        },
        controlLines: {
            item: cspControlLineMetadata
        },
        lineWidth: {
            isRequired: false,
            defaultValue: 1.5
        }
    }
};
