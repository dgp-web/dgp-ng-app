import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, Inject, Optional, ViewChild } from "@angular/core";
import { DockingLayoutService } from "../../docking-layout.service";
import { ComponentConfiguration, ITEM_CONFIG, PARENT_ITEM_COMPONENT } from "../../types";
import { AbstractContentItemComponent } from "../shared/abstract-content-item.component";
import { hideEventType } from "../../constants/event-types/hide-event-type.constant";
import { showEventType } from "../../constants/event-types/show-event-type.constant";
import { ComponentDefinition, ContainerDefinition } from "../../utilities/models";
import { EventEmitter } from "../../utilities";

@Component({
    selector: "dgp-item-container",
    template: `
    `,
    styles: [`
        :host {
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemContainerComponent extends EventEmitter implements AfterViewInit, ContainerDefinition {

    @HostBinding("class.lm_item_container")
    @HostBinding("class.lm_content")
    readonly bindings = true;

    private element = $(this.elementRef.nativeElement);

    constructor(
        @Inject(ITEM_CONFIG)
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

        let ComponentConstructor = this.dockingLayoutService.getComponent(this.config.id);
        const componentConfig = $.extend(true, {}, this.config.componentState || {}) as ComponentDefinition;

        componentConfig.componentName = this.config.id;

        if (this.config.title === "") {
            this.config.title = this.config.id;
        }

        ComponentConstructor(this, componentConfig);
    }

    getElement() {
        return this.element;
    }

    hide() {
        this.emit(hideEventType);
        this.element.hide();
    }

    show() {
        this.emit(showEventType);
        this.element.show();
    }

}
