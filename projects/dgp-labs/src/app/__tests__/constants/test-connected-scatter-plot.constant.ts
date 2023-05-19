import { ConnectedScatterPlot, ControlLineAxis, createNormalInterpolator, ScaleType, Stroke } from "dgp-ng-charts";
import { testConnectedScatterGroups } from "../../features/charts/constants/test-connected-scatter-groups.constant";
import { matrixToMany } from "dgp-ng-app";

export const yAxisInterpolator = createNormalInterpolator({
   /* pValues: testConnectedScatterGroups.map(group => {
        return group.series.map(series => series.dots.map(dot => {
            return dot.y;
        })).reduce(matrixToMany, []);
    }).reduce(matrixToMany, [])*/
});

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
    lineWidth: 1.5,
    yAxisInterpolator,
    yAxisMax: 100,
    yAxisMin: 0,
    yAxisTickValues: [1, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99]
};
