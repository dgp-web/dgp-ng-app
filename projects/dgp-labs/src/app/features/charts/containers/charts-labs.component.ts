import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
    BoxPlotSelection,
    BoxValues,
    computeBoxFromValues,
    FillPattern,
    HeatmapSelection,
    HeatmapTile
} from "dgp-ng-charts";
import { ExportChartConfig } from "../../../../../../dgp-ng-charts/src/lib/heatmap/models";
import { testBoxGroups } from "../constants/test-box-groups.constant";

// TODO: Check exporting charts

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

    boxGroups = testBoxGroups;

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
