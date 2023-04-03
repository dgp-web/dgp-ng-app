import { Vector2 } from "../../../common/models";
import { DragListenerDirective } from "../drag-and-drop/drag-listener.directive";
import { activeClassName } from "../../constants/active-class-name.constant";
import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, ViewChild } from "@angular/core";
import { DragStartEvent } from "../../models/drag-start-event.model";
import { DgpView } from "dgp-ng-app";
import { ComponentConfiguration } from "../../types";

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
               [class.active]="isActive">{{model.title}}</a>
        </li>
    `
})
export class TabComponent extends DgpView<ComponentConfiguration> {

    private rawElement = this.elementRef.nativeElement;
    readonly element = $(this.rawElement);

    @ViewChild("dragListenerHost", {read: DragListenerDirective})
    private dragListener: DragListenerDirective;

    @Output()
    readonly selected = new EventEmitter<any>();

    @Output()
    readonly dragStart = new EventEmitter<DragStartEvent>();

    @HostBinding("." + activeClassName)
    @Input()
    isActive: boolean;

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

