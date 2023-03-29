import { dockingLayoutViewMap } from "../../../docking-layout/views";
import { DragListenerDirective } from "../drag-and-drop/drag-listener.directive";
import { verticalClassName } from "../../constants/class-names/vertical-class-name.constant";
import { horizontalClassName } from "../../constants/class-names/horizontal-class-name.constant";
import { AfterViewInit, Component, ElementRef, Input } from "@angular/core";
import { isNullOrUndefined, observeAttribute$ } from "dgp-ng-app";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";

@Component({
    selector: "dgp-gl-splitter",
    template: `
        <ng-container *ngIf="isVertical">
            TEST
            <div class="lm_splitter lm_horizontal"
                 [style.height.px]="size">
                <div class="lm_drag_handle"
                     [style.top.px]="handleExcessPos$ | async"
                     [style.height.px]="handleSize$ | async"></div>
            </div>
        </ng-container>

        <ng-container *ngIf="!isVertical">
            TEST 01
            <div class="lm_splitter lm_vertical"
                 [style.widh.px]="size">
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
    readonly isVertical$ = observeAttribute$(this as SplitterComponent, "isVertical");

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
        private readonly elementRef: ElementRef<HTMLElement>,
        /*        @Inject(IS_SPLITTER_VERTICAL) isVertical: boolean,
                @Inject(SPLITTER_SIZE) size: number,
                @Inject(SPLITTER_GRAB_SIZE) grabSize: number*/
    ) {
        /*        this.size = size;
                this.grabSize = grabSize < size ? size : grabSize;
                this.isVertical = isVertical;*/
        /*

                this.element = this.createElement();

                this.dragListener = new DragListenerDirective();
                this.dragListener.initProgrammatically(this.element);
        */

    }

    ngAfterViewInit(): void {
        this.dragListener = new DragListenerDirective();
        this.dragListener.initProgrammatically(this.element);
    }

    destroy() {
        this.element.remove();
    }

    private createElement() {
        const dragHandle = $(
            dockingLayoutViewMap.dragHandle.render()
        );
        const element = $(
            dockingLayoutViewMap.splitter.render()
        );
        element.append(dragHandle);

        const handleExcessSize = this.grabSize - this.size;
        const handleExcessPos = handleExcessSize / 2;

        if (this.isVertical) {
            dragHandle.css("top", -handleExcessPos);
            dragHandle.css("height", this.size + handleExcessSize);
            element.addClass(verticalClassName);
            element.height(this.size);
        } else {
            dragHandle.css("left", -handleExcessPos);
            dragHandle.css("width", this.size + handleExcessSize);
            element.addClass(horizontalClassName);
            element.width(this.size);
        }

        return element;
    }

}
