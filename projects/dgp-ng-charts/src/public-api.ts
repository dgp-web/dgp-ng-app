/*
 * Public API Surface of dgp-ng-charts
 */

export * from "./lib/dgp-ng-charts.module";

/**
 * -----
 * Box plot
 * -----
 */
export * from "./lib/box-plot/constants";
export * from "./lib/box-plot/functions";
export * from "./lib/box-plot/models";

export { BoxPlotComponent } from "./lib/box-plot/components/box-plot.component";

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
