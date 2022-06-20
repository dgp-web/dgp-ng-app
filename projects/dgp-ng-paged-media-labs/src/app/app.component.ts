import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef } from "@angular/core";
import { BoxGroup, ConnectedScatterGroup } from "dgp-ng-charts";
import { Many } from "data-modeling";
import { createGuid } from "dgp-ng-app";
import { BlindTextComponent } from "./blind-text.component";
import { timer } from "rxjs";
import { BlindTableComponent } from "./blind-table.component";
import { computePagedHTML, OffscreenRenderer, PagedHTML, pageSizeA4 } from "dgp-ng-paged-media";

@Component({
    selector: "dgp-ng-paged-media-labs",
    template: `
        <dgp-paged-media-page-A4>
            <dgp-paged-media-header>
                First section header
            </dgp-paged-media-header>

            <dgp-paged-media-content>
                First section content
            </dgp-paged-media-content>

            <dgp-paged-media-footer>
                First section footer
            </dgp-paged-media-footer>
        </dgp-paged-media-page-A4>

        <dgp-paged-media-page-A4>
            <dgp-paged-media-header>
                Second section header
            </dgp-paged-media-header>

            <dgp-paged-media-content>
                <div style="display: flex; flex-wrap: wrap;">
                    <dgp-box-plot [model]="boxGroups"></dgp-box-plot>
                    <dgp-connected-scatter-plot [model]="connectedScatterGroups"></dgp-connected-scatter-plot>
                </div>
            </dgp-paged-media-content>

            <dgp-paged-media-footer>
                Second section footer
            </dgp-paged-media-footer>
        </dgp-paged-media-page-A4>

        <dgp-paged-media-page-A4 *ngFor="let page of pagedHTML?.pages">
            <dgp-paged-media-header></dgp-paged-media-header>
            <dgp-paged-media-content>

                <ng-container *ngFor="let item of page.itemsOnPage">
                    <ng-container [ngSwitch]="item.tagName">
                        <p *ngSwitchCase="'P'"
                           [innerHTML]="item.innerHTML | safe:'html'"></p>

                        <table *ngSwitchCase="'TABLE'"
                               [innerHTML]="item.innerHTML | safe:'html'"></table>

                        <h1 *ngSwitchCase="'H1'"
                            [innerHTML]="item.innerHTML | safe:'html'"></h1>
                        <h2 *ngSwitchCase="'H2'"
                            [innerHTML]="item.innerHTML | safe:'html'"></h2>
                        <h3 *ngSwitchCase="'H3'"
                            [innerHTML]="item.innerHTML | safe:'html'"></h3>
                        <h4 *ngSwitchCase="'H4'"
                            [innerHTML]="item.innerHTML | safe:'html'"></h4>
                        <h5 *ngSwitchCase="'H5'"
                            [innerHTML]="item.innerHTML | safe:'html'"></h5>
                        <h6 *ngSwitchCase="'H6'"
                            [innerHTML]="item.innerHTML | safe:'html'"></h6>
                    </ng-container>
                </ng-container>


            </dgp-paged-media-content>
            <dgp-paged-media-footer></dgp-paged-media-footer>
        </dgp-paged-media-page-A4>

    `,
    styles: [`
        dgp-box-plot, dgp-connected-scatter-plot {
            width: 320px;
            height: 240px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {

    chunks: any[];
    pagedHTML: PagedHTML;

    readonly boxGroups: Many<BoxGroup> = [{
        boxGroupId: "Box data",
        label: "First group",
        boxes: [{
            boxId: createGuid(),
            colorHex: "#d8d8ef",
            quantiles: {
                max: 8,
                min: 0.23,
                lower: 3,
                upper: 7.4,
                median: 5.2
            },
            outliers: []
        }]
    }];
    readonly connectedScatterGroups: Many<ConnectedScatterGroup> = [{
        connectedScatterGroupId: "Scatter data",
        colorHex: "#d8d8ef",
        series: [{
            connectedScatterSeriesId: createGuid(),
            dots: [{
                x: 1,
                y: 2
            }, {
                x: 10,
                y: 7
            }]
        }]
    }];

    constructor(
        private readonly offscreenRenderer: OffscreenRenderer
    ) {
    }

    ngAfterViewInit(): void {
        timer(0).subscribe(() => {
            const textComponentRef = this.offscreenRenderer.createComponent(BlindTextComponent);
            const textElRef = textComponentRef.injector.get(ElementRef) as ElementRef<HTMLDivElement>;

            const tableComponentRef = this.offscreenRenderer.createComponent(BlindTableComponent);
            const tableElRef = tableComponentRef.injector.get(ElementRef) as ElementRef<HTMLDivElement>;

            const h1Element = document.createElement("h1");
            h1Element.textContent = "This is a heading";
            const div = document.createElement("div");
            div.appendChild(h1Element);
            document.body.appendChild(div);

            this.pagedHTML = computePagedHTML({
                pageSize: pageSizeA4,
                htmlSections: [{
                    type: "text",
                    nativeElement: textElRef.nativeElement
                }, {
                    type: "table",
                    nativeElement: tableElRef.nativeElement
                }, {
                    type: "heading",
                    nativeElement: div
                }]
            });

        });
    }

}

