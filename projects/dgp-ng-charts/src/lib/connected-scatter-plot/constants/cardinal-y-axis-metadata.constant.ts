import { ModelMetadata } from "data-modeling";
import { CardinalYAxis } from "../../shared/models";

export const cardinalYAxisMetadata: ModelMetadata<CardinalYAxis> = {
    label: "Y axis",
    icon: "border_left",
    attributes: {
        yAxisMin: {
            label: "Min",
            icon: "minimize"
        },
        yAxisMax: {
            label: "Max",
            icon: "maximize"
        },
        yAxisStep: {
            label: "Ticks",
            icon: "pin"
        }
    }
};
