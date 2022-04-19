import { BarChartConfig } from "../models";
import { defaultChartConfig } from "../../shared/constants";


export const defaultBarChartConfig: BarChartConfig = {
    ...defaultChartConfig,
    groupPadding: 0.2,
    subGroupPadding: 0.05,
    cardinalScaleOffset: 0.05
};
