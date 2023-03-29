import { AbstractContentItemComponent } from "./shared/abstract-content-item.component";
import { ItemContainerComponent } from "./grid/item-container.component";
import { ChangeDetectionStrategy, Component, forwardRef, Inject } from "@angular/core";
import { DockingLayoutService } from "../docking-layout.service";
import { ITEM_CONFIG, PARENT_ITEM_COMPONENT } from "../types";

/**
 * @param {[type]} layoutManager [description]
 * @param {[type]} config      [description]
 * @param {[type]} parent        [description]
 */
@Component({
    selector: "dgp-gl-component",
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlComponent extends AbstractContentItemComponent {
    componentName: any;
    public container: any;
    public instance: any;
    public element: any;

    constructor(
        @Inject(forwardRef(() => DockingLayoutService))
        public dockingLayoutService: DockingLayoutService,
        @Inject(ITEM_CONFIG)
        public config: any,
        @Inject(PARENT_ITEM_COMPONENT)
        public parent: AbstractContentItemComponent
    ) {
        super(dockingLayoutService, config, parent);

        let ComponentConstructor = dockingLayoutService.getComponent(this.config.id),
            componentConfig = $.extend(true, {}, this.config.componentState || {});

        componentConfig.componentName = this.config.id;
        this.componentName = this.config.id;

        if (this.config.label === "") {
            this.config.label = this.config.id;
        }

        this.isComponent = true;
        this.container = new ItemContainerComponent(this.config, this, dockingLayoutService);
        this.instance = ComponentConstructor(this.container, componentConfig);
        this.element = this.container._element;
    }

    close() {
        this.parent.removeChild(this);
    }

    setSize() {
        if (this.element.is(":visible")) {
            // Do not update size of hidden components to prevent unwanted reflows
            this.container._$setSize(this.element.width(), this.element.height());
        }
    }

    init() {
        super.init();
        this.container.emit("open");
    }

    hide() {
        this.container.hide();
        super.hide();
    }

    show() {
        this.container.show();
        super.show();
    }

    shown() {
        this.container.shown();
        // super.shown();
    }

    destroy() {
        this.container.emit("destroy", this);
        super.destroy();
    }

    /**
     * Dragging onto a component directly is not an option
     *
     * @returns null
     */
    getArea() {
        return null;
    }

}
