import { ModelMetadata } from "data-modeling";
import { CardinalXAxis } from "../../shared/models";

export const cardinalXAxisMetadata: ModelMetadata<CardinalXAxis> = {
    label: "X axis",
    icon: "border_bottom",
    attributes: {
        xAxisMin: {
            label: "Min",
            icon: "minimize"
        },
        xAxisMax: {
            label: "Max",
            icon: "maximize"
        },
        xAxisStep: {
            label: "Ticks",
            icon: "pin"
        }
    }
};
