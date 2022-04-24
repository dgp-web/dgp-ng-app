import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef } from "@angular/core";

@Component({
    selector: "dgp-tab-drop-placeholder",
    template: ``,
    styles: [`
        :host {
            float: left;
            width: 100px;
            height: 10px;
            visibility: hidden;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabDropPlaceholderComponent implements AfterViewInit {

    $element: JQuery;

    constructor(
        readonly elRef: ElementRef<HTMLDivElement>
    ) {
    }

    width() {
        return this.elRef.nativeElement.getBoundingClientRect().width;
    }

    offset() {
        return this.elRef.nativeElement.getBoundingClientRect();
    }

    remove() {
        this.$element.remove();
    }

    ngAfterViewInit(): void {
        this.$element = $(this.elRef.nativeElement);
        this.$element.remove();
    }


}
