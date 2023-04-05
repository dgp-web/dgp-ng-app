import { DragListenerDirective } from "../drag-and-drop/drag-listener.directive";
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output } from "@angular/core";
import { isNullOrUndefined, observeAttribute$ } from "dgp-ng-app";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { Vector2 } from "../../../common";
import { DragEvent } from "../../models/drag-event.model";

@Component({
    selector: "dgp-gl-splitter",
    template: `
        <ng-container *ngIf="isVertical">
            <div class="lm_splitter lm_vertical"
                 [style.height.px]="size"
                 dgpGlDragListener
                 (dragStart$)="dragStart$.emit($event)"
                 (dragStop$)="dragStop$.emit($event)"
                 (drag$)="drag$.emit($event)">
                <div class="lm_drag_handle"
                     [style.top.px]="handleExcessPos$ | async"
                     [style.height.px]="handleSize$ | async"></div>
            </div>
        </ng-container>

        <ng-container *ngIf="!isVertical">
            <div class="lm_splitter lm_horizontal"
                 [style.width.px]="size"
                 dgpGlDragListener
                 (dragStart$)="dragStart$.emit($event)"
                 (dragStop$)="dragStop$.emit($event)"
                 (drag$)="drag$.emit($event)">
                <div class="lm_drag_handle"
                     [style.left.px]="handleExcessPos$ | async"
                     [style.width.px]="handleSize$ | async"></div>
            </div>
        </ng-container>
    `
})
export class SplitterComponent  {

    @Output()
    readonly dragStart$ = new EventEmitter<Vector2>();
    @Output()
    readonly dragStop$ = new EventEmitter<{}>();
    @Output()
    readonly drag$ = new EventEmitter<DragEvent>();

    @Input()
    size: number;

    @Input()
    grabSize: number;

    @Input()
    isVertical: boolean;

    readonly size$ = observeAttribute$(this as SplitterComponent, "size");
    readonly grabSize$ = observeAttribute$(this as SplitterComponent, "grabSize");

    readonly handleExcessSize$ = combineLatest([
        this.size$,
        this.grabSize$,
    ]).pipe(
        map(combination => {

            const size = combination[0];
            const grabSize = combination[1];

            if (isNullOrUndefined(size) || isNullOrUndefined(grabSize)) return null;

            return -(grabSize - size);

        })
    );

    readonly handleExcessPos$ = this.handleExcessSize$.pipe(
        map(handleExcessSize => {

            if (isNullOrUndefined(handleExcessSize)) return null;

            return handleExcessSize / 2;
        })
    );

    readonly handleSize$ = combineLatest([
        this.size$,
        this.handleExcessSize$
    ]).pipe(
        map(combination => {
            return combination[0] + combination[1];
        })
    );

    readonly element = $(this.elementRef.nativeElement);

    constructor(
        private readonly elementRef: ElementRef<HTMLElement>
    ) {
    }

    destroy() {
        this.element.remove();
    }

}
