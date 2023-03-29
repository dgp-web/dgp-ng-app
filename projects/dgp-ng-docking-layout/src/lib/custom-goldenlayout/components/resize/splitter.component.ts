import { DragListenerDirective } from "../drag-and-drop/drag-listener.directive";
import { AfterViewInit, Component, ElementRef, Input } from "@angular/core";
import { isNullOrUndefined, observeAttribute$ } from "dgp-ng-app";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";

@Component({
    selector: "dgp-gl-splitter",
    template: `
        <ng-container *ngIf="isVertical">
            <div class="lm_splitter lm_vertical"
                 [style.height.px]="size">
                <div class="lm_drag_handle"
                     [style.top.px]="handleExcessPos$ | async"
                     [style.height.px]="handleSize$ | async"></div>
            </div>
        </ng-container>

        <ng-container *ngIf="!isVertical">
            <div class="lm_splitter lm_horizontal"
                 [style.width.px]="size">
                <div class="lm_drag_handle"
                     [style.left.px]="handleExcessPos$ | async"
                     [style.width.px]="handleSize$ | async"></div>
            </div>
        </ng-container>
    `
})
export class SplitterComponent implements AfterViewInit {

    dragListener: DragListenerDirective;

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

    ngAfterViewInit(): void {
        this.dragListener = new DragListenerDirective();
        this.dragListener.initProgrammatically(this.element);
    }

    destroy() {
        this.element.remove();
    }

}
