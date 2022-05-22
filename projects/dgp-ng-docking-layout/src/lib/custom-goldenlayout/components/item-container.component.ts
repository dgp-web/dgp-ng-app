import { ChangeDetectionStrategy, Component, Inject, Optional } from "@angular/core";
import { dockingLayoutViewMap } from "../../docking-layout/views";
import { DockingLayoutService } from "../docking-layout.service";
import { ITEM_CONFIG, ItemConfiguration } from "../types";
import { AbstractContentItemComponent } from "./abstract-content-item.component";

@Component({
    selector: "dgp-item-container",
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemContainerComponent extends AbstractContentItemComponent {

    width: number;
    height: number;
    title: string;
    isHidden: boolean;
    _config: any;
    element: JQuery;
    _contentElement: any;

    constructor(@Inject(ITEM_CONFIG)
                readonly config: ItemConfiguration,
                @Optional()
                readonly parent: AbstractContentItemComponent,
                readonly layoutManager: DockingLayoutService) {
        super(layoutManager, config, parent);

        this.title = config.id as string;
        this.element = $(
            dockingLayoutViewMap.itemContainer.render()
        );

        this._contentElement = this.element.find(".lm_content");
    }

    /**
     * Get the inner DOM element the container's content
     * is intended to live in
     */
    getElement() {
        return this._contentElement;
    }

    /**
     * Hide the container. Notifies the containers content first
     * and then hides the DOM node. If the container is already hidden
     * this should have no effect
     */
    hide() {
        this.emit("hide");
        this.isHidden = true;
        this.element.hide();
    }

    /**
     * Shows a previously hidden container. Notifies the
     * containers content first and then shows the DOM element.
     * If the container is already visible this has no effect.
     */
    show() {
        this.emit("show");
        this.isHidden = false;
        this.element.show();
        // call shown only if the container has a valid size
        if (this.height !== 0 || this.width !== 0) {
            this.emit("shown");
        }
    }


    /**
     * Closes the container if it is closable. Can be called by
     * both the component within at as well as the contentItem containing
     * it. Emits a close event before the container itself is closed.
     */
    close() {
        if (this._config.isClosable) {
            this.emit("close");
            this.parent.close();
        }
    }

    /**
     * Set's the components title
     */
    setTitle(title: string) {
        this.parent.setTitle(title);
    }

    /**
     * Set's the containers size. Called by the container's component.
     * To set the size programmatically from within the container please
     * use the public setSize method
     */
    _$setSize(width: number, height: number) {
        if (width !== this.width || height !== this.height) {
            this.width = width;
            this.height = height;
            const cl = this._contentElement[0];
            const hdelta = cl.offsetWidth - cl.clientWidth;
            const vdelta = cl.offsetHeight - cl.clientHeight;
            this._contentElement.width(this.width - hdelta)
                .height(this.height - vdelta);
            this.emit("resize");
        }
    }

}
