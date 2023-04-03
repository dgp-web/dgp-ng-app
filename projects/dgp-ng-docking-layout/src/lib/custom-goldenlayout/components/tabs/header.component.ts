import { TabComponent } from "./tab.component";
import { Component, ElementRef, EventEmitter as NgEventEmitter, HostBinding, Output, ViewContainerRef } from "@angular/core";
import { ComponentConfiguration, StackConfiguration } from "../../types";
import { DragStartEvent } from "../../models/drag-start-event.model";
import { DgpView } from "dgp-ng-app";

@Component({
    selector: "dgp-gl-header",
    template: `
        <ul class="lm_tabs card-header-tabs nav nav-tabs">
            <dgp-gl-tab *ngFor="let componentConfig of model.content"
                        [model]="componentConfig"
                        [isActive]="model.activeItemId === componentConfig.id"
                        (dragStart)="propagateDragStart($event, componentConfig)"
                        (selected)="propagateSelected(componentConfig)"></dgp-gl-tab>
        </ul>
    `
})
export class HeaderComponent extends DgpView<StackConfiguration> {

    @HostBinding("class.lm_header")
    @HostBinding("class.card-header")
    readonly bindings = true;

    readonly element = $(this.elementRef.nativeElement);
    readonly tabs = new Array<TabComponent>();

    @Output()
    readonly selectedContentItemChange = new NgEventEmitter<ComponentConfiguration>();

    @Output()
    readonly dragStart = new NgEventEmitter<{
        readonly contentItem: ComponentConfiguration;
    } & DragStartEvent>();

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly elementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    getActiveContentItem(): ComponentConfiguration {
        return this.model.content.find(x => x.id === this.model.activeItemId);
    }

    propagateDragStart(event: DragStartEvent, componentConfig: ComponentConfiguration) {
        this.dragStart.emit({
            contentItem: componentConfig,
            dragListener: event.dragListener,
            coordinates: event.coordinates
        });
    }

    propagateSelected(componentConfig: ComponentConfiguration) {
        this.selectedContentItemChange.emit(componentConfig);
    }

    destroy(): void {
        this.element.remove();
    }

}

