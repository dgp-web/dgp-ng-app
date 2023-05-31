import { ConnectedScatterPlotChartConfig } from "../models";
import { defaultWithCardinalScaleOffset } from "../../shared/constants";

export const defaultConnectedScatterPlotConfig: ConnectedScatterPlotChartConfig = {
    ...defaultWithCardinalScaleOffset,
    margin: {
        top: 1,
        right: 1,
        left: 50,
        bottom: 20
    },
    refTickCharWidth: 10
};
