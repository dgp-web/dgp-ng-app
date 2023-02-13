import { Directive, EventEmitter, Output } from "@angular/core";
import { Vector2, Vector2Utils } from "../../common/models";
import { $x } from "../../jquery-extensions";

export interface DragEvent extends Vector2 {
    event: any;
}


/*@Directive({
    selector: "dgp-drag-listener"
})*/
@Directive()
export class DragListenerDirective {

    constructor(element: any) {
        this.element = element[0];
        this.$element = $(element);
        this.$body = $(document.body);

        this.element.addEventListener("touchstart", this.onMouseDown, {passive: true});
        this.element.addEventListener("mousedown", this.onMouseDown, {passive: true});

    }

    @Output()
    readonly dragStart$ = new EventEmitter<Vector2>();
    @Output()
    readonly dragStop$ = new EventEmitter<{}>();
    @Output()
    readonly drag$ = new EventEmitter<DragEvent>();

    private element: any;
    private $element: JQuery;
    private $body: any;
    private timeout: number;

    private delay = 200;

    /**
     * The distance the mouse needs to be moved to qualify as a drag
     */
    private distance = 10; // TODO - works better with delay only

    private coordinates: Vector2 = {
        x: 0, y: 0
    };

    private originalCoordinates: Vector2 = {
        x: 0, y: 0
    };

    private isDragging = false;

    on: any;

    destroy() {
        this.element.removeEventListener("touchstart", this.onMouseDown);
        this.element.removeEventListener("mousedown", this.onMouseDown);

        document.removeEventListener("mouseup", this.onMouseUp);
        document.removeEventListener("touchend", this.onMouseUp);

        this.$element = null;
        this.$body = null;
    }

    onMouseDown = (e: MouseEvent) => {

        if (e.button === 0 || e.type === "touchstart") {
            this.originalCoordinates = $x.getPointerCoordinates(e);

            document.addEventListener("mousemove", this.onMouseMove, {
                passive: true
            });
            document.addEventListener("mouseup", this.onMouseUp, {
                passive: true
            });
            this.timeout = setTimeout(() => this.startDragging(), this.delay);
        }
    };

    onMouseMove = (e: MouseEvent) => {
        if (this.timeout != null) {

            const coordinates = $x.getPointerCoordinates(e);

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
                    x: this.coordinates.x, y: this.coordinates.y, event: e
                });

            }
        }
    };

    onMouseUp = () => {
        if (this.timeout != null) {
            clearTimeout(this.timeout);
            this.$body.removeClass("lm_dragging");
            this.$element.removeClass("lm_dragging");

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
        this.$body.addClass("lm_dragging");
        this.$element.addClass("lm_dragging");

        this.dragStart$.emit(this.originalCoordinates);
    }

}
