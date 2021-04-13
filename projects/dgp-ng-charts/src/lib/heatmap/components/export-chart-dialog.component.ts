import { ChangeDetectionStrategy, Component, ElementRef, Inject, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import html2canvas from "html2canvas";
import { InternalExportChartConfig } from "../models";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Store } from "@ngrx/store";
import { scheduleRequest } from "dgp-ng-app";


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
                         *ngIf="model.serializedRightLegend && includeLegend">
                        <div class="dgp-heatmap-legend"
                             [innerHTML]="model.serializedRightLegend | safe:'html'"></div>
                    </div>
                </div>

                <div *ngIf="model.xAxisTitle"
                     class="x-axis-label">
                    {{ model.xAxisTitle }}
                </div>

                <div *ngIf="model.serializedBottomLegend && includeLegend"
                     class="bottom-legend">
                    <div [innerHTML]="model.serializedBottomLegend | safe:'html'"></div>
                </div>
            </div>

        </mat-dialog-content>

        <mat-dialog-actions style="justify-content: center;">

            <mat-button-toggle-group *ngIf="model.serializedRightLegend || model.serializedBottomLegend"
                                     [(value)]="includeLegend">
                <mat-button-toggle [value]="false"
                                   aria-label="Hide legend"
                                   matTooltip="Hide legend">
                    <mat-icon>show_chart</mat-icon>
                </mat-button-toggle>
                <mat-button-toggle [value]="true"
                                   aria-label="Show legend"
                                   matTooltip="Show legend">
                    <mat-icon>legend_toggle</mat-icon>
                </mat-button-toggle>
            </mat-button-toggle-group>

            <dgp-spacer></dgp-spacer>

            <button mat-icon-button
                    matTooltip="Copy to clipboard"
                    (click)="copyImageToClipboard()">
                <mat-icon>content_copy</mat-icon>
            </button>

            <button mat-icon-button
                    (click)="openImageInNewTab()"
                    matTooltip="Open in new tab">
                <mat-icon>open_in_new</mat-icon>
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

    includeLegend = true;

    @ViewChild("chartRef") chartRef: ElementRef;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        readonly model: InternalExportChartConfig,
        private readonly matSnackBar: MatSnackBar,
        private readonly store: Store<any>
    ) {
    }

    async copyImage$() {

        const imageUrl = await this.getImageDataUrl$();

        const img = document.createElement("img");
        img.src = imageUrl;
        document.body.appendChild(img);
        const r = document.createRange();
        r.setStartBefore(img);
        r.setEndAfter(img);
        r.selectNode(img);
        const sel = window.getSelection();
        sel.addRange(r);
        document.execCommand("copy");
        document.body.removeChild(img);

        this.matSnackBar.open("Copied image to clipboard.", null, {
            duration: 2000
        });
    }

    copyImageToClipboard() {

        const action = scheduleRequest({
            request$: this.copyImage$()
        });

        this.store.dispatch(action);

    }

    async openImageInNewTab() {
        const imageUrl = await this.getImageDataUrl$();
        const iframe = "<iframe width='100%' height='100%' style='margin: -8px;border: none;padding: 8px;' src='" + imageUrl + "'></iframe>";
        const x = window.open();
        x.document.open();
        x.document.write(iframe);
        x.document.close();

    }

    private async getImageDataUrl$() {
        const imageCanvas = await html2canvas(this.chartRef.nativeElement, {
            ignoreElements: element => element.tagName.toLowerCase() === "dgp-heatmap",
            backgroundColor: null // === transparent
        });
        return imageCanvas.toDataURL();
    }

}
