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
import { DgpView, observeAttribute$ } from "dgp-ng-app";

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

    @Input()
    isHidden: boolean;
    readonly isHidden$ = observeAttribute$(this as ItemContainerComponent, "isHidden");

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
        this.open();

        this.isHidden$.subscribe(hidden => {
            if (hidden) {
                this.hide();
            } else {
                this.show();
            }
        });
    }

    getElement() {
        return this.element;
    }

    private open() {
        this.onOpen.emit();
    }

    private hide() {
        this.onHide.emit();
        this.element.hide();
    }

    private show() {
        this.onShow.emit();
        this.element.show();
    }

    destroy() {
        this.onDestroy.emit();
    }

}
