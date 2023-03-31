import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input } from "@angular/core";
import { DockingLayoutService } from "../../docking-layout.service";
import { ComponentConfiguration } from "../../types";
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

    @Input()
    config: ComponentConfiguration;

    constructor(
        readonly dockingLayoutService: DockingLayoutService,
        readonly elementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    ngAfterViewInit(): void {
        let ComponentConstructor = this.dockingLayoutService.getComponent(this.config.id);
        const componentConfig = $.extend(true, {}, this.config.componentState || {}) as ComponentDefinition;

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
