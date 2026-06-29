import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { DgpModelEditorComponentBase } from "dgp-ng-app";
import { HeatmapSegment, HeatmapSelection } from "dgp-ng-charts";
import { debounceTime } from "rxjs/operators";
import { validateAttribute } from "data-modeling";
import { HeatmapDemoConfig } from "../models/heatmap/heatmap-demo-config.model";
import { defaultHeatmapDemoConfig } from "../constants/heatmap/default-heatmap-demo-config.constant";
import { heatmapDemoConfigMetadata } from "../constants/heatmap/heatmap-demo-config-metadata.constant";
import { Heatmap } from "../../../../../dgp-ng-charts/src/lib/heatmap/models/heatmap.model";
import { createDemoHeatmap } from "../functions/create-demo-heatmap.function";

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
                <dgp-docs-section-title>Demo</dgp-docs-section-title>

                <!-- Add number inputs for min and max rows and columns: 100 to 1000 -->

                <!-- TODO: Coloring as in labs -->
                <dgp-details summary="Settings" [expanded]="false">
                    <!-- TODO HeatmapDemoConfigForm -->
                    <dgp-inspector style="margin-left: 36px; display: flex; flex-direction: column;"
                                   [showFieldIcons]="false"
                                   [responsive]="false">
                        <dgp-inspector-item [metadata]="modelMetadata.attributes.rows">

                            <mat-form-field [subscriptSizing]="'dynamic'">
                                <input matInput
                                       type="number"
                                       appIntegerOnly
                                       [min]="1"
                                       [max]="1000"
                                       [step]="1"
                                       [ngModel]="model.rows"
                                       [ngModelOptions]="{updateOn: 'blur'}"
                                       (ngModelChange)="updateRows($event)">
                                <mat-hint>Integer between 1 and 1000</mat-hint>
                            </mat-form-field>

                        </dgp-inspector-item>

                        <dgp-inspector-item [metadata]="modelMetadata.attributes.columns">
                            <mat-form-field>
                                <input matInput
                                       type="number"
                                       appIntegerOnly
                                       [min]="1"
                                       [max]="1000"
                                       [step]="1"
                                       [ngModel]="model.columns"
                                       [ngModelOptions]="{updateOn: 'blur'}"
                                       (ngModelChange)="updateColumns($event)">
                                <mat-hint>Integer between 1 and 1000</mat-hint>
                            </mat-form-field>
                        </dgp-inspector-item>

                        <dgp-inspector-item [metadata]="modelMetadata.attributes.useNullValues">
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

                <dgp-heatmap *ngIf="heatmap"
                             style="max-height: 320px;"
                             [model]="heatmap.model"
                             [config]="heatmap.config"
                             chartTitle="Chart title"
                             yAxisTitle="y axis"
                             xAxisTitle="x axis"
                             selectionMode="Brush"
                             [exportConfig]="heatmap.exportConfig"
                             [segments]="heatmap.segments"
                             [selection]="heatmap.selection"
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

    readonly modelMetadata = heatmapDemoConfigMetadata;
    model = defaultHeatmapDemoConfig;

    heatmap: Heatmap;

    heatmapSegments: ReadonlyArray<HeatmapSegment> = [];

    selection: HeatmapSelection;


    selectTiles(heatmapTiles: HeatmapSelection) {
        this.selection = {...heatmapTiles};
    }

    constructor(
        private readonly cd: ChangeDetectorRef,
    ) {
        super();
    }

    ngAfterViewInit(): void {
        this.model$
            .pipe(debounceTime(250))
            .subscribe(model => {
                this.createDemoHeatmap(model);
            });
    }

    private initHeatmapSegments() {
        this.heatmapSegments = [{
            xStart: 0, yStart: 0, xEnd: 37, yEnd: 21,
            strokeColor: "#ffffff"
        }, {
            xStart: 12, yStart: 5, xEnd: 149, yEnd: 23,
            strokeColor: "#ffffff"
        }];
        this.cd.markForCheck();
    }

    protected updateRows(rows: number) {
        const validationResult = validateAttribute({
            value: rows,
            modelId: "",
            attributePath: "rows",
            modelType: "HeatmapDemoConfig",
            attributeMetadata: heatmapDemoConfigMetadata.attributes.rows
        });
        if (validationResult.isValid) {
            this.updateModel({rows});
        }
    }

    protected updateColumns(columns: number) {
        const validationResult = validateAttribute({
            value: columns,
            modelId: "",
            attributePath: "columns",
            modelType: "HeatmapDemoConfig",
            attributeMetadata: heatmapDemoConfigMetadata.attributes.columns
        });
        if (validationResult.isValid) {
            this.updateModel({columns});
        }
    }

    protected updateUseNullValues(useNullValues: boolean) {
        this.updateModel({useNullValues});
    }

    private createDemoHeatmap(payload: HeatmapDemoConfig) {
        this.heatmap = createDemoHeatmap(payload);
        this.cd.markForCheck();
    }
}

