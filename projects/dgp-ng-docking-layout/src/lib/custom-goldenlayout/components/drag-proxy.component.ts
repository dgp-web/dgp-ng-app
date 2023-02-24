import { Vector2, Vector2Utils } from "../../common/models";
import { dockingLayoutViewMap } from "../../docking-layout/views";
import { $x } from "../../jquery-extensions";
import { DockingLayoutService } from "../docking-layout.service";
import { EventEmitter } from "../utilities/event-emitter";
import { DragListenerDirective } from "./drag-listener.directive";
import { DragEvent } from "../models/drag-event.model";
import { Area } from "../models/area.model";
import { AbstractContentItemComponent } from "./abstract-content-item.component";
import { DropSegment } from "../models/drop-segment.model";

/**
 * This class creates a temporary container
 * for the component whilst it is being dragged
 * and handles drag events
 */
export class DragProxy extends EventEmitter {

    private area: Area = null;
    private lastValidArea: Area = null;
    private sided: boolean;

    $element: JQuery<HTMLElement>;
    childElementContainer: JQuery<HTMLElement>;

    private min: Vector2;
    private max: Vector2;
    private size: Vector2;

    constructor(private readonly coordinates: Vector2,
                private readonly dragListener: DragListenerDirective,
                private readonly layoutManager: DockingLayoutService,
                private readonly contentItem: AbstractContentItemComponent,
                private readonly originalParent: AbstractContentItemComponent) {
        super();

        const dragSub = this.dragListener
            .drag$
            .subscribe(this.onDrag);

        this.subscriptions.push(dragSub);

        const dragStopSubscription = this.dragListener
            .dragStop$
            .subscribe(this.onDrop);

        this.subscriptions.push(dragStopSubscription);

        this.$element = $(dockingLayoutViewMap.dragProxy.render({
            draggedItem: contentItem.element[0]
        }));

        if (originalParent && originalParent._side) {
            this.sided = originalParent._sided;
            this.$element.addClass("lm_" + originalParent._side);
            if ([DropSegment.Right, DropSegment.Bottom].indexOf(originalParent._side as DropSegment) >= 0) {
                this.$element.find(".lm_content")
                    .after(this.$element.find(".lm_header"));
            }
        }

        $x.position(this.$element, coordinates);
        this.childElementContainer = this.$element.find(".lm_content");

        this.updateTree();
        this.layoutManager.calculateItemAreas();
        this.setDimensions();

        $(document.body)
            .append(this.$element);

        const offset = this.layoutManager.container.offset();

        this.min = {
            x: offset.left, y: offset.top
        };

        this.max = {
            x: this.layoutManager.container.width() + this.min.x,
            y: this.layoutManager.container.height() + this.min.y
        };

        this.size = {
            x: this.$element.width(),
            y: this.$element.height(),
        };

        this.setDropPosition(coordinates);
    }

    /**
     * Callback on every mouseMove event during a drag. Determines if the drag is
     * still within the valid drag area and calls the layoutManager to highlight the
     * current drop area
     */
    private onDrag = (dragEvent: DragEvent) => {

        const coordinates = $x.getPointerCoordinates(dragEvent.event);
        const isWithinContainer = Vector2Utils.isWithinRectangle(coordinates, this.min, this.max);

        if (!isWithinContainer && this.layoutManager.config.settings.constrainDragToContainer === true) {
            return;
        }

        this.setDropPosition(coordinates);
    };

    /**
     * Sets the target position, highlighting the appropriate area
     */
    private setDropPosition(coordinates: Vector2) {
        this.$element.css({left: coordinates.x, top: coordinates.y});
        this.area = this.layoutManager.getArea(coordinates.x, coordinates.y);

        if (this.area !== null) {
            this.lastValidArea = this.area;
            this.area.contentItem.highlightDropZone(coordinates.x, coordinates.y, this.area);
        }
    }

    /**
     * Callback when the drag has finished. Determines the drop area
     * and adds the child to it
     */
    private onDrop = () => {
        this.layoutManager.dropTargetIndicator.hide();

        /*
         * Valid drop area found
         */
        if (this.area !== null) {
            this.area.contentItem._$onDrop(this.contentItem, this.area);

            /**
             * No valid drop area available at present, but one has been found before.
             * Use it
             */
        } else if (this.lastValidArea !== null) {
            this.lastValidArea.contentItem._$onDrop(this.contentItem, this.lastValidArea);

            /**
             * No valid drop area found during the duration of the drag. Return
             * content item to its original position if a original parent is provided.
             * (Which is not the case if the drag had been initiated by createDragSource)
             */
        } else if (this.originalParent) {
            this.originalParent.addChild(this.contentItem);

            /**
             * The drag didn't ultimately end up with adding the content item to
             * any container. In order to ensure clean up happens, destroy the
             * content item.
             */
        } else {
            this.contentItem.destroy();
        }

        this.$element.remove();

        this.layoutManager.emit("itemDropped", this.contentItem);

        this.layoutManager.updateSize();
    };

    /**
     * Removes the item from its original position within the tree
     */
    private updateTree() {

        /**
         * parent is null if the drag had been initiated by a external drag source
         */
        if (this.contentItem.parent) {
            this.contentItem.parent.removeChild(this.contentItem, true);
        }

        this.contentItem._$setParent(this as any);
    }

    /**
     * Updates the Drag Proxie's dimensions
     */
    private setDimensions() {
        const dimensions = this.layoutManager.config.dimensions;

        let width = dimensions.dragProxyWidth;
        let height = dimensions.dragProxyHeight;

        $x.size(this.$element, {x: width, y: height});

        width -= (this.sided ? dimensions.headerHeight : 0);
        height -= (!this.sided ? dimensions.headerHeight : 0);

        $x.size(this.childElementContainer, {x: width, y: height});
        $x.size(this.contentItem.element, {x: width, y: height});

        this.contentItem.callDownwards("show");
        this.contentItem.callDownwards("setSize");
    }

}
