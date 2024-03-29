import { BoxPlotConfig } from "../models";
import { defaultWithCardinalScaleOffset } from "../../shared/constants";

export const defaultBoxPlotConfig: BoxPlotConfig = {
    ...defaultWithCardinalScaleOffset,
    margin: {
        top: 1,
        right: 1,
        left: 50,
        bottom: 20
    },
    groupPadding: 0.2,
    subGroupPadding: 0.05,
    jitterWidth: 12,
    refTickCharWidth: 10
};
