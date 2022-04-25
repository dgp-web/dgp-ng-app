import { stripHtmlTags } from "../../common/functions";
import { Vector2, Vector2Utils } from "../../common/models";
import { dockingLayoutViewMap } from "../../docking-layout/views";
import { $x } from "../../jquery-extensions";
import { DockingLayoutService } from "../docking-layout.service";
import { EventEmitter } from "../utilities/event-emitter";
import { DragEvent, DragListenerDirective } from "./drag-listener.directive";

/**
 * This class creates a temporary container
 * for the component whilst it is being dragged
 * and handles drag events
 */
export class DragProxy extends EventEmitter {

    _area = null;
    _lastValidArea = null;
    $element;
    _sided;
    childElementContainer;

    private min: Vector2;
    private max: Vector2;
    private size: Vector2;

    constructor(private readonly coordinates: Vector2,
                private readonly dragListener: DragListenerDirective,
                private readonly layoutManager: DockingLayoutService,
                private readonly contentItem: any,
                private readonly originalParent: any) {
        super();

        const dragSub = this.dragListener
            .drag$
            .subscribe(this.onDrag);

        this.subscriptions.push(dragSub);

        const dragStopSubscription = this.dragListener
            .dragStop$
            .subscribe(this.onDrop);

        this.subscriptions.push(dragStopSubscription);

        this.$element = $(dockingLayoutViewMap.dragProxy.render());

        if (originalParent && originalParent._side) {
            this._sided = originalParent._sided;
            this.$element.addClass("lm_" + originalParent._side);
            if (["right", "bottom"].indexOf(originalParent._side) >= 0) {
                this.$element.find(".lm_content")
                    .after(this.$element.find(".lm_header"));
            }
        }

        $x.position(this.$element, coordinates);
        this.$element.find(".lm_tab")
            .attr("title", stripHtmlTags(this.contentItem.config.label));
        this.$element.find(".lm_title")
            .html(this.contentItem.config.label);
        this.childElementContainer = this.$element.find(".lm_content");
        this.childElementContainer.append(contentItem.element);

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
        this._area = this.layoutManager.getArea(coordinates.x, coordinates.y);

        if (this._area !== null) {
            this._lastValidArea = this._area;
            this._area.contentItem.highlightDropZone(coordinates.x, coordinates.y, this._area);
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
        if (this._area !== null) {
            this._area.contentItem._$onDrop(this.contentItem, this._area);

            /**
             * No valid drop area available at present, but one has been found before.
             * Use it
             */
        } else if (this._lastValidArea !== null) {
            this._lastValidArea.contentItem._$onDrop(this.contentItem, this._lastValidArea);

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

        this.contentItem._$setParent(this);
    }

    /**
     * Updates the Drag Proxie's dimensions
     */
    private setDimensions() {
        const dimensions = this.layoutManager.config.dimensions;

        let width = dimensions.dragProxyWidth;
        let height = dimensions.dragProxyHeight;

        $x.size(this.$element, {x: width, y: height});

        width -= (this._sided ? dimensions.headerHeight : 0);
        height -= (!this._sided ? dimensions.headerHeight : 0);

        $x.size(this.childElementContainer, {x: width, y: height});
        $x.size(this.contentItem.element, {x: width, y: height});

        this.contentItem.callDownwards("_$show");
        this.contentItem.callDownwards("setSize");
    }

}
