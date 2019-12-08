import {
    Component,
    ChangeDetectionStrategy,
    Input,
    TemplateRef,
    ContentChild,
    Renderer2,
    AfterViewInit, ElementRef
} from "@angular/core";
import { VirtualListItemDirective } from "../../directives/virtual-list-item";

@Component({
    selector: "dgp-virtual-list-panel",
    templateUrl: "./virtual-list-panel.component.html",
    styleUrls: [
        "./virtual-list-panel.component.scss"
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class VirtualListPanelComponent implements AfterViewInit {

    @Input()
    itemSize = 48;

    @Input()
    items: ReadonlyArray<any>;

    @ContentChild(VirtualListItemDirective, { read: TemplateRef, static: false })
    itemTemplate: TemplateRef<any>;

    constructor(
        private readonly elementRef: ElementRef,
        private readonly renderer: Renderer2
    ) {}

    ngAfterViewInit(): void {
        const parentNode = this.renderer.parentNode(this.elementRef.nativeElement);
        this.renderer.setStyle(parentNode, "flex-grow", 1);
        this.renderer.setStyle(parentNode, "overflow", "auto");
        this.renderer.setStyle(parentNode, "height", "100%");
    }

}
