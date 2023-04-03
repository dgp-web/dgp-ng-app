import { EventEmitter } from "../../utilities";
import { TabComponent } from "./tab.component";
import { Component, ElementRef, EventEmitter as NgEventEmitter, HostBinding, Input, Output, ViewContainerRef } from "@angular/core";
import { ComponentConfiguration, StackConfiguration } from "../../types";
import { DragStartEvent } from "../../models/drag-start-event.model";

/**
 * This class represents a header above a Stack ContentItem.
 */
@Component({
    selector: "dgp-gl-header",
    template: `
        <ul class="lm_tabs card-header-tabs nav nav-tabs">
            <dgp-gl-tab *ngFor="let componentConfig of stackConfig.content"
                        [model]="componentConfig"
                        [isActive]="activeContentItem?.id === componentConfig.id"
                        (dragStart)="propagateDragStart($event, componentConfig)"
                        (selected)="propagateSelected(componentConfig)"></dgp-gl-tab>
        </ul>
    `
})
export class HeaderComponent extends EventEmitter {

    @HostBinding("class.lm_header")
    @HostBinding("class.card-header")
    readonly bindings = true;

    readonly element = $(this.elementRef.nativeElement);
    readonly tabs = new Array<TabComponent>();
    activeContentItem: ComponentConfiguration;

    @Input()
    sided: boolean;

    @Input()
    stackConfig: StackConfiguration;

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

    setActiveContentItem(contentItem: ComponentConfiguration) {
        for (let i = 0; i < this.stackConfig.content.length; i++) {
            let isActive = this.stackConfig.content[i].id === contentItem.id;

            if (isActive === true) {
                this.activeContentItem = contentItem;
                this.stackConfig.activeItemIndex = i;
            }
        }
    }

    destroy(): void {
        this.element.remove();
    }

}

