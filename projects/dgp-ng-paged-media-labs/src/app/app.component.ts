import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef } from "@angular/core";
import { BoxGroup, ConnectedScatterGroup } from "dgp-ng-charts";
import { Many } from "data-modeling";
import { createGuid } from "dgp-ng-app";
import { BlindTextComponent } from "./blind-text.component";
import { timer } from "rxjs";
import { chunk } from "lodash";
import { OffscreenRenderer } from "../../../dgp-ng-paged-media/src/lib/engine/services/offscreen-renderer.service";
import { PageSize } from "../../../dgp-ng-paged-media/src/lib/engine/models/page-size.model";
import { PagedHTML } from "../../../dgp-ng-paged-media/src/lib/engine/models/paged-html.model";

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

        <dgp-paged-media-page-A4 *ngFor="let items of chunks"
                                 style="font-size: 16px;">
            <dgp-paged-media-header></dgp-paged-media-header>
            <dgp-paged-media-content>
                <p *ngFor="let item of items"
                   [innerHTML]="item.innerHTML"></p>

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

            const renderer = this.offscreenRenderer.getRenderer();
            renderer.setStyle(elRef.nativeElement, "width", "677.34px");

            const refWidth = 677.34;
            const refHeight = 930.56;

            const actualHeight = elRef.nativeElement.getBoundingClientRect().height;
            console.debug("Available height in page: " + refHeight + "px");
            console.debug("Actual height of element: " + actualHeight + "px");
            const neededPages = Math.ceil(actualHeight / refHeight);
            console.debug("Needed pages: " + neededPages);

            const childHtmlElement = elRef.nativeElement.children;
            console.debug(elRef.nativeElement.children);

            /**
             * Apply strategy for equal-size / fixed-size / similar-size items
             */

            this.chunks = chunk(childHtmlElement, neededPages);

            // TODO: get chunked items

        });
    }

}

// scheduleTextSectionRendering

export const getPagedContentElements = () => {
    return {
        pages: []
    } as PagedHTML;
};

// TODO: text section, table section
export function computePagedHTML(payload: {
    readonly pageSize: PageSize;
    readonly htmlItems: HTMLParagraphElement | HTMLTableElement | HTMLHeadingElement;
}): PagedHTML {
    return {
        pages: []
    };
}
