import { Area } from "../../docking-layout/models";
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef } from "@angular/core";

@Component({
    selector: "dgp-drop-target-indicator",
    template: `
        <div class="content"></div>
    `,
    styles: [`
        :host {
            display: none;
            position: absolute;
            z-index: 20;
            box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.4);
            outline: 1px dashed #cccccc;
            margin: 1px;
            transition: all 200ms ease
        }

        .content {
            width: 100%;
            height: 100%;
            position: relative;
            top: 0;
            left: 0;
            background: #000000;
            opacity: .1
        }

    `],
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
