import { ChangeDetectionStrategy, Component, Inject, Optional } from "@angular/core";
import { dockingLayoutViewMap } from "../../docking-layout/views";
import { DockingLayoutService } from "../docking-layout.service";
import { ITEM_CONFIG, ItemConfiguration } from "../types";
import { AbstractContentItemComponent } from "./abstract-content-item.component";
import { hideEventType } from "../constants/event-types/hide-event-type.constant";
import { showEventType } from "../constants/event-types/show-event-type.constant";
import { shownEventType } from "../constants/event-types/shown-event-type.constant";
import { resizeEventType } from "./resize-event-type.constant";

@Component({
    selector: "dgp-item-container",
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemContainerComponent extends AbstractContentItemComponent {

    width: number;
    height: number;
    _element: JQuery<HTMLElement>;
    private readonly _contentElement: JQuery<HTMLElement>;

    constructor(@Inject(ITEM_CONFIG)
                readonly config: ItemConfiguration,
                @Optional()
                readonly parent: AbstractContentItemComponent,
                readonly layoutManager: DockingLayoutService) {
        super(layoutManager, config, parent);

        this._element = $(
            dockingLayoutViewMap.itemContainer.render()
        );

        this._contentElement = this._element.find(".lm_content");
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
        this.emit(hideEventType);
        this._element.hide();
    }

    /**
     * Shows a previously hidden container. Notifies the
     * containers content first and then shows the DOM element.
     * If the container is already visible this has no effect.
     */
    show() {
        this.emit(showEventType);
        this._element.show();
        // call shown only if the container has a valid size
        if (this.height !== 0 || this.width !== 0) {
            this.emit(shownEventType);
        }
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
            this.emit(resizeEventType);
        }
    }

}
