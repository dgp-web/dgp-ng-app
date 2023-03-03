import { Subscription } from "rxjs";
import { Vector2 } from "../../common/models";
import { DragListenerDirective } from "./drag-listener.directive";
import { AbstractContentItemComponent } from "./abstract-content-item.component";
import { activeClassName } from "../constants/active-class-name.constant";
import { bootstrapActiveClassName } from "../constants/class-names/bootstrap-active-class-name.constant";
import { Component, ElementRef, EventEmitter, HostListener, Inject, InjectionToken, Output } from "@angular/core";
import { tabCreatedEventType } from "../constants/event-types/tab-created-event-type.constant";
import { tabEventType } from "../constants/tab-created-event-type.constant";
import { destroyEventType } from "../constants/event-types/destroy-event-type.constant";
import { DragStartEvent } from "../models/drag-start-event.model";
import { DgpView } from "dgp-ng-app";
import { ComponentConfiguration } from "../types";
import { DockingLayoutService } from "../docking-layout.service";

export const TAB_CONTENT_ITEM_COMPONENT = new InjectionToken("tabContentItemComponent");

/**
 * Represents an individual tab within a Stack's header
 */
@Component({
    selector: "dgp-gl-tab",
    template: `
        <li class="lm_tab nav-item">
            <a class="lm_title nav-link">{{model?.title}}</a>
        </li>
    `
})
export class TabComponent extends DgpView<ComponentConfiguration> {

    private subscriptions: Subscription[] = [];

    private rawElement = this.elementRef.nativeElement;
    element = $(this.rawElement);
    private isActive = false;
    private dragListener: DragListenerDirective;

    @Output()
    readonly selected = new EventEmitter<AbstractContentItemComponent>();

    @Output()
    readonly dragStart = new EventEmitter<DragStartEvent>();

    constructor(
        @Inject(TAB_CONTENT_ITEM_COMPONENT)
        public contentItem: AbstractContentItemComponent,
        private readonly elementRef: ElementRef,
        private readonly dockingLayoutService: DockingLayoutService,
    ) {
        super();
        this.model = contentItem.config as ComponentConfiguration;

        if (
            this.dockingLayoutService.config.settings.reorderEnabled === true &&
            contentItem.config.reorderEnabled === true
        ) {
            this.dragListener = new DragListenerDirective(this.element);
            const dragStartSubscription = this.dragListener
                .dragStart$
                .subscribe(x => this.onDragStart(x));
            this.subscriptions.push(dragStartSubscription);
            this.contentItem.on(destroyEventType, this.dragListener.destroy, this.dragListener);
        }

        (this.contentItem as any).tab = this;
        this.contentItem.emit(tabEventType, this);
        this.contentItem.layoutManager.emit(tabCreatedEventType, this);

        if (this.contentItem.isComponent) {
            (this.contentItem as any).container.tab = this;
            (this.contentItem as any).container.emit(tabEventType, this);
        }
    }

    /**
     * Sets this tab's active state. To programmatically
     * switch tabs, use header.setActiveContentItem( item ) instead.
     */
    setActive(isActive: boolean) {
        if (isActive === this.isActive) return;
        this.isActive = isActive;

        if (isActive) {
            this.element.addClass(activeClassName);
            this.element.find("a")
                .addClass(bootstrapActiveClassName);
        } else {
            this.element.removeClass(activeClassName);
            this.element.find("a")
                .removeClass(bootstrapActiveClassName);
        }
    }

    destroy() {

        this.subscriptions.forEach(x => x.unsubscribe());

        if (this.dragListener) {
            this.contentItem.off(destroyEventType, this.dragListener.destroy, this.dragListener);
            this.dragListener = null;
        }

        this.element.remove();
    }

    onDragStart(coordinates: Vector2) {
        this.dragStart.emit({
            coordinates,
            dragListener: this.dragListener,
            contentItem: this.contentItem
        });
    }

    @HostListener("click")
    onTabClick() {
        this.selected.emit(this.contentItem);
    }

}

