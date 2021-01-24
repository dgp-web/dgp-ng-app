import { ChangeDetectionStrategy, Component, ElementRef, Inject, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import html2canvas from "html2canvas";
import { InternalExportChartConfig } from "../models";

@Component({
    selector: "dgp-export-chart-dialog",
    template: `
        <mat-dialog-content>

            <div class="chart"
                 #chartRef>
                <div *ngIf="model.chartTitle"
                     class="title">
                    {{ model.chartTitle }}
                </div>

                <div class="inner-container">
                    <div *ngIf="model.yAxisTitle"
                         class="y-axis-label-container">
                        <div class="y-axis-label">
                            {{model.yAxisTitle }}
                        </div>
                    </div>
                    <img [src]="model.serializedChartImageUrl | safe:'url'"/>
                    <img *ngIf="model.serializedCanvasDataUrl"
                         [src]="model.serializedCanvasDataUrl | safe:'url'"
                         class="canvas-img"/>
                    <img *ngIf="model.serializedCanvasDataUrl"
                         [src]="model.serializedChartImageUrl | safe:'url'"
                         class="svg-img"/>
                    <div class="right-legend"
                         *ngIf="model.serializedLegend">
                        <div class="dgp-heatmap-legend"
                             [innerHTML]="model.serializedLegend | safe:'html'"></div>
                    </div>
                </div>

                <div *ngIf="model.xAxisTitle"
                     class="x-axis-label">
                    {{ model.xAxisTitle }}
                </div>
            </div>

        </mat-dialog-content>

        <mat-dialog-actions>
            <button mat-button
                    (click)="downloadImage()">
                Download
            </button>
        </mat-dialog-actions>
    `,
    styles: [`
        :host {

        }

        mat-dialog-content {
            display: flex;
            flex-grow: 1;
            font-size: smaller;
            position: relative;
        }

        .chart {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex-grow: 1;
            color: black !important;
        }

        .title {
            justify-content: center;
            align-items: center;
            display: flex;
            margin: 16px;
            word-break: break-all;
        }

        .inner-container {
            display: flex;
            flex-grow: 1;
            position: relative;
        }

        .canvas-img, .svg-img {
            position: absolute;
        }

        .y-axis-label-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 40px;
            max-width: 40px;
        }

        .y-axis-label {
            transform: rotate(-90deg);
            white-space: nowrap;
        }

        .x-axis-label {
            min-height: 56px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportChartDialogComponent {

    @ViewChild("chartRef") chartRef: ElementRef;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        readonly model: InternalExportChartConfig
    ) {
    }

    async downloadImage() {
        const canvas = await html2canvas(this.chartRef.nativeElement, {
            ignoreElements: element => element.tagName.toLowerCase() === "dgp-heatmap",
            backgroundColor: null // === transparent
        });
        const file = canvas.toDataURL();
        const iframe = "<iframe width='100%' height='100%' style='margin: -8px;border: none;padding: 8px;' src='" + file + "'></iframe>";
        const x = window.open();
        x.document.open();
        x.document.write(iframe);
        x.document.close();

    }

}
