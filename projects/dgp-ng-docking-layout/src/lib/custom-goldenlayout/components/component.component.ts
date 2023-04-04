import { ItemContainerComponent } from "./grid/item-container.component";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, ViewChild } from "@angular/core";
import { ComponentConfiguration, ITEM_CONFIG, itemDefaultConfig, PARENT_ITEM_COMPONENT } from "../types";
import { DragProxy } from "./drag-and-drop/drag-proxy.component";
import { WithDragParent } from "../models/with-drag-parent.model";
import { StackComponent } from "./tabs/stack.component";

@Component({
    selector: "dgp-gl-component",
    template: `
        <dgp-item-container [model]="config"
                            [isHidden]="isHidden"></dgp-item-container>
    `,
    styles: [`
        :host {
            overflow: auto;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlComponent implements WithDragParent {

    readonly element = $(this.elementRef.nativeElement);

    @ViewChild(ItemContainerComponent, {read: ItemContainerComponent})
    private container: ItemContainerComponent;

    isComponent = true;
    isHidden = true;

    constructor(
        @Inject(ITEM_CONFIG)
        public config: ComponentConfiguration,
        @Inject(PARENT_ITEM_COMPONENT)
        public parent: StackComponent,
        private readonly elementRef: ElementRef<HTMLElement>,
        private readonly cd: ChangeDetectorRef
    ) {
        this.config = {...itemDefaultConfig, ...config};
    }


    hide() {
        this.isHidden = true;
        this.cd.markForCheck();
        this.element.hide();
    }

    show() {
        this.isHidden = false;
        this.cd.markForCheck();
        this.element.show();
    }

    destroy() {
        this.element.remove();
    }

    setDragParent(parent: DragProxy) {
        this.parent = parent as unknown as StackComponent;
    }


}
