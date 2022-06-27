import { AfterViewInit, Directive, ElementRef, Inject, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { AxisScales } from "../../shared/models";
import { ID_PREFIX } from "../../shared/id-prefix-injection-token.constant";
import { isNullOrUndefined, notNullOrUndefined } from "dgp-ng-app";

@Directive({selector: "[dgpChartDataAreaClipPath]"})
export class DgpChartDataAreaClipPathDirective implements AfterViewInit, OnChanges {

    @Input()
    scales: AxisScales;

    private rect: SVGRectElement;

    constructor(private readonly elementRef: ElementRef<SVGClipPathElement>,
                private readonly renderer: Renderer2,
                @Inject(ID_PREFIX)
                protected readonly idPrefix: string) {
    }

    ngAfterViewInit(): void {
        this.renderer.setAttribute(this.elementRef.nativeElement, "id", this.idPrefix + ".dataAreaClipPath");
        this.renderer.setAttribute(this.elementRef.nativeElement, "fill", "transparent");
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect") as SVGRectElement;

        this.renderer.setAttribute(rect, "x", "-1");
        this.renderer.setAttribute(rect, "y", "-4");

        this.elementRef.nativeElement.appendChild(rect);
        this.rect = rect;
        this.trySetSizeOfRect();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.scales) {
            this.trySetSizeOfRect();
        }

    }

    private trySetSizeOfRect() {
        if (isNullOrUndefined(this.rect)) return;
        if (isNullOrUndefined(this.scales)) return;

        const width = (this.scales.dataAreaWidth + 5).toString();
        if (notNullOrUndefined(width) && !width.includes("NaN") && this.scales.dataAreaWidth + 5 > 0) {
            this.renderer.setAttribute(this.rect, "width", width);
        }
        const height = (this.scales.dataAreaHeight + 5).toString();
        if (notNullOrUndefined(height) && !height.includes("NaN") && this.scales.dataAreaHeight + 5 > 0) {
            this.renderer.setAttribute(this.rect, "height", height);
        }

    }

}
