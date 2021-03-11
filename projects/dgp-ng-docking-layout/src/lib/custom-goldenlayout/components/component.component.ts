import { AbstractContentItemComponent } from "./abstract-content-item.component";
import { ItemContainerComponent } from "./item-container.component";
import { Directive } from "@angular/core";

/**
 * @param {[type]} layoutManager [description]
 * @param {[type]} config      [description]
 * @param {[type]} parent        [description]
 */
@Directive()
export class Component extends AbstractContentItemComponent {
    componentName: any;
    public container: any;
    public instance: any;
    public element: any;

    constructor(public layoutManager, public config, public parent) {
        super(layoutManager, config, parent);

        let ComponentConstructor = layoutManager.getComponent(this.config.id),
            componentConfig = $.extend(true, {}, this.config.componentState || {});

        componentConfig.componentName = this.config.id;
        this.componentName = this.config.id;

        if (this.config.label === "") {
            this.config.label = this.config.id;
        }

        this.isComponent = true;
        this.container = new ItemContainerComponent(this.config, this, layoutManager);
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

    _$init() {
        super._$init();
        this.container.emit("open");
    }

    _$hide() {
        this.container.hide();
        super._$hide();
    }

    _$show() {
        this.container.show();
        super._$show();
    }

    _$shown() {
        this.container.shown();
        // super._$shown();
    }

    _$destroy() {
        this.container.emit("destroy", this);
        super._$destroy();
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
