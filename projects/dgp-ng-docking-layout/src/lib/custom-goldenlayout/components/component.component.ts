import { ItemContainerComponent } from "./grid/item-container.component";
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, ViewChild } from "@angular/core";
import { ComponentConfiguration, ITEM_CONFIG, itemDefaultConfig, PARENT_ITEM_COMPONENT } from "../types";
import { DragProxy } from "./drag-and-drop/drag-proxy.component";
import { WithDragParent } from "../models/with-drag-parent.model";
import { StackComponent } from "./tabs/stack.component";

@Component({
    selector: "dgp-gl-component",
    template: `
        <dgp-item-container [model]="config"></dgp-item-container>
    `,
    styles: [`
        :host {
            overflow: auto;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlComponent implements WithDragParent, AfterViewInit {

    readonly element = $(this.elementRef.nativeElement);

    @ViewChild(ItemContainerComponent, {read: ItemContainerComponent})
    private container: ItemContainerComponent;

    isComponent = true;

    constructor(
        @Inject(ITEM_CONFIG)
        public config: ComponentConfiguration,
        @Inject(PARENT_ITEM_COMPONENT)
        public parent: StackComponent,
        private readonly elementRef: ElementRef<HTMLElement>
    ) {
        this.config = {...itemDefaultConfig, ...config};
    }

    ngAfterViewInit(): void {
        this.elementRef.nativeElement.append(this.container.elementRef.nativeElement);
        this.container.open();
    }

    hide() {
        this.container.hide();
        this.element.hide();
    }

    show() {
        this.container.show();
        this.element.show();
    }

    destroy() {
        this.container.destroy();
        this.element.remove();
    }

    setDragParent(parent: DragProxy) {
        this.parent = parent as unknown as StackComponent;
    }


}
