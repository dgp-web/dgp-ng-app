import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, HostListener } from "@angular/core";
import { DgpModelEditorComponentBase } from "dgp-ng-app";
import { defaultDgpHeatmapConfig, ExportChartConfig, HeatmapConfig, HeatmapSegment, HeatmapSelection, HeatmapTile } from "dgp-ng-charts";
import { debounceTime } from "rxjs/operators";
import { validateAttribute } from "data-modeling";
import { HeatmapDemoConfig } from "../models/heatmap/heatmap-demo-config.model";
import { defaultHeatmapDemoConfig } from "../constants/heatmap/default-heatmap-demo-config.constant";
import { heatmapDemoConfigMetadata } from "../constants/heatmap/heatmap-demo-config-metadata.constant";

@Directive({
    selector: '[appIntegerOnly]',
    standalone: true
})
export class IntegerOnlyDirective {

    // 1. Blocks keyboard decimals
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if (['.', ',', 'e', 'E'].includes(event.key)) {
            event.preventDefault();
        }
    }

    // 2. Blocks clipboard decimals
    @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent) {
        const clipboardData = event.clipboardData;
        const pastedText = clipboardData?.getData('text') || '';

        // If the pasted text contains a decimal, comma, or scientific 'e', block it
        // Use /^-?\d+$/ if you want to allow negative integers
        const integerRegex = /^\d+$/;

        if (!integerRegex.test(pastedText)) {
            event.preventDefault();
        }
    }
}

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

                <dgp-heatmap style="max-height: 320px;"
                             [model]="heatmapTiles"
                             [config]="heatmapConfig"
                             chartTitle="Chart title"
                             yAxisTitle="y axis"
                             xAxisTitle="x axis"
                             selectionMode="Brush"
                             [exportConfig]="exportConfig"
                             [segments]="heatmapSegments"
                             [selection]="selection"
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
    heatmapSegments: ReadonlyArray<HeatmapSegment> = [];

    selection: HeatmapSelection;


    selectTiles(heatmapTiles: HeatmapSelection) {
        this.selection = {...heatmapTiles};
    }

    constructor(
        private readonly cd: ChangeDetectorRef,
    ) {
        super();

        this.initHeatmap();
    }

    ngAfterViewInit(): void {
        this.model$
            .pipe(debounceTime(250))
            .subscribe(model => {
            this.createHeatmapTiles(model);
            this.cd.markForCheck();
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
        this.cd.markForCheck();
    }

    private initHeatmap() {
        this.createHeatmapTiles(this.model);
      // this.initHeatmapSegments();
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

}

