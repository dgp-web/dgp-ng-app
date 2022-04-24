import { Area } from "../../docking-layout/models";
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef } from "@angular/core";

@Component({
    selector: "dgp-drop-target-indicator",
    template: `
        <div class="lm_inner"></div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropTargetIndicatorComponent implements AfterViewInit {

    private element: JQuery;

    constructor(
        private readonly elRef: ElementRef<HTMLDivElement>
    ) {
    }

    destroy() {
        this.element.remove();
    }

    highlightArea(area: Area) {
        this.element.css({
            left: area.x1,
            top: area.y1,
            width: area.x2 - area.x1,
            height: area.y2 - area.y1
        })
            .show();
    }

    hide() {
        this.element.hide();
    }

    ngAfterViewInit(): void {
        this.element = $(this.elRef.nativeElement);

        $(document.body)
            .append(this.element);
    }

}
