import { AbstractContentItemComponent } from "./abstract-content-item.component";
import { ItemContainerComponent } from "./item-container.component";
import { ChangeDetectionStrategy, Component, forwardRef, Inject } from "@angular/core";
import { DockingLayoutService } from "../docking-layout.service";
import { ComponentConfiguration, ITEM_CONFIG, PARENT_ITEM_COMPONENT } from "../types";
import { ComponentDefinition } from "../utilities/models";

@Component({
    selector: "dgp-gl-component",
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlComponent extends AbstractContentItemComponent {
    private componentName: string;
    public container: ItemContainerComponent;
    public instance: any;
    public element: any;

    constructor(
        @Inject(forwardRef(() => DockingLayoutService))
        public layoutManager: DockingLayoutService,
        @Inject(ITEM_CONFIG)
        public config: ComponentConfiguration,
        @Inject(PARENT_ITEM_COMPONENT)
        public parent: AbstractContentItemComponent
    ) {
        super(layoutManager, config, parent);

        let ComponentConstructor = layoutManager.getComponent(this.config.id);
        const componentConfig: Partial<ComponentConfiguration> = $.extend(true, {}, this.config.componentState || {});

        componentConfig.componentName = this.config.id as string;
        this.componentName = this.config.id as string;

        if (this.config.label === "") {
            this.config.label = this.config.id as string;
        }

        this.isComponent = true;
        this.container = new ItemContainerComponent(this.config, this, layoutManager);
        this.instance = ComponentConstructor(this.container, componentConfig as ComponentDefinition<any>);
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

    _$show() {
        this.container.show();
        super._$show();
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
    _$getArea() {
        return null;
    }

}
