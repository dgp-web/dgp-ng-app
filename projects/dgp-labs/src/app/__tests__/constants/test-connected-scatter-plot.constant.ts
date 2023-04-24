import { ConnectedScatterPlot, ControlLineAxis, ScaleType, Stroke } from "dgp-ng-charts";
import { testConnectedScatterGroups } from "../../features/charts/constants/test-connected-scatter-groups.constant";

export const testConnectedScatterPlot: ConnectedScatterPlot = {
    model: testConnectedScatterGroups,
    xAxisTitle: "x-axis title",
    yAxisTitle: "y-axis title",
    chartTitle: "Chart title",
    controlLines: [{
        label: "Upper limit",
        colorHex: "#666666",
        connectedScatterPlotControlLineId: "upperLimit",
        value: 7,
        stroke: Stroke.Dashed
    }, {
        label: "Vertical limit",
        colorHex: "#999999",
        connectedScatterPlotControlLineId: "verticalLimit",
        value: 6,
        stroke: Stroke.Dashed,
        axis: ControlLineAxis.X
    }],
    showYAxisGridLines: true,
    showXAxisGridLines: true,
    yAxisScaleType: ScaleType.Linear,
    xAxisScaleType: ScaleType.Logarithmic,
    dotSize: 10,
    lineWidth: 1.5
};
