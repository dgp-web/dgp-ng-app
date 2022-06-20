import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef } from "@angular/core";
import { BoxGroup, ConnectedScatterGroup } from "dgp-ng-charts";
import { Many } from "data-modeling";
import { createGuid } from "dgp-ng-app";
import { BlindTextComponent } from "./blind-text.component";
import { timer } from "rxjs";
import { OffscreenRenderer } from "../../../dgp-ng-paged-media/src/lib/engine/services/offscreen-renderer.service";
import { PageSize } from "../../../dgp-ng-paged-media/src/lib/engine/models/page-size.model";
import { PagedHTML } from "../../../dgp-ng-paged-media/src/lib/engine/models/paged-html.model";
import { HTMLElementContainer, HTMlElementType, HTMLPage } from "../../../dgp-ng-paged-media/src/lib/engine/models";
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

        <dgp-paged-media-page-A4 *ngFor="let page of pagedHTML?.pages">
            <dgp-paged-media-header></dgp-paged-media-header>
            <dgp-paged-media-content>

                <ng-container *ngFor="let item of page.itemsOnPage">
                    <ng-container [ngSwitch]="item.type">
                        <p *ngSwitchCase="htmlElementTypeEnum.Paragraph"
                           [innerHTML]="item.nativeElement.innerHTML"></p>

                        <table *ngSwitchCase="htmlElementTypeEnum.Table"></table>
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
    readonly htmlElementTypeEnum = HTMlElementType;

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

export function createHTMLParagraphElement(htmlItem: HTMLElement): HTMLElementContainer {
    return {
        type: HTMlElementType.Paragraph,
        nativeElement: htmlItem
    };
}

export function createHTMLTablelement(htmlItem: HTMLElement): HTMLElementContainer {
    return {
        type: HTMlElementType.Table,
        nativeElement: htmlItem
    };
}

export interface PagedHTMLComputationEngineState {
    pages: HTMLPage[];
    currentPage: HTMLPage;
    currentPageRemainingHeight: number;
}

export interface PagedHTMLComputationEngine extends PagedHTMLComputationEngineState {
    reset(): void;
}

export function createPagedHTMLComputationEngineState(payload: {
    readonly pageSize: PageSize;
}): PagedHTMLComputationEngineState {
    const pages = new Array<HTMLPage>();
    const currentPage: HTMLPage = {itemsOnPage: []};
    const currentPageRemainingHeight = payload.pageSize.height;

    return {pages, currentPage, currentPageRemainingHeight};
}

export function createPagedHTMLComputationEngine(payload: {
    readonly pageSize: PageSize;
}): PagedHTMLComputationEngine {
    const state = createPagedHTMLComputationEngineState(payload);

    const engine: Partial<PagedHTMLComputationEngine> = state;

    engine.reset = () => {
        state.currentPage = {itemsOnPage: []};
        state.currentPageRemainingHeight = payload.pageSize.height;
    };

    return engine as PagedHTMLComputationEngine;

}

// TODO: text section, table section
export function computePagedHTML(payload: {
    readonly pageSize: PageSize;
    readonly htmlSections: Many<HTMLSection>;
}): PagedHTML {

    const engine = createPagedHTMLComputationEngine(payload);

    payload.htmlSections.forEach(htmlSection => {

        if (htmlSection.type === "text") {
            const htmlItems = extractHTMLItemsFromSection(htmlSection);
            htmlItems.forEach(htmlItem => {
                /**
                 * We set the width so we get the correct height
                 */
                htmlItem.style.width = payload.pageSize.width + payload.pageSize.widthUnit;

                const height = htmlItem.getBoundingClientRect().height;
                if (height > payload.pageSize.height) throw Error("Item height exceeds page height. This is not allowed.");

                const container = createHTMLParagraphElement(htmlItem);

                if (height <= engine.currentPageRemainingHeight) {
                    engine.currentPage.itemsOnPage.push(container);
                    engine.currentPageRemainingHeight -= height;
                } else {
                    /**
                     * Finalize HTML page
                     */
                    engine.pages.push(engine.currentPage);
                    engine.reset();

                    engine.currentPage.itemsOnPage.push(container);
                    engine.currentPageRemainingHeight -= height;
                }
            });

        } else if (htmlSection.type === "table") {
            // TODO: Iterate over rows and create a wrapper row in a table
            const htmlItems = extractHTMLItemsFromSection(htmlSection);

            let table = document.createElement("table");
            table.style.width = payload.pageSize.width + payload.pageSize.widthUnit;

            htmlItems.forEach(htmlItem => {
                // TODO: header row
                table.appendChild(htmlItem);

                const height = htmlItem.getBoundingClientRect().height;
                if (height > payload.pageSize.height) throw Error("Item height exceeds page height. This is not allowed.");

                if (height <= engine.currentPageRemainingHeight) {

                } else {
                    // TODO: get last item
                }

            });

            // TODO: at last table

        } else if (htmlSection.type === "heading") {

        }

    });

    return {pages: engine.pages};
}

export function extractHTMLItemsFromTextSection(payload: HTMLElement) {
    return payload.querySelectorAll("p");
}

export function extractHTMLItemsFromTableSection(payload: HTMLElement): any {
    throw new Error("Not implemented");
}

export function extractHTMLItemsFromHeadingSection(payload: HTMLElement): any {
    throw new Error("Not implemented");
}

export function extractHTMLItemsFromSection(payload: HTMLSection): NodeListOf<HTMLElement> {
    switch (payload.type) {
        case "text":
            return extractHTMLItemsFromTextSection(payload.nativeElement);
        case "table":
            return extractHTMLItemsFromTableSection(payload.nativeElement) as any;
        case "heading":
            return extractHTMLItemsFromHeadingSection(payload.nativeElement) as any;
    }
}
