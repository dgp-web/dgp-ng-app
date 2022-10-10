import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
    BoxPlotRenderer,
    BoxPlotSelection,
    BoxValues,
    computeBoxFromValues,
    ExportChartConfig,
    FillPattern,
    HeatmapSegment,
    HeatmapSelection,
    HeatmapTile,
    Shape
} from "dgp-ng-charts";
import { testBoxGroups } from "../constants/test-box-groups.constant";
import { testBarGroups } from "../constants/test-bar-groups.constant";
import { testConnectedScatterGroups } from "../constants/test-connected-scatter-groups.constant";
import { BoxPlotControlLine } from "../../../../../../dgp-ng-charts/src/lib/box-plot/models";
import { ConnectedScatterPlotControlLine } from "../../../../../../dgp-ng-charts/src/lib/connected-scatter-plot/models";
import { ScaleType } from "../../../../../../dgp-ng-charts/src/lib/shared/models";
import { testLogBoxGroups } from "../constants/test-log-box-groups.constant";
import { testLogConnectedScatterGroups } from "../constants/test-log-connected-scatter-groups.constant";

@Component({
    selector: "dgp-charts-labs",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Charts
        </dgp-page-header>

        <dgp-docs-page>

            <dgp-docs-page-content>

                <dgp-docs-section-title>
                    Connected scatterplot
                </dgp-docs-section-title>

                <dgp-connected-scatter-plot [model]="connectedScatterGroups"
                                            [autoResize]="false"></dgp-connected-scatter-plot>

                <dgp-connected-scatter-plot [model]="logConnectedScatterGroups"
                                            yAxisScaleType="Logarithmic"
                                            [autoResize]="false"></dgp-connected-scatter-plot>

                <dgp-connected-scatter-plot [model]="connectedScatterGroups"
                                            [controlLines]="connectedScatterPlotControlLines"
                                            xAxisMin="1"
                                            xAxisMax="6"
                                            yAxisMin="2"
                                            yAxisMax="9"
                                            [autoResize]="false"></dgp-connected-scatter-plot>
                <dgp-docs-section-title>
                    Box plot
                </dgp-docs-section-title>

                <dgp-box-plot [model]="boxGroups"
                              [yAxisScaleType]="axisScaleTypeEnum.Linear"
                              yAxisMin="3"
                              [showXAxisGridLines]="false"
                              [showYAxisGridLines]="false"
                              [showOutlierTooltips]="false"
                              [renderer]="boxPlotRenderer"
                              [autoResize]="false"></dgp-box-plot>

                <dgp-box-plot [yAxisScaleType]="axisScaleTypeEnum.Logarithmic"
                              [model]="logBoxGroups"
                              [renderer]="boxPlotRenderer"
                              [autoResize]="false"></dgp-box-plot>

                <dgp-box-plot [model]="boxGroups"
                              [controlLines]="boxPlotControlLines"
                              chartTitle="Title"
                              [renderer]="boxPlotRenderer"
                              yAxisTitle="Title for the y axis"
                              xAxisTitle="Title for the x axis"
                              [autoResize]="false">

                    <ng-container right-legend>
                        Right legend
                    </ng-container>

                </dgp-box-plot>

                <dgp-docs-section-title>
                    Bar chart
                </dgp-docs-section-title>

                <dgp-bar-chart [model]="barGroups"></dgp-bar-chart>

                <dgp-docs-section-title>
                    Heat map
                </dgp-docs-section-title>

                <dgp-heatmap [model]="heatmapTiles"
                             chartTitle="Chart title"
                             yAxisTitle="y axis"
                             xAxisTitle="x axis"
                             selectionMode="Brush"
                             [exportConfig]="exportConfig"
                             [segments]="heatmapSegments"
                             (selectionChange)="selectTiles($event)">

                    <ng-container right-legend>Right</ng-container>

                    <ng-container bottom-legend>Bottom</ng-container>

                </dgp-heatmap>

                <dgp-docs-section-title>
                    Form elements
                </dgp-docs-section-title>

                <dgp-fill-pattern-select [model]="fillPattern"
                                         (modelChange)="updateFillPattern($event)"></dgp-fill-pattern-select>

                <dgp-shape-select [model]="shape"
                                  (modelChange)="updateShape($event)"></dgp-shape-select>


            </dgp-docs-page-content>

        </dgp-docs-page>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            height: 100%;
            overflow: auto;
        }

        dgp-connected-scatter-plot, dgp-box-plot, dgp-heatmap, dgp-bar-chart {
            width: 640px;
            max-height: 480px;
            min-height: 400px;
            margin: auto;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsLabsComponent {

    readonly boxPlotRenderer = BoxPlotRenderer.Hybrid;

    readonly axisScaleTypeEnum = ScaleType;
    fillPattern = FillPattern.All;
    shape = Shape.Circle;

    boxGroups = testBoxGroups;
    logBoxGroups = testLogBoxGroups;
    boxPlotControlLines: ReadonlyArray<BoxPlotControlLine> = [{
        boxPlotControlLineId: "01",
        value: 0.1,
        colorHex: "#338800",
        label: "Test limit"
    }, {
        boxPlotControlLineId: "02",
        value: 15.1,
        colorHex: "#338800",
        label: "Test limit"
    }];
    barGroups = testBarGroups;
    connectedScatterGroups = testConnectedScatterGroups;
    logConnectedScatterGroups = testLogConnectedScatterGroups;
    connectedScatterPlotControlLines: ReadonlyArray<ConnectedScatterPlotControlLine> = [{
        connectedScatterPlotControlLineId: "01",
        value: 2.5,
        colorHex: "#338800",
        label: "Test limit"
    }, {
        connectedScatterPlotControlLineId: "02",
        value: 8.3,
        colorHex: "#338800",
        label: "Test limit"
    }];

    readonly heatmapTiles: ReadonlyArray<HeatmapTile>;
    readonly heatmapSegments: ReadonlyArray<HeatmapSegment>;

    exportConfig: ExportChartConfig = {
        rightLegend: document.createElement("span")
    };

    constructor() {

        const heatmapTiles = new Array<HeatmapTile>();

        for (let i = 0; i < 50; i++) {
            for (let j = 0; j < 150; j++) {

                const value = Math.random() * (i + j);
                const useNullValue = (i + j) % 2;

                heatmapTiles.push({
                    x: j,
                    y: i,
                    value: useNullValue ? null : value
                });
            }
        }

        this.heatmapTiles = heatmapTiles;
        this.heatmapSegments = [{
            xStart: 0, yStart: 0, xEnd: 37, yEnd: 21,
            strokeColor: "#ffffff"
        }, {
            xStart: 12, yStart: 5, xEnd: 149, yEnd: 23,
            strokeColor: "#ffffff"
        }];

    }

    updateFillPattern(fillPattern: FillPattern) {
    }

    selectOutliers($event: BoxPlotSelection) {
        console.log($event);
    }

    selectTiles(heatmapTiles: HeatmapSelection) {
        // this.computeBoxes(heatmapTiles.tiles);
    }

    private computeBoxes(heatmapTiles: ReadonlyArray<HeatmapTile>) {

        const values: BoxValues = {
            boxValuesId: "test", originalValues: heatmapTiles.map(x => x.value)
        };

        const box = computeBoxFromValues({
            values,
            boxId: "first01",
            boxGroupId: "first",
            colorHex: "#3000f0"
        });

        this.boxGroups = [{
            value: "first",
            boxGroupId: "first",
            label: "First group",
            boxes: [box]
        }];

    }

    updateShape(shape: Shape) {

    }
}
