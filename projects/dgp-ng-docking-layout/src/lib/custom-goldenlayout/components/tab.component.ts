import { Vector2 } from "../../common/models";
import { DragListenerDirective } from "./drag-listener.directive";
import { AbstractContentItemComponent } from "./abstract-content-item.component";
import { activeClassName } from "../constants/active-class-name.constant";
import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, ViewChild } from "@angular/core";
import { DragStartEvent } from "../models/drag-start-event.model";
import { DgpView } from "dgp-ng-app";
import { ComponentConfiguration } from "../types";

/**
 * Represents an individual tab within a Stack's header
 */
@Component({
    selector: "dgp-gl-tab",
    template: `
        <li #dragListenerHost
            dgpGlDragListener
            (dragStart$)="onDragStart($event)"
            class="lm_tab nav-item">
            <a class="lm_title nav-link"
               [class.active]="isActive">{{label}}</a>
        </li>
    `
})
export class TabComponent extends DgpView<ComponentConfiguration> {

    private rawElement = this.elementRef.nativeElement;
    readonly element = $(this.rawElement);

    @ViewChild("dragListenerHost", {read: DragListenerDirective})
    private dragListener: DragListenerDirective;

    @Output()
    readonly selected = new EventEmitter<AbstractContentItemComponent>();

    @Output()
    readonly dragStart = new EventEmitter<DragStartEvent>();

    @HostBinding("." + activeClassName)
    @Input()
    isActive: boolean;

    @Input()
    tabId: string;

    @Input()
    label: string;

    constructor(
        private readonly elementRef: ElementRef
    ) {
        super();
    }

    onDragStart(coordinates: Vector2) {
        this.dragStart.emit({
            coordinates,
            dragListener: this.dragListener
        });
    }

    @HostListener("click")
    onTabClick() {
        this.selected.emit();
    }

}

