/*
 * Public API Surface of dgp-ng-charts
 */

/**
 * -----
 * Bar chart
 * -----
 */
export * from "./lib/bar-chart/models";
export * from "./lib/bar-chart/constants";
export { DgpBarChartModule } from "./lib/bar-chart/bar-chart.module";
export { DgpBarChartComponent } from "./lib/bar-chart/components/bar-chart.component";
export { DgpExportChartDialogComponent } from "./lib/bar-chart/components/export-chart-dialog.component";
export { BarChartBarDirective } from "./lib/bar-chart/directives/bar-chart-bar.directive";
export { BarChartBarFillPatternDirective } from "./lib/bar-chart/directives/bar-chart-bar-fill-pattern.directive";
export { BarChartBarGroupDirective } from "./lib/bar-chart/directives/bar-chart-bar-group.directive";

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
export { BoxPlotBoxFillPatternDirective } from "./lib/box-plot/directives/box-plot-box-fill-pattern.directive";
export { BoxPlotWhiskerDirective } from "./lib/box-plot/directives/box-plot-whisker.directive";
export { BoxPlotLowerAntennaDirective } from "./lib/box-plot/directives/box-plot-lower-antenna.directive";
export { BoxPlotUpperAntennaDirective } from "./lib/box-plot/directives/box-plot-upper-antenna.directive";
export { BoxPlotBoxDirective } from "./lib/box-plot/directives/box-plot-box.directive";
export { BoxPlotMedianDirective } from "./lib/box-plot/directives/box-plot-median.directive";
export { BoxPlotBoxGroupDirective } from "./lib/box-plot/directives/box-plot-box-group.directive";
export { BoxPlotOutlierDirective } from "./lib/box-plot/directives/box-plot-outlier.directive";
export { BoxPlotBrushSelectorDirective } from "./lib/box-plot/directives/box-plot-brush-selector.directive";
export { BoxPlotControlLineDirective } from "./lib/box-plot/directives/box-plot-control-line.directive";
export { BoxPlotOutlierTooltipDirective } from "./lib/box-plot/directives/box-plot-outlier-tooltip.directive";
export { TrackByBoxOutlierKeyPipe } from "./lib/box-plot/pipes/track-by-box-outlier-key.pipe";

/**
 * -----
 * Chart
 * -----
 */

export { DgpChartModule } from "./lib/chart/chart.module";
export { DgpChartComponent } from "./lib/chart/components/chart.component";
export { DgpChartComponentBase } from "./lib/chart/components/chart.component-base";
export { DgpCardinalXYAxisChartComponentBase } from "./lib/chart/components/cardinal-xy-axis-chart.component-base";
export { DgpCardinalYAxisChartComponentBase } from "./lib/chart/components/cardinal-y-axis-chart.component-base";
export { DgpChartBottomAxisDirective } from "./lib/chart/directives/chart-bottom-axis.directive";
export { DgpChartContainerAreaClipPathDirective } from "./lib/chart/directives/chart-container-area-clip-path.directive";
export { DgpChartDataAreaClipPathDirective } from "./lib/chart/directives/chart-data-area-clip-path.directive";
export { DgpChartLeftAxisDirective } from "./lib/chart/directives/chart-left-axis.directive";
export { DgpChartXAxisGridLinesDirective } from "./lib/chart/directives/chart-xaxis-grid-lines.directive";
export { DgpChartYAxisGridLinesDirective } from "./lib/chart/directives/chart-yaxis-grid-lines.directive";

/**
 * -----
 * Chart container
 * -----
 */
export { DgpChartContainerModule } from "./lib/chart-container/chart-container.module";
export { ChartContainerComponent } from "./lib/chart-container/components/chart-container.component";

/**
 * -----
 * Connected scatter plot
 * -----
 */
export * from "./lib/connected-scatter-plot/constants";
export * from "./lib/connected-scatter-plot/functions";
export * from "./lib/connected-scatter-plot/models";

export { DgpConnectedScatterPlotModule } from "./lib/connected-scatter-plot/connected-scatter-plot.module";
export {
    DgpConnectedScatterPlotComponent
} from "./lib/connected-scatter-plot/components/connected-scatter-plot.component";
export {
    DgpChartSVGRootComponent
} from "./lib/connected-scatter-plot/components/chart-svg-root.component";

// Directives
export {
    DgpConnectedScatterPlotControlLineDirective
} from "./lib/connected-scatter-plot/directives/connected-scatter-plot-control-line.directive";
export { DgpScatterPlotDotDirective } from "./lib/connected-scatter-plot/directives/scatter-plot-dot.directive";
export {
    DgpScatterPlotDotTooltipDirective
} from "./lib/connected-scatter-plot/directives/scatter-plot-dot-tooltip.directive";
export { DgpLineChartLineDirective } from "./lib/connected-scatter-plot/directives/line-chart-line.directive";
export { TrackByConnectedScatterDotPipe } from "./lib/connected-scatter-plot/pipes/track-by-connected-scatter-dot.pipe";

/**
 * -----
 * Dot
 * -----
 */
export { DgpDotModule } from "./lib/dot/dot.module";
export { DgpDotComponent } from "./lib/dot/components/dot.component";

/**
 * -----
 * Fill-pattern icon
 * -----
 */
export * from "./lib/fill-pattern-icon/constants";
export * from "./lib/fill-pattern-icon/functions";
export * from "./lib/fill-pattern-icon/models";

export { DgpFillPatternIconModule } from "./lib/fill-pattern-icon/fill-pattern-icon.module";
export { DgpFillPatternIconComponent } from "./lib/fill-pattern-icon/components/fill-pattern-icon.component";

/**
 * -----
 * Fill-pattern select
 * -----
 */

export { DgpFillPatternSelectModule } from "./lib/fill-pattern-select/fill-pattern-select.module";
export { DgpFillPatternSelectComponent } from "./lib/fill-pattern-select/components/fill-pattern-select.component";

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
 * Masks
 * -----
 */
export { DgpSVGMasksModule } from "./lib/masks/svg-masks.module";
export * from "./lib/masks/constants";
export * from "./lib/masks/models";
// Directives
export { SVGMaskBaseDirective } from "./lib/masks/directives/svg-mask-base.directive";
export { CheckerboardMaskDirective } from "./lib/masks/directives/checkerboard-mask.directive";
export { DiagonalCheckerboardMaskDirective } from "./lib/masks/directives/diagonal-checkerboard-mask.directive";
export { DiagonalGridMaskDirective } from "./lib/masks/directives/diagonal-grid-mask.directive";
export { GridMaskDirective } from "./lib/masks/directives/grid-mask.directive";
export { HorizontalLinesMaskDirective } from "./lib/masks/directives/horizontal-lines-mask.directive";
export {
    LinesFromLeftBottomToRightTopMaskDirective
} from "./lib/masks/directives/lines-from-left-bottom-to-right-top-mask.directive";
export {
    LinesFromLeftTopToRightBottomMaskDirective
} from "./lib/masks/directives/lines-from-left-top-to-right-bottom-mask.directive";
export { VerticalLinesMaskDirective } from "./lib/masks/directives/vertical-lines-mask.directive";

/**
 * -----
 * Patterns
 * -----
 */
export { DgpSVGPatternsModule } from "./lib/patterns/svg-patterns.module";
export * from "./lib/patterns/constants";
export * from "./lib/patterns/models";
// Directives
export { SVGPatternBaseDirective } from "./lib/patterns/directives/svg-pattern-base.directive";
export { CheckerboardPatternDirective } from "./lib/patterns/directives/checkerboard-pattern.directive";
export {
    DiagonalCheckerboardPatternDirective
} from "./lib/patterns/directives/diagonal-checkerboard-pattern.directive";
export { HorizontalLinesPatternDirective } from "./lib/patterns/directives/horizontal-lines-pattern.directive";
export {
    LinesFromLeftBottomToRightTopPatternDirective
} from "./lib/patterns/directives/lines-from-left-bottom-to-right-bottom-top.directive";
export {
    LinesFromLeftTopToRightBottomPatternDirective
} from "./lib/patterns/directives/lines-from-left-top-to-right-bottom-pattern.directive";
export { VerticalLinesPatternDirective } from "./lib/patterns/directives/vertical-lines-pattern.directive";

/**
 * -----
 * Plot container
 * -----
 */

export { DgpPlotContainerModule } from "./lib/plot-container/dgp-plot-container.module";
export { DgpPlotContainerComponent } from "./lib/plot-container/components/plot-container.component";

/**
 * -----
 * Shape select
 * -----
 */

export { DgpShapeSelectModule } from "./lib/shape-select/shape-select.module";
export { DgpShapeSelectComponent } from "./lib/shape-select/components/shape-select.component";

/**
 * -----
 * Shared
 * -----
 */
export * from "./lib/shared/models";
export * from "./lib/shared/chart.component-base";
export { createIdPrefix } from "./lib/shared/create-id-prefix.function";
export { ID_PREFIX } from "./lib/shared/id-prefix-injection-token.constant";
export { idPrefixProvider } from "./lib/shared/id-prefix-provider.constant";

export { ChartComponentBase } from "./lib/shared/chart.component-base";

/**
 * -----
 * Shapes
 * -----
 */
export * from "./lib/shapes/constants";
export * from "./lib/shapes/models";
export { DgpSVGSymbolsModule } from "./lib/shapes/svg-shape.module";
// Components
export { CircleShapeComponent } from "./lib/shapes/components/circle-shape.component";
export { CrossShapeComponent } from "./lib/shapes/components/cross-shape.component";
export { RectangleShapeComponent } from "./lib/shapes/components/rectangle-shape.component";
export { RhombusShapeComponent } from "./lib/shapes/components/rhombus-shape.component";
export { StarShapeComponent } from "./lib/shapes/components/star-shape.component";
export { SVGShapeComponent } from "./lib/shapes/components/svg-shape.component";
export { ShapeBaseComponent } from "./lib/shapes/components/shape.base-component";
export { TriangleDownShapeComponent } from "./lib/shapes/components/triangle-down-shape.component";
export { TriangleLeftShapeComponent } from "./lib/shapes/components/triangle-left-shape.component";
export { TriangleRightShapeComponent } from "./lib/shapes/components/triangle-right-shape.component";
export { TriangleShapeComponent } from "./lib/shapes/components/triangle-shape.component";

// Directives
export { CircleDirective } from "./lib/shapes/directives/circle.directive";
export { CrossDirective } from "./lib/shapes/directives/cross.directive";
export { RectangleDirective } from "./lib/shapes/directives/rectangle.directive";
export { RhombusDirective } from "./lib/shapes/directives/rhombus.directive";
export { StarDirective } from "./lib/shapes/directives/star.directive";
export { SVGShapeBaseDirective } from "./lib/shapes/directives/svg-shape.base-directive";
export { TriangleDirective } from "./lib/shapes/directives/triangle.directive";
export { TriangleDownDirective } from "./lib/shapes/directives/triangle-down.directive";
export { TriangleLeftDirective } from "./lib/shapes/directives/triangle-left.directive";
export { TriangleRightDirective } from "./lib/shapes/directives/triangle-right.directive";

/**
 * -----
 * Strokes
 * -----
 */
export * from "./lib/stroke/constants";
export * from "./lib/stroke/functions";
export * from "./lib/stroke/models";
