import { ItemContainerComponent } from "./grid/item-container.component";
import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Inject } from "@angular/core";
import { DockingLayoutService } from "../docking-layout.service";
import { ComponentConfiguration, ITEM_CONFIG, itemDefaultConfig, PARENT_ITEM_COMPONENT } from "../types";
import { AreaSides } from "../models/area.model";
import { DockingLayoutEngineObject } from "./docking-layout-engine-object";
import { DragProxy } from "./drag-and-drop/drag-proxy.component";
import { WithDragParent } from "../models/with-drag-parent.model";

@Component({
    selector: "dgp-gl-component",
    template: ``,
    styles: [`
        :host {
            overflow: auto;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlComponent extends DockingLayoutEngineObject implements WithDragParent {

    private container: ItemContainerComponent;
    isComponent = true;
    isInitialised = false;
    element: JQuery;

    constructor(
        @Inject(forwardRef(() => DockingLayoutService))
        public dockingLayoutService: DockingLayoutService,
        @Inject(ITEM_CONFIG)
        public config: ComponentConfiguration,
        @Inject(PARENT_ITEM_COMPONENT)
        public parent: any,
        private readonly elementRef: ElementRef<HTMLElement>,
    ) {
        super();
        this.config = {...itemDefaultConfig, ...config};
        this.isComponent = true;

        const vcRef = this.dockingLayoutService.getViewContainerRef();

        const itemContainerComponentRef = vcRef.createComponent(ItemContainerComponent);
        itemContainerComponentRef.instance.config = this.config;
        itemContainerComponentRef.changeDetectorRef.markForCheck();
        this.container = itemContainerComponentRef.instance;

        this.element = $(this.elementRef.nativeElement);
        // move rendered item to container (shouldn't be necessary?)
        this.elementRef.nativeElement.append(itemContainerComponentRef.injector.get(ElementRef).nativeElement);
    }

    setSize() {
    }

    init() {
        this.isInitialised = true;
        this.container.emit("open");
    }

    hide() {
        this.container.hide();
        this.element.hide();
        this.dockingLayoutService.updateSize();
    }

    show() {
        this.container.show();
        this.element.show();
        this.dockingLayoutService.updateSize();
    }

    destroy() {
        this.container.emit("destroy", this);
        this.unsubscribe();
        this.element.remove();
    }

    setDragParent(parent: DragProxy) {
        this.parent = parent;
    }

    highlightDropZone(x: number, y: number, area: AreaSides) {
        this.dockingLayoutService.dropTargetIndicator.highlightArea(area);
    }

}
