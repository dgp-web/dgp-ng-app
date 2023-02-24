import { Directive, EventEmitter, Output } from "@angular/core";
import { Vector2, Vector2Utils } from "../../common/models";
import { $x } from "../../jquery-extensions";
import { draggingClassName } from "../constants/class-names/dragging-class-name.constant";
import { createPassiveEventListenerOptions } from "../functions/create-passive-event-listener-options.function";
import { DragEvent } from "../models/drag-event.model";
import { createCoordinates } from "../functions/create-coordinates.function";

/*@Directive({
    selector: "dgp-drag-listener"
})*/
@Directive()
export class DragListenerDirective {

    @Output()
    readonly dragStart$ = new EventEmitter<Vector2>();
    @Output()
    readonly dragStop$ = new EventEmitter<{}>();
    @Output()
    readonly drag$ = new EventEmitter<DragEvent>();

    private element: HTMLElement;
    private $body: any;
    private timeout: number;

    private readonly delay = 200;
    private readonly distance = 10;

    private coordinates = createCoordinates();
    private originalCoordinates = createCoordinates();

    private isDragging = false;

    constructor(
        private readonly $element: JQuery<HTMLElement>
    ) {
        this.element = $element[0];
        this.$body = $(document.body);

        this.element.addEventListener("mousedown", this.onMouseDown, createPassiveEventListenerOptions());
    }

    destroy() {
        this.element.removeEventListener("mousedown", this.onMouseDown);
        document.removeEventListener("mouseup", this.onMouseUp);
    }

    onMouseDown = (e: MouseEvent) => {
        if (e.button === 0 || e.type === "touchstart") {
            this.originalCoordinates = $x.getPointerCoordinates(e);

            document.addEventListener("mousemove", this.onMouseMove, createPassiveEventListenerOptions());
            document.addEventListener("mouseup", this.onMouseUp, createPassiveEventListenerOptions());
            this.timeout = setTimeout(() => this.startDragging(), this.delay);
        }
    };

    onMouseMove = (event: MouseEvent) => {
        if (this.timeout != null) {

            const coordinates = $x.getPointerCoordinates(event);

            this.coordinates = Vector2Utils.subtract(coordinates, this.originalCoordinates);

            if (this.isDragging === false) {
                if (
                    Math.abs(this.coordinates.x) > this.distance ||
                    Math.abs(this.coordinates.y) > this.distance
                ) {
                    clearTimeout(this.timeout);
                    this.startDragging();
                }
            }

            if (this.isDragging) {
                this.dragStart$.emit(this.coordinates);
                this.drag$.emit({
                    x: this.coordinates.x,
                    y: this.coordinates.y,
                    event
                });

            }
        }
    };

    onMouseUp = () => {
        if (this.timeout != null) {
            clearTimeout(this.timeout);
            this.$body.removeClass(draggingClassName);
            this.$element.removeClass(draggingClassName);

            document.removeEventListener("mousemove", this.onMouseMove);
            document.removeEventListener("mouseup", this.onMouseUp);

            if (this.isDragging === true) {
                this.isDragging = false;
                this.dragStop$.emit();
            }
        }
    };

    private startDragging(): void {
        this.isDragging = true;
        this.$body.addClass(draggingClassName);
        this.$element.addClass(draggingClassName);

        this.dragStart$.emit(this.originalCoordinates);
    }

}
