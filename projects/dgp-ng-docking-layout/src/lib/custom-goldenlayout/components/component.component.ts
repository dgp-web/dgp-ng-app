import { AbstractContentItemComponent } from "./shared/abstract-content-item.component";
import { ItemContainerComponent } from "./grid/item-container.component";
import { ChangeDetectionStrategy, Component, forwardRef, Inject, Injector } from "@angular/core";
import { DockingLayoutService } from "../docking-layout.service";
import { ITEM_CONFIG, PARENT_ITEM_COMPONENT } from "../types";

@Component({
    selector: "dgp-gl-component",
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlComponent extends AbstractContentItemComponent {
    private container: ItemContainerComponent;

    constructor(
        @Inject(forwardRef(() => DockingLayoutService))
        public dockingLayoutService: DockingLayoutService,
        @Inject(ITEM_CONFIG)
        public config: any,
        @Inject(PARENT_ITEM_COMPONENT)
        public parent: AbstractContentItemComponent
    ) {
        super(dockingLayoutService, config, parent);

        this.isComponent = true;

        const vcRef = this.dockingLayoutService.getViewContainerRef();
        const rootInjector = this.dockingLayoutService.getInjector();
        const injector = Injector.create({
            parent: rootInjector,
            providers: [{
                provide: ITEM_CONFIG,
                useValue: this.config
            }, {
                provide: PARENT_ITEM_COMPONENT,
                useValue: this
            }]
        });

        const itemContainerComponentRef = vcRef.createComponent(ItemContainerComponent, {injector});
        itemContainerComponentRef.changeDetectorRef.markForCheck();
        this.container = itemContainerComponentRef.instance;

        this.element = this.container._element;
    }

    close() {
        this.parent.removeChild(this);
    }

    setSize() {
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

    destroy() {
        this.container.emit("destroy", this);
        super.destroy();
    }

}
