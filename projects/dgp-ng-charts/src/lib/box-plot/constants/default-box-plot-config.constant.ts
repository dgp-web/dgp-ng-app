import { BoxPlotConfig } from "../models";
import { defaultWithCardinalScaleOffset } from "../../shared/constants";

export const defaultBoxPlotConfig: BoxPlotConfig = {
    ...defaultWithCardinalScaleOffset,
    margin: {
        top: 10,
        right: 0,
        left: 50,
        bottom: 20
    },
    groupPadding: 0.2,
    subGroupPadding: 0.05,
    jitterWidth: 50
};
