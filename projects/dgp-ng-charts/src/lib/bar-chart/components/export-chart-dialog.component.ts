import { ChangeDetectionStrategy, Component, ElementRef, Inject, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import html2canvas from "html2canvas";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";
import { firstAsPromise } from "dgp-ng-app";
import { InternalExportChartConfig } from "../../heatmap/models";

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
                    <img [src]="model.serializedChartImageUrl | safe:'url'"
                         (load)="markImageAsLoaded()"
                         alt="Plot"/>
                    <img *ngIf="model.serializedCanvasDataUrl"
                         [src]="model.serializedCanvasDataUrl | safe:'url'"
                         class="canvas-img"
                         alt="Canvas plot"/>
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
export class DgpExportChartDialogComponent {

    readonly isImageLoaded$ = new BehaviorSubject<boolean>(false);

    includeLegend = true;

    @ViewChild("chartRef") chartRef: ElementRef;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        readonly model: InternalExportChartConfig,
        private readonly matSnackBar: MatSnackBar
    ) {
    }

    markImageAsLoaded() {
        this.isImageLoaded$.next(true);
    }

    async copyImage$() {

        const imageUrl = await this.getImageDataUrl$();

        return new Promise<void>((resolve, reject) => {

            const img = document.createElement("img");

            document.body.appendChild(img);

            img.onload = () => {
                try {

                    const r = document.createRange();
                    r.setStartBefore(img);
                    r.setEndAfter(img);
                    r.selectNode(img);
                    const sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(r);

                    /**
                     * TODO
                     * There is an issue with the clipboard being empty when large DOM trees are exported
                     * This can be tested with 20_00087.
                     *
                     * It may be that the copy command cannot be awaited or that the
                     * image is not fully rendered after having been added to the body.
                     *
                     * It is also possible that copying doesn't work when the DOM is too cluttered.
                     * Copying is working when there is only 1 large chart but with a whole chart-table
                     * it's not.
                     */
                    try {
                        const successful = document.execCommand("copy");

                        if (successful) {
                            this.matSnackBar.open("Copied image to clipboard.", null, {
                                duration: 2000
                            });
                        } else {
                            this.matSnackBar.open("Copying failed. Try using 'Open in new tab' for large charts.", null, {
                                duration: 2000
                            });
                        }

                    } catch (err) {
                        console.error("Copying chart to clipboard failed: ", err);
                    } finally {
                        document.body.removeChild(img);
                        resolve();
                    }

                } catch (e) {
                    console.error(e);
                    reject(e);
                }
            };
            img.src = imageUrl;
        });

    }

    async copyImageToClipboard() {
        return this.copyImage$();
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
        await firstAsPromise(this.isImageLoaded$.pipe(filter(x => x === true)));
        // await firstAsPromise(timer(5000));

        const imageCanvas = await html2canvas(this.chartRef.nativeElement, {
            backgroundColor: null // === transparent
        });
        return imageCanvas.toDataURL();
    }

}
