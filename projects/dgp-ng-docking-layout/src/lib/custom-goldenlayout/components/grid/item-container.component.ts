import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter as NgEventEmitter,
    HostBinding,
    Input,
    Output
} from "@angular/core";
import { ComponentConfiguration } from "../../types";
import { ComponentDefinition, ContainerDefinition } from "../../utilities/models";
import { ComponentRegistry } from "../../services/component-registry";

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
export class ItemContainerComponent implements AfterViewInit, ContainerDefinition {

    @HostBinding("class.lm_item_container")
    @HostBinding("class.lm_content")
    readonly bindings = true;

    private element = $(this.elementRef.nativeElement);

    @Input()
    config: ComponentConfiguration;

    @Output()
    readonly onOpen = new NgEventEmitter();

    @Output()
    readonly onHide = new NgEventEmitter();

    @Output()
    readonly onShow = new NgEventEmitter();

    @Output()
    readonly onDestroy = new NgEventEmitter();

    constructor(
        readonly componentRegistry: ComponentRegistry,
        readonly elementRef: ElementRef<HTMLElement>
    ) {
    }

    ngAfterViewInit(): void {
        let ComponentConstructor = this.componentRegistry.getComponent(this.config.id);
        const componentConfig = $.extend(true, {}, this.config.componentState || {}) as ComponentDefinition;

        if (this.config.title === "") {
            this.config.title = this.config.id;
        }

        ComponentConstructor(this, componentConfig);
    }

    getElement() {
        return this.element;
    }

    open() {
        this.onOpen.emit();
    }

    hide() {
        this.onHide.emit();
        this.element.hide();
    }

    show() {
        this.onShow.emit();
        this.element.show();
    }

    destroy() {
        this.onDestroy.emit();
    }

}
