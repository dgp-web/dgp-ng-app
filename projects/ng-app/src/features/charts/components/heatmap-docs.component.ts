import { Component, ChangeDetectionStrategy } from "@angular/core";
import { HeatmapSelection, HeatmapSegment, HeatmapTile } from "dgp-ng-charts";
import { ExportChartConfig, HeatmapConfig } from "../../../../../dgp-ng-charts/src/lib/heatmap/models";
import { defaultDgpHeatmapConfig } from "../../../../../dgp-ng-charts/src/lib/heatmap/constants";

@Component({
    selector: "dgp-heatmap-docs",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Heatmap
        </dgp-page-header>

        <dgp-docs-page>
            <dgp-docs-page-content>
                <dgp-docs-chapter-title>Heatmap</dgp-docs-chapter-title>

                <!-- Add number inputs for min and max rows and columns: 100 to 1000 -->

                <!-- TODO: Coloring as in labs -->

                <dgp-heatmap [model]="heatmapTiles"
                             [config]="heatmapConfig"
                             chartTitle="Chart title"
                             yAxisTitle="y axis"
                             xAxisTitle="x axis"
                             selectionMode="Brush"
                             [exportConfig]="exportConfig"
                             [segments]="heatmapSegments"
                             [segments]="selection"
                             (selectionChange)="selectTiles($event)">

                    <ng-container right-legend>Right</ng-container>

                    <ng-container bottom-legend>Bottom</ng-container>

                </dgp-heatmap>

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`

   `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeatmapDocsComponent {

    readonly heatmapConfig: HeatmapConfig = {
        ...defaultDgpHeatmapConfig,
        maxTileExtent: {
            height: 100,
            width: 100
        }
    };
    exportConfig: ExportChartConfig = {
        rightLegend: document.createElement("span")
    };

    readonly heatmapTiles: ReadonlyArray<HeatmapTile>;
    readonly heatmapSegments: ReadonlyArray<HeatmapSegment>;

    selection: HeatmapSelection;

    selectTiles(heatmapTiles: HeatmapSelection) {
        this.selection = {...heatmapTiles};
        console.log(this.selection);
        // this.computeBoxes(heatmapTiles.tiles);
    }
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
}
