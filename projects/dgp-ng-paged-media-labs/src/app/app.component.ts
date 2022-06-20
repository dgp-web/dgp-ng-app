import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef } from "@angular/core";
import { BoxGroup, ConnectedScatterGroup } from "dgp-ng-charts";
import { Many } from "data-modeling";
import { createGuid } from "dgp-ng-app";
import { BlindTextComponent } from "./blind-text.component";
import { timer } from "rxjs";
import { OffscreenRenderer } from "../../../dgp-ng-paged-media/src/lib/engine/services/offscreen-renderer.service";
import { PageSize } from "../../../dgp-ng-paged-media/src/lib/engine/models/page-size.model";
import { PagedHTML } from "../../../dgp-ng-paged-media/src/lib/engine/models/paged-html.model";
import { HTMLPage } from "../../../dgp-ng-paged-media/src/lib/engine/models";
import { pageSizeA4 } from "../../../dgp-ng-paged-media/src/lib/engine/constants";

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

        <dgp-paged-media-page-A4 *ngFor="let page of pagedHTML?.pages"
                                 style="font-size: 16px;">
            <dgp-paged-media-header></dgp-paged-media-header>
            <dgp-paged-media-content>

                <ng-container *ngFor="let item of page.itemsOnPage">
                    <ng-container [ngSwitch]="item.type">
                        <p *ngSwitchCase="'p'"
                           [innerHTML]="item.nativeElement.innerHTML"></p>
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
            // TODO: schedule for drawing
            const componentRef = this.offscreenRenderer.createComponent(BlindTextComponent);
            const elRef = componentRef.injector.get(ElementRef) as ElementRef<HTMLDivElement>;

            this.pagedHTML = computePagedHTML({
                pageSize: pageSizeA4,
                htmlSections: [{
                    type: "text",
                    nativeElement: elRef.nativeElement
                }]
            });

        });
    }

}

// scheduleTextSectionRendering

export const getPagedContentElements = () => {
    return {
        pages: []
    } as PagedHTML;
};

export interface HTMLSection {
    readonly type: "text" | "table" | "heading";
    readonly nativeElement: HTMLElement;
}

// TODO: text section, table section
export function computePagedHTML(payload: {
    readonly pageSize: PageSize;
    readonly htmlSections: Many<HTMLSection>;
}): PagedHTML {

    const pages = new Array<HTMLPage>();
    let currentPage: HTMLPage = {
        itemsOnPage: []
    };

    let currentPageRemainingHeight = payload.pageSize.height;

    payload.htmlSections.forEach(htmlSection => {
        /**
         * Strategy for splitting up a text section
         */
        const htmlItems = extractHTMLItemsFromSection(htmlSection);

        htmlItems.forEach(htmlItem => {

            /**
             * We set the width so we get the correct height
             */
            htmlItem.style.width = payload.pageSize.width + payload.pageSize.widthUnit;

            const height = htmlItem.getBoundingClientRect().height;

            if (height > payload.pageSize.height) throw Error("Item height exceeds page height. This is not allowed.");

            if (height <= currentPageRemainingHeight) {
                currentPage.itemsOnPage.push({
                    type: "p",
                    nativeElement: htmlItem
                });
                currentPageRemainingHeight -= height;
            } else {
                /**
                 * Finalize HTML page
                 */
                pages.push(currentPage);
                currentPage = {itemsOnPage: []};
                currentPageRemainingHeight = payload.pageSize.height;

                currentPage.itemsOnPage.push({
                    type: "p",
                    nativeElement: htmlItem
                });
                currentPageRemainingHeight -= height;
            }

        });

    });

    return {pages};
}

export function extractHTMLItemsFromTextSection(payload: HTMLElement) {
    return payload.querySelectorAll("p");
}


export function extractHTMLItemsFromSection(payload: HTMLSection) {
    switch (payload.type) {
        case "text":
            return extractHTMLItemsFromTextSection(payload.nativeElement);
        case "table":
            break;
        case "heading":
            break;

    }
}
