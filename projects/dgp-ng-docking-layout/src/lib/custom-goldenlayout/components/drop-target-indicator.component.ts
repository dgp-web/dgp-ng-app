import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Renderer2 } from "@angular/core";
import { AreaSides } from "../models/area.model";

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

    constructor(
        private readonly elRef: ElementRef<HTMLDivElement>,
        private readonly renderer: Renderer2
    ) {
    }

    highlightArea(area: AreaSides) {
        this.renderer.setStyle(this.elRef.nativeElement, "left", area.x1 + "px");
        this.renderer.setStyle(this.elRef.nativeElement, "top", area.y1 + "px");
        this.renderer.setStyle(this.elRef.nativeElement, "width", ((area.x2 as number) - (area.x1 as number)) + "px");
        this.renderer.setStyle(this.elRef.nativeElement, "height", ((area.y2 as number) - (area.y1 as number)) + "px");
        this.renderer.setStyle(this.elRef.nativeElement, "display", "block");
    }

    hide() {
        this.renderer.setStyle(this.elRef.nativeElement, "display", "none");
    }

    ngAfterViewInit(): void {
        document.body.appendChild(this.elRef.nativeElement);
    }

}
