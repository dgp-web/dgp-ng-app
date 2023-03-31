import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, Inject, Optional, ViewChild } from "@angular/core";
import { DockingLayoutService } from "../../docking-layout.service";
import { ComponentConfiguration, ITEM_CONFIG, PARENT_ITEM_COMPONENT } from "../../types";
import { AbstractContentItemComponent } from "../shared/abstract-content-item.component";
import { hideEventType } from "../../constants/event-types/hide-event-type.constant";
import { showEventType } from "../../constants/event-types/show-event-type.constant";
import { shownEventType } from "../../constants/event-types/shown-event-type.constant";
import { ComponentDefinition } from "../../utilities/models";
import { EventEmitter } from "../../utilities";

@Component({
    selector: "dgp-item-container",
    template: `
        <div class="lm_content"
             #content></div>
    `,
    styles: [`
        :host {
            width: 100%;
            height: 100%;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemContainerComponent extends EventEmitter implements AfterViewInit {

    @HostBinding(".lm_item_container")
    readonly bindings = true;

    width: number;
    height: number;
    _element = $(this.elementRef.nativeElement);
    @ViewChild("content", {static: true})
    private contentElementElementRef: ElementRef<HTMLElement>;
    private _contentElement: JQuery;

    constructor(@Inject(ITEM_CONFIG)
                readonly config: ComponentConfiguration,
                @Optional()
                @Inject(PARENT_ITEM_COMPONENT)
                readonly parent: AbstractContentItemComponent,
                readonly dockingLayoutService: DockingLayoutService,
                readonly elementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    ngAfterViewInit(): void {

        this._contentElement = $(this.contentElementElementRef.nativeElement);

        let ComponentConstructor = this.dockingLayoutService.getComponent(this.config.id);
        const componentConfig = $.extend(true, {}, this.config.componentState || {}) as ComponentDefinition;

        componentConfig.componentName = this.config.id;

        if (this.config.title === "") {
            this.config.title = this.config.id;
        }

        ComponentConstructor(this, componentConfig);

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

}
