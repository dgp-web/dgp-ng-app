import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
    BoxPlotSelection,
    BoxValues,
    computeBoxFromValues,
    ExportChartConfig,
    FillPattern,
    HeatmapSelection,
    HeatmapTile,
    Shape
} from "dgp-ng-charts";
import { testBoxGroups } from "../constants/test-box-groups.constant";
import { testBarGroups } from "../constants/test-bar-groups.constant";
import { testConnectedScatterGroups } from "../constants/test-connected-scatter-groups.constant";
import { BoxPlotControlLine } from "../../../../../../dgp-ng-charts/src/lib/box-plot/models";
import { ConnectedScatterPlotControlLine } from "../../../../../../dgp-ng-charts/src/lib/connected-scatter-plot/models";

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

                <dgp-connected-scatter-plot [model]="connectedScatterGroups"></dgp-connected-scatter-plot>

                <dgp-connected-scatter-plot [model]="connectedScatterGroups"
                                            [controlLines]="connectedScatterPlotControlLines"
                                            xAxisMin="1"
                                            xAxisMax="6"
                                            yAxisMin="2"
                                            yAxisMax="9"></dgp-connected-scatter-plot>

                <dgp-docs-section-title>
                    Box plot
                </dgp-docs-section-title>

                <dgp-box-plot [model]="boxGroups"
                              [controlLines]="boxPlotControlLines">

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

                <dgp-box-plot [model]="boxGroups"
                              yAxisMin="3"
                              yAxisMax="17"></dgp-box-plot>

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

    fillPattern = FillPattern.All;
    shape = Shape.Circle;

    boxGroups = testBoxGroups;
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
    connectedScatterPlotControlLines: ReadonlyArray<ConnectedScatterPlotControlLine> = [{
        connectedScatterPlotControlLineId: "01",
        value: 0.1,
        colorHex: "#338800",
        label: "Test limit"
    }, {
        connectedScatterPlotControlLineId: "02",
        value: 15.1,
        colorHex: "#338800",
        label: "Test limit"
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
