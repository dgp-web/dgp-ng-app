/*
 * Public API Surface of dgp-ng-charts
 */

export { DgpNgChartsModule } from "./lib/dgp-ng-charts.module";

/**
 * -----
 * Box plot
 * -----
 */
export * from "./lib/box-plot/models";
export * from "./lib/box-plot/constants";
export * from "./lib/box-plot/functions";
export { DgpBoxPlotModule } from "./lib/box-plot/box-plot.module";
export { DgpBoxPlotComponent } from "./lib/box-plot/components/box-plot.component";
export { BoxPlotBottomAxisDirective } from "./lib/box-plot/directives/box-plot-bottom-axis.directive";
export { BoxPlotLeftAxisDirective } from "./lib/box-plot/directives/box-plot-left-axis.directive";
export { BoxPlotBoxFillPatternDirective } from "./lib/box-plot/directives/box-plot-box-fill-pattern.directive";
export { BoxPlotWhiskerDirective } from "./lib/box-plot/directives/box-plot-whisker.directive";
export { BoxPlotLowerAntennaDirective } from "./lib/box-plot/directives/box-plot-lower-antenna.directive";
export { BoxPlotUpperAntennaDirective } from "./lib/box-plot/directives/box-plot-upper-antenna.directive";
export { BoxPlotBoxDirective } from "./lib/box-plot/directives/box-plot-box.directive";
export { BoxPlotMedianDirective } from "./lib/box-plot/directives/box-plot-median.directive";
export { BoxPlotOutlierDirective } from "./lib/box-plot/directives/box-plot-outlier.directive";
export { BoxPlotBrushSelectorDirective } from "./lib/box-plot/directives/box-plot-brush-selector.directive";
export { BoxPlotOutlierTooltipDirective } from "./lib/box-plot/directives/box-plot-outlier-tooltip.directive";

/**
 * -----
 * Chart
 * -----
 */

export { DgpChartModule } from "./lib/chart/chart.module";
export { DgpChartComponent } from "./lib/chart/components/chart.component";
export { DgpChartComponentBase } from "./lib/chart/components/chart.component-base";

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
 * Masks
 * -----
 */
export { DgpSVGMasksModule } from "./lib/masks/svg-masks.module";
export { DgpCheckerboardMaskComponent } from "./lib/masks/components/checkerboard-mask.component";
export { DgpDiagonalCheckerboardMaskComponent } from "./lib/masks/components/diagonal-checkerboard-mask.component";
export { DgpDiagonalGridMaskComponent } from "./lib/masks/components/diagonal-grid-mask.component";
export { DgpGridMaskComponent } from "./lib/masks/components/grid-mask.component";
export { DgpHorizontalLinesMaskComponent } from "./lib/masks/components/horizontal-lines-mask.component";
export { DgpVerticalLinesMaskComponent } from "./lib/masks/components/vertical-lines-mask.component";

/**
 * -----
 * Patterns
 * -----
 */
export { DgpSVGPatternsModule } from "./lib/patterns/svg-patterns.module";
export { DgpCheckerboardPatternComponent } from "./lib/patterns/components/checkerboard-pattern.component";
export {
    DgpDiagonalCheckerboardPatternComponent
} from "./lib/patterns/components/diagonal-checkerboard-pattern.component";
export {
    DgpLinesFromLeftBottomToRightTopPatternComponent
} from "./lib/patterns/components/lines-from-left-bottom-to-right-top-pattern.component";
export {
    DgpLinesFromLeftTopToRightBottomComponent
} from "./lib/patterns/components/lines-from-left-top-to-right-bottom-pattern.component";
export { DgpVerticalLinesPatternComponent } from "./lib/patterns/components/vertical-lines-pattern.component";
export { DgpHorizontalLinesPatternComponent } from "./lib/patterns/components/horizontal-lines-pattern.component";

/**
 * -----
 * Shared
 * -----
 */
export * from "./lib/shared/models";
export * from "./lib/shared/chart.component-base";

export { ChartComponentBase } from "./lib/shared/chart.component-base";
