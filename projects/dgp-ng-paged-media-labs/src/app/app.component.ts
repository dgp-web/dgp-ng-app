import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef } from "@angular/core";
import { BlindTextComponent } from "./blind-text.component";
import { timer } from "rxjs";
import { BlindTableComponent } from "./blind-table.component";
import { computePagedHTML, OffscreenRenderer, pageContentSizeA4, PagedHTMLContent } from "dgp-ng-paged-media";

@Component({
    selector: "dgp-ng-paged-media-labs",
    template: `
        <dgp-paged-media-page-A4 *ngFor="let page of pagedHTML?.pages">
            <dgp-paged-media-header></dgp-paged-media-header>
            <dgp-paged-media-content>
                <dgp-paged-media-content-view [model]="page"></dgp-paged-media-content-view>
            </dgp-paged-media-content>
            <dgp-paged-media-footer></dgp-paged-media-footer>
        </dgp-paged-media-page-A4>
    `,
    styles: [`
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {

    pagedHTML: PagedHTMLContent;

    constructor(
        private readonly offscreenRenderer: OffscreenRenderer,
        private readonly cd: ChangeDetectorRef
    ) {
    }

    ngAfterViewInit(): void {
        timer(0).subscribe(() => {
            const textComponentRef = this.offscreenRenderer.createComponent(BlindTextComponent);
            const textElRef = textComponentRef.injector.get(ElementRef) as ElementRef<HTMLDivElement>;

            const tableComponentRef = this.offscreenRenderer.createComponent(BlindTableComponent);
            const tableElRef = tableComponentRef.injector.get(ElementRef) as ElementRef<HTMLDivElement>;

            this.pagedHTML = computePagedHTML({
                pageContentSize: pageContentSizeA4,
                htmlSections: [{
                    type: "table",
                    nativeElement: tableElRef.nativeElement
                }, {
                    type: "text",
                    nativeElement: textElRef.nativeElement
                }]
            });

            this.cd.markForCheck();
        });
    }

}

