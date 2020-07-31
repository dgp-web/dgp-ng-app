import { BoxOutlierTooltipTextComputer, BoxPlotConfig } from "./models";

export const defaultBoxOutlierTooltipTextComputer: BoxOutlierTooltipTextComputer = x => x.boxGroupId + "_" + x.boxId + ": " + x.value.toPrecision(3);

export const defaultBoxPlotConfig: BoxPlotConfig = {
    margin: {
        top: 10,
        right: 30,
        left: 50,
        bottom: 20
    },
    groupPadding: 0.2,
    subGroupPadding: 0.05,
    cardinalScaleOffset: 0.05,
    jitterWidth: 50,
    showOutlierTooltips: true,
    outlierTooltipTextComputer: defaultBoxOutlierTooltipTextComputer
};
