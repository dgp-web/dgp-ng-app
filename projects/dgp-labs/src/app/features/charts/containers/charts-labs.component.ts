import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BoxGroup, BoxPlotSelection, BoxValues, computeBoxFromValues, HeatmapSelection, HeatmapTile } from "dgp-ng-charts";

@Component({
    selector: "dgp-charts-labs",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Charts
        </dgp-page-header>

        <dgp-box-plot [model]="boxGroups"
                      chartTitle="Chart title"
                      yAxisTitle="y axis"
                      xAxisTitle="x axis"
                      (selectionChange)="selectOutliers($event)"></dgp-box-plot>

        <dgp-heatmap [model]="heatmapTiles"
                     chartTitle="Chart title"
                     yAxisTitle="y axis"
                     xAxisTitle="x axis"
                     selectionMode="Brush"
                     (selectionChange)="selectTiles($event)"></dgp-heatmap>
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
            height: 480px;
            width: 640px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsLabsComponent {

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
        label: "First group"
    }];

    readonly heatmapTiles: ReadonlyArray<HeatmapTile>;

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

    selectOutliers($event: BoxPlotSelection) {
        console.log($event);
    }

    selectTiles(heatmapTiles: HeatmapSelection) {
        this.computeBoxes(heatmapTiles.tiles);
    }

    private computeBoxes(heatmapTiles: ReadonlyArray<HeatmapTile>) {

        /*value: "first",
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
        }
        */

        const values: BoxValues = {
            boxValuesId: "test",
            originalValues: heatmapTiles.map(x => x.value)
        };

        const box = computeBoxFromValues({
            values,
            boxId: "first01",
            boxGroupId: "first",
            colorHex: "#3000f0"
        });

        console.log(box);

        this.boxGroups = [{
            value: "first",
            boxGroupId: "first",
            label: "First group",
            boxes: [box]
        }];

    }
}
