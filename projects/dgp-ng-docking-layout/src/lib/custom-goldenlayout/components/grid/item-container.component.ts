import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter as NgEventEmitter,
    HostBinding,
    Output
} from "@angular/core";
import { ComponentConfiguration } from "../../types";
import { ComponentDefinition, ContainerDefinition } from "../../utilities/models";
import { ComponentRegistry } from "../../services/component-registry";
import { DgpView } from "dgp-ng-app";

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
export class ItemContainerComponent extends DgpView<ComponentConfiguration> implements AfterViewInit, ContainerDefinition {

    @HostBinding("class.lm_item_container")
    @HostBinding("class.lm_content")
    readonly bindings = true;

    private element = $(this.elementRef.nativeElement);

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
        super();
    }

    ngAfterViewInit(): void {
        let ComponentConstructor = this.componentRegistry.getComponent(this.model.id);
        const componentConfig = $.extend(true, {}, this.model.componentState || {}) as ComponentDefinition;

        if (this.model.title === "") {
            this.model.title = this.model.id;
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
