import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
    BoxGroup,
    BoxPlotSelection,
    BoxValues,
    computeBoxFromValues,
    FillPattern,
    HeatmapSelection,
    HeatmapTile
} from "dgp-ng-charts";
import { ExportChartConfig } from "../../../../../../dgp-ng-charts/src/lib/heatmap/models";

@Component({
    selector: "dgp-charts-labs",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Charts
        </dgp-page-header>

        <dgp-fill-pattern-select [model]="fillPattern"
                                 (modelChange)="updateFillPattern($event)"></dgp-fill-pattern-select>

        <dgp-box-plot [model]="boxGroups">

            <ng-container chart-title>
                Title via template slot
            </ng-container>

            <ng-container y-axis-title>
                Title for the y axis
            </ng-container>

            <ng-container x-axis-title>
                Title for the x axis
            </ng-container>

            <ng-container right-legend>
                Right legend
            </ng-container>

        </dgp-box-plot>

        <!-- <dgp-heatmap [model]="heatmapTiles"
                      chartTitle="Chart title"
                      yAxisTitle="y axis"
                      xAxisTitle="x axis"
                      selectionMode="Brush"
                      [exportConfig]="exportConfig"
                      (selectionChange)="selectTiles($event)">

             <ng-container right-legend>Right</ng-container>

             <ng-container bottom-legend>Bottom</ng-container>

         </dgp-heatmap>-->
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            height: 100%;
            overflow: auto;
        }

        dgp-line-chart, dgp-box-plot, dgp-heatmap {
            width: 640px;
            max-height: 480px;
            margin: auto;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsLabsComponent {

    fillPattern = FillPattern.All;

    boxGroups: ReadonlyArray<BoxGroup> = [{
        value: "first",
        boxGroupId: "first",
        boxes: [{
            boxId: "first01",
            boxGroupId: "first",
            quantiles: {
                min: 1,
                lower: 2.25,
                median: 5.5,
                upper: 6.75,
                max: 10
            },
            outliers: [
                17, 18
            ],
            colorHex: "#3000f0"
        }, {
            boxId: "first02",
            boxGroupId: "first",
            quantiles: {
                min: 2,
                lower: 3.25,
                median: 5,
                upper: 6,
                max: 9
            },
            outliers: [
                -2, -1, 14
            ],
            colorHex: "#309000"
        }],
        label: "Default"
    }, {
        value: "second",
        boxGroupId: "second",
        boxes: [{
            boxId: "second01",
            boxGroupId: "second",
            quantiles: {
                min: 1,
                lower: 2.25,
                median: 5.5,
                upper: 6.75,
                max: 10
            },
            outliers: [
                17, 18
            ],
            colorHex: "#3000f0",
            fillPattern: FillPattern.Checkerboard
        }, {
            boxId: "second02",
            boxGroupId: "second",
            quantiles: {
                min: 2,
                lower: 3.25,
                median: 5,
                upper: 6,
                max: 9
            },
            outliers: [
                -2, -1, 14
            ],
            colorHex: "#309000",
            fillPattern: FillPattern.DiagonalCheckerboard
        }],
        label: "Checkerboard"
    }, {
        value: "third",
        boxGroupId: "third",
        boxes: [{
            boxId: "third01",
            boxGroupId: "third",
            quantiles: {
                min: 1,
                lower: 2.25,
                median: 5.5,
                upper: 6.75,
                max: 10
            },
            outliers: [
                17, 18
            ],
            colorHex: "#3000f0",
            fillPattern: FillPattern.Grid
        }, {
            boxId: "third02",
            boxGroupId: "third",
            quantiles: {
                min: 2,
                lower: 3.25,
                median: 5,
                upper: 6,
                max: 9
            },
            outliers: [
                -2, -1, 14
            ],
            colorHex: "#309000",
            fillPattern: FillPattern.DiagonalGrid
        }],
        label: "Grid"
    }, {
        value: "fourth",
        boxGroupId: "fourth",
        boxes: [{
            boxId: "fourth01",
            boxGroupId: "fourth",
            quantiles: {
                min: 1,
                lower: 2.25,
                median: 5.5,
                upper: 6.75,
                max: 10
            },
            outliers: [
                17, 18
            ],
            colorHex: "#3000f0",
            fillPattern: FillPattern.HorizontalLines
        }, {
            boxId: "fourth02",
            boxGroupId: "fourth",
            quantiles: {
                min: 2,
                lower: 3.25,
                median: 5,
                upper: 6,
                max: 9
            },
            outliers: [
                -2, -1, 14
            ],
            colorHex: "#309000",
            fillPattern: FillPattern.VerticalLines
        }],
        label: "Straight lines"
    }, {
        value: "fifth",
        boxGroupId: "fifth",
        boxes: [{
            boxId: "fifth01",
            boxGroupId: "fifth",
            quantiles: {
                min: 1,
                lower: 2.25,
                median: 5.5,
                upper: 6.75,
                max: 10
            },
            outliers: [
                17, 18
            ],
            colorHex: "#3000f0",
            fillPattern: FillPattern.LinesFromLeftTopToRightBottom
        }, {
            boxId: "fifth02",
            boxGroupId: "fifth",
            quantiles: {
                min: 2,
                lower: 3.25,
                median: 5,
                upper: 6,
                max: 9
            },
            outliers: [
                -2, -1, 14
            ],
            colorHex: "#309000",
            fillPattern: FillPattern.LinesFromLeftBottomToRightTop
        }],
        label: "Diagonal lines"
    }];

    readonly heatmapTiles: ReadonlyArray<HeatmapTile>;

    exportConfig: ExportChartConfig = {
        rightLegend: document.createElement("span")
    };

    constructor() {

        const heatmapTiles = new Array<HeatmapTile>();

        for (let i = 0; i < 50; i++) {
            for (let j = 0; j < 150; j++) {
                heatmapTiles.push({
                    x: j,
                    y: i,
                    value: Math.random() * (i + j)
                });
            }
        }

        this.heatmapTiles = heatmapTiles;

    }

    updateFillPattern(fillPattern: FillPattern) {
    }

    selectOutliers($event: BoxPlotSelection) {
        console.log($event);
    }

    selectTiles(heatmapTiles: HeatmapSelection) {
        this.computeBoxes(heatmapTiles.tiles);
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
}
