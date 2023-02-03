import { ModelMetadata } from "data-modeling";
import { CardinalXAxis } from "../../../../../dgp-ng-charts/src/lib/shared/models";
import { CardinalYAxis } from "dgp-ng-charts";

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
