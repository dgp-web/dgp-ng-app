import { AbstractContentItemComponent } from "./abstract-content-item.component";
import { ItemContainerComponent } from "./item-container.component";
import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { DockingLayoutService } from "../docking-layout.service";
import { ComponentConfiguration, ITEM_CONFIG, PARENT_ITEM_COMPONENT } from "../types";
import { ComponentRegistry } from "../services/component-registry";

@Component({
    selector: "dgp-gl-component",
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlComponent extends AbstractContentItemComponent {

    readonly isComponent = true;

    container: ItemContainerComponent;
    element: JQuery;

    constructor(
        public layoutManager: DockingLayoutService,
        @Inject(ITEM_CONFIG)
        public config: ComponentConfiguration,
        @Inject(PARENT_ITEM_COMPONENT)
        public parent: AbstractContentItemComponent,
        private readonly componentRegistry: ComponentRegistry,
    ) {
        super(layoutManager, config, parent);

        this.container = new ItemContainerComponent(this.config, this, layoutManager);
        let ComponentConstructor = this.componentRegistry.getComponent(this.config.id);
        ComponentConstructor(this.container, this.config.componentState);
        this.element = this.container.element;
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

}
