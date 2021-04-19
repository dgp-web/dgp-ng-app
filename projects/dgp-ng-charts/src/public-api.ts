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
export { BoxPlotNgComponent } from "./lib/box-plot/components/box-plot-ng.component";
export { BoxPlotBottomAxisDirective } from "./lib/box-plot/directives/box-plot-bottom-axis.directive";

/**
 * -----
 * Chart container
 * -----
 */

export { DgpChartContainerModule } from "./lib/chart-container/chart-container.module";
export { ChartContainerComponent } from "./lib/chart-container/components/chart-container.component";

/**
 * -----
 * Heatmap
 * -----
 */
export * from "./lib/heatmap/constants";
export * from "./lib/heatmap/functions";
export * from "./lib/heatmap/models";

export { DgpHeatmapModule } from "./lib/heatmap/heatmap.module";
export { HeatmapComponent } from "./lib/heatmap/components/heatmap.component";
export { HeatmapLegendComponent } from "./lib/heatmap/components/heatmap-legend.component";
export { ExportChartDialogComponent } from "./lib/heatmap/components/export-chart-dialog.component";

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
export * from "./lib/shared/models";
export * from "./lib/shared/chart.component-base";

export { ChartComponentBase } from "./lib/shared/chart.component-base";
