import { ConnectedScatterPlotConfig } from "../models";
import { defaultWithCardinalScaleOffset } from "../../shared/constants";

export const defaultConnectedScatterPlotConfig: ConnectedScatterPlotConfig = {
    ...defaultWithCardinalScaleOffset,
    margin: {
        top: 1,
        right: 1,
        left: 50,
        bottom: 20
    }
};
