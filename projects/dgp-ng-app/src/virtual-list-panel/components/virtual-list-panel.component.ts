import {
    Component,
    ChangeDetectionStrategy,
    Input,
    TemplateRef,
    ContentChild,
    Renderer2,
    AfterViewInit, ElementRef
} from "@angular/core";
import { VirtualListItemDirective } from "../directives/virtual-list-item.directive";

@Component({
    selector: "dgp-virtual-list-panel",
    template: `
        <cdk-virtual-scroll-viewport [itemSize]="itemSize"
                                     style="height: 100%; width:100%;">
            <ng-container *cdkVirtualFor="let item of items">
                <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
            </ng-container>
        </cdk-virtual-scroll-viewport>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class VirtualListPanelComponent implements AfterViewInit {

    @Input()
    itemSize = 48;

    @Input()
    items: ReadonlyArray<any>;

    @ContentChild(VirtualListItemDirective, {read: TemplateRef, static: false})
    itemTemplate: TemplateRef<any>;

    constructor(
        private readonly elementRef: ElementRef,
        private readonly renderer: Renderer2
    ) {
    }

    ngAfterViewInit(): void {
        const parentNode = this.renderer.parentNode(this.elementRef.nativeElement);
        this.renderer.setStyle(parentNode, "flex-grow", 1);
        this.renderer.setStyle(parentNode, "overflow", "auto");
        this.renderer.setStyle(parentNode, "height", "100%");
    }

}
