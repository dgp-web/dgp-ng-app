import { AbstractContentItemComponent } from "../abstract-content-item";
import { ItemContainer } from "../item-container";

/**
 * @param {[type]} layoutManager [description]
 * @param {[type]} config      [description]
 * @param {[type]} parent        [description]
 */
export class Component extends AbstractContentItemComponent {
    componentName: any;
    private container: any;
    private instance: any;
    private element: any;

    constructor(private layoutManager, private config, private parent) {
        super(layoutManager, config, parent);

        var ComponentConstructor = layoutManager.getComponent(this.config.componentName),
            componentConfig = $.extend(true, {}, this.config.componentState || {});

        componentConfig.componentName = this.config.componentName;
        this.componentName = this.config.componentName;

        if (this.config.title === '') {
            this.config.title = this.config.componentName;
        }

        this.isComponent = true;
        this.container = new ItemContainer(this.config, this, layoutManager);
        this.instance = new ComponentConstructor(this.container, componentConfig);
        this.element = this.container._element;
    }

    close() {
        this.parent.removeChild(this);
    }

    setSize() {
        if (this.element.is(':visible')) {
            // Do not update size of hidden components to prevent unwanted reflows
            this.container._$setSize(this.element.width(), this.element.height());
        }
    }

    _$init() {
        super._$init();
        this.container.emit('open');
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
        super._$shown();
    }

    _$destroy() {
        this.container.emit('destroy', this);
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