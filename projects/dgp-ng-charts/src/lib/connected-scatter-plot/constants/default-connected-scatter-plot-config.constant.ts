import { ConnectedScatterPlotConfig } from "../models";
import { defaultWithCardinalScaleOffset } from "../../shared/constants";

export const defaultConnectedScatterPlotConfig: ConnectedScatterPlotConfig = {
    ...defaultWithCardinalScaleOffset,
    margin: {
        top: 10,
        right: 30,
        left: 50,
        bottom: 20
    }
};
