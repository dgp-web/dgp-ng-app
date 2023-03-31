import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, Injector, Optional } from "@angular/core";
import { DockingLayoutService } from "../../docking-layout.service";
import { ITEM_CONFIG, ItemConfiguration, PARENT_ITEM_COMPONENT } from "../../types";
import { AbstractContentItemComponent } from "../shared/abstract-content-item.component";
import { hideEventType } from "../../constants/event-types/hide-event-type.constant";
import { showEventType } from "../../constants/event-types/show-event-type.constant";
import { shownEventType } from "../../constants/event-types/shown-event-type.constant";
import { resizeEventType } from "../../constants/event-types/resize-event-type.constant";
import { dockingLayoutViewMap } from "../../../docking-layout/views";

@Component({
    selector: "dgp-item-container",
    template: `
        <!-- <div class="lm_item_container">
             <div class="lm_content"></div>
         </div>-->
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemContainerComponent extends AbstractContentItemComponent implements AfterViewInit {

    width: number;
    height: number;
    _element: JQuery;
    private _contentElement: JQuery<HTMLElement>;

    constructor(@Inject(ITEM_CONFIG)
                readonly config: any,
                @Optional()
                @Inject(PARENT_ITEM_COMPONENT)
                readonly parent: AbstractContentItemComponent,
                readonly dockingLayoutService: DockingLayoutService,
                readonly elementRef: ElementRef<HTMLElement>
    ) {
        super(dockingLayoutService, config, parent);
        this._element = $(this.elementRef.nativeElement).append(
            dockingLayoutViewMap.itemContainer.render()
        );
        this._contentElement = this._element.find(".lm_content");


        let ComponentConstructor = dockingLayoutService.getComponent(this.config.id),
            componentConfig = $.extend(true, {}, this.config.componentState || {});

        componentConfig.componentName = this.config.id;
        // this.componentName = this.config.id;

        if (this.config.label === "") {
            this.config.label = this.config.id;
        }

        const component = ComponentConstructor(this, componentConfig);

    }

    ngAfterViewInit(): void {
    }

    // noinspection JSUnusedGlobalSymbols
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
