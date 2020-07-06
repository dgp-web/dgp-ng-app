/*
 * Public API Surface of dgp-ng-charts
 */

export { DgpNgChartsModule } from "./lib/dgp-ng-charts.module";

/**
 * -----
 * Box plot
 * -----
 */
export * from "./lib/box-plot/constants";
export * from "./lib/box-plot/functions";
export * from "./lib/box-plot/models";

export { DgpBoxPlotModule } from "./lib/box-plot/box-plot.module";
export { BoxPlotComponent } from "./lib/box-plot/components/box-plot.component";

/**
 * -----
 * Heatmap
 * -----
 */
export * from "./lib/heatmap/constants";
// export * from "./lib/heatmap/functions";
export * from "./lib/heatmap/models";

export { DgpHeatmapModule } from "./lib/heatmap/heatmap.module";
export { HeatmapComponent } from "./lib/heatmap/components/heatmap.component";

/**
 * -----
 * Line chart
 * -----
 */
export { LineChartComponent } from "./lib/line-chart/line-chart.component";

/**
 * -----
 * Shared
 * -----
 */
export { ChartComponentBase } from "./lib/shared/chart.component-base";
