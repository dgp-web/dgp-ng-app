import {stripHtmlTags} from "../../common/functions";
import {Vector2, Vector2Utils} from "../../common/models";
import {dockingLayoutViewMap} from "../../docking-layout/views";
import {$x} from "../../jquery-extensions";
import {DockingLayoutService} from "../docking-layout.service";
import {DragEvent, DragListenerDirective} from "./drag-listener.directive";
import {AbstractContentItemComponent} from "./abstract-content-item.component";
import {Area} from "../models/area.model";
import {Subscription} from "rxjs";
import {Component, forwardRef, Inject, InjectionToken} from "@angular/core";

export const DRAG_PROXY_COORDINATES = new InjectionToken<Vector2>("dragProxyCoordinates");
export const DRAG_PROXY_DRAG_LISTENER = new InjectionToken<DragListenerDirective>("dragProxyDragListener");
export const DRAG_PROXY_CONTENT_ITEM = new InjectionToken<DragListenerDirective>("dragProxyContentItem");
export const DRAG_PROXY_ORIGINAL_PARENT = new InjectionToken<DragListenerDirective>("dragProxyOriginalParent");

@Component({
    selector: "dgp-drag-proxy",
    template: ``
})
export class DragProxyComponent {
    private subscriptions: Subscription[] = [];

    private area: Area = null;
    private lastValidArea: Area = null;
    $element;
    _sided;
    childElementContainer;

    private min: Vector2;
    private max: Vector2;
    private size: Vector2;

    constructor(
        @Inject(DRAG_PROXY_COORDINATES)
        private readonly coordinates: Vector2,
        @Inject(DRAG_PROXY_DRAG_LISTENER)
        private readonly dragListener: DragListenerDirective,
        @Inject(forwardRef(() => DockingLayoutService))
        private readonly dockingLayoutService: DockingLayoutService,
        @Inject(DRAG_PROXY_CONTENT_ITEM)
        private readonly contentItem: AbstractContentItemComponent,
        @Inject(DRAG_PROXY_ORIGINAL_PARENT)
        private readonly originalParent: AbstractContentItemComponent
    ) {

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
            .attr("title", stripHtmlTags(this.contentItem.config.title));
        this.$element.find(".lm_title")
            .html(this.contentItem.config.title);
        this.childElementContainer = this.$element.find(".lm_content");
        this.childElementContainer.append(contentItem.element);

        this.updateTree();
        this.dockingLayoutService.calculateItemAreas();
        this.setDimensions();

        $(document.body)
            .append(this.$element);

        const offset = this.dockingLayoutService.container.offset();

        this.min = {
            x: offset.left, y: offset.top
        };

        this.max = {
            x: this.dockingLayoutService.container.width() + this.min.x,
            y: this.dockingLayoutService.container.height() + this.min.y
        };

        this.size = {
            x: this.$element.width(),
            y: this.$element.height(),
        };

        this.setDropPosition(coordinates);
    }

    private onDrag = (dragEvent: DragEvent) => {
        const coordinates = $x.getPointerCoordinates(dragEvent.event);
        const isWithinContainer = Vector2Utils.isWithinRectangle(coordinates, this.min, this.max);

        if (!isWithinContainer && this.dockingLayoutService.config.settings.constrainDragToContainer === true) {
            return;
        }

        this.setDropPosition(coordinates);
    };

    private setDropPosition(coordinates: Vector2) {
        this.$element.css({left: coordinates.x, top: coordinates.y});
        this.area = this.dockingLayoutService.getArea(coordinates.x, coordinates.y);

        if (this.area !== null) {
            this.lastValidArea = this.area;
            this.area.contentItem.highlightDropZone(coordinates.x, coordinates.y, this.area);
        }
    }

    private onDrop = () => {
        this.dockingLayoutService.dropTargetIndicator.hide();
        if (this.area !== null) {
            this.area.contentItem._$onDrop(this.contentItem, this.area);
        } else if (this.lastValidArea !== null) {
            this.lastValidArea.contentItem._$onDrop(this.contentItem, this.lastValidArea);
        } else if (this.originalParent) {
            this.originalParent.addChild(this.contentItem);
        } else {
            this.contentItem.destroy();
        }

        this.$element.remove();
        this.dockingLayoutService.emit("itemDropped", this.contentItem);
        this.dockingLayoutService.updateSize();
    };

    private updateTree() {

        if (this.contentItem.parent) {
            this.contentItem.parent.removeChild(this.contentItem, true);
        }

        this.contentItem._$setParent(this as any); // TODO
    }

    private setDimensions() {
        const dimensions = this.dockingLayoutService.config.dimensions;

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
