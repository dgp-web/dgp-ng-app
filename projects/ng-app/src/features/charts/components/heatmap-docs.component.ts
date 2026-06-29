import { AfterViewInit, ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpModelEditorComponentBase } from "dgp-ng-app";
import { defaultDgpHeatmapConfig, ExportChartConfig, HeatmapConfig, HeatmapSegment, HeatmapSelection, HeatmapTile } from "dgp-ng-charts";


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
                <dgp-details summary="Settings" [expanded]="false">
                    <!-- TODO HeatmapDemoConfigForm -->
                    <dgp-inspector style="margin-left: 36px; display: flex; flex-direction: column;"
                                   [showFieldIcons]="false"
                                   [responsive]="false">
                        <dgp-inspector-item [label]="'Rows'">
                            <mat-form-field>
                                <input matInput
                                       type="number"
                                       [min]="1"
                                       [max]="1000"
                                       [step]="1"
                                       [ngModel]="model.rows"
                                       (ngModelChange)="updateRows($event)">
                            </mat-form-field>
                        </dgp-inspector-item>

                        <dgp-inspector-item [label]="'Columns'">
                            <mat-form-field>
                                <input matInput
                                       type="number"
                                       [min]="1"
                                       [max]="1000"
                                       [step]="1"
                                       [ngModel]="model.columns"
                                       (ngModelChange)="updateColumns($event)">
                            </mat-form-field>
                        </dgp-inspector-item>

                        <dgp-inspector-item [label]="'Use empty values'">
                            <mat-radio-group [ngModel]="model.useNullValues"
                                             (ngModelChange)="updateUseNullValues($event)">
                                <mat-radio-button style="margin-right: 16px;"
                                                  [value]="true">Yes
                                </mat-radio-button>
                                <mat-radio-button [value]="false">No</mat-radio-button>
                            </mat-radio-group>
                        </dgp-inspector-item>
                    </dgp-inspector>
                </dgp-details>

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
export class HeatmapDocsComponent extends DgpModelEditorComponentBase<HeatmapDemoConfig> implements AfterViewInit {

    model = defaultHeatmapDemoConfig;

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

    heatmapTiles: ReadonlyArray<HeatmapTile>;
    heatmapSegments: ReadonlyArray<HeatmapSegment>;

    selection: HeatmapSelection;

    selectTiles(heatmapTiles: HeatmapSelection) {
        this.selection = {...heatmapTiles};
    }

    constructor() {
        super();

        this.initHeatmap();
    }

    ngAfterViewInit(): void {
        this.model$.subscribe(model => {
            this.createHeatmapTiles(model);
        });
    }

    private createHeatmapTiles(payload: HeatmapDemoConfig) {
        const heatmapTiles = new Array<HeatmapTile>();

        for (let i = 0; i < payload.rows; i++) {
            for (let j = 0; j < payload.columns; j++) {

                let value = Math.random() * (i + j);

                if (payload.useNullValues) {

                    const useNullValue = (i + j) % 2;
                    value = useNullValue ? null : value;
                }

                heatmapTiles.push({
                    x: j,
                    y: i,
                    value
                });
            }
        }

        this.heatmapTiles = heatmapTiles;
    }

    private initHeatmapSegments() {
        this.heatmapSegments = [{
            xStart: 0, yStart: 0, xEnd: 37, yEnd: 21,
            strokeColor: "#ffffff"
        }, {
            xStart: 12, yStart: 5, xEnd: 149, yEnd: 23,
            strokeColor: "#ffffff"
        }];
    }

    private initHeatmap() {
        this.createHeatmapTiles(this.model);
        this.initHeatmapSegments();
    }

    protected updateRows(rows: number) {
        this.updateModel({rows});
    }

    protected updateColumns(columns: number) {
        this.updateModel({columns});
    }

    protected updateUseNullValues(useNullValues: boolean) {
        this.updateModel({useNullValues});
    }

}

export interface HeatmapDemoConfig {
    readonly rows: number;
    readonly columns: number;
    readonly useNullValues?: boolean;
}

export const defaultHeatmapDemoConfig: HeatmapDemoConfig = {
    rows: 50,
    columns: 150,
    useNullValues: true
};
