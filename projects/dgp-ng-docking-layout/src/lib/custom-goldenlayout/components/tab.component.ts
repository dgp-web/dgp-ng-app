import { Subscription } from "rxjs";
import { Vector2 } from "../../common/models";
import { dockingLayoutViewMap } from "../../docking-layout/views";
import { DragListenerDirective } from "./drag-listener.directive";
import { DragProxy } from "./drag-proxy.component";
import { AbstractContentItemComponent } from "./abstract-content-item.component";

/**
 * Represents an individual tab within a Stack's header
 */
export class TabComponent {

    private subscriptions: Subscription[] = [];

    element: JQuery<HTMLElement>;
    private isActive: boolean;
    private _layoutManager: any;
    private _dragListener: DragListenerDirective;
    private _onTabClickFn: any;
    private rawElement: HTMLElement;

    constructor(
        private readonly header: any,
        readonly contentItem: AbstractContentItemComponent
    ) {

        this.element = $(
            dockingLayoutViewMap.tab.render({
                title: contentItem.config.title
            })
        );
        this.rawElement = this.element[0];
        this.isActive = false;

        this._layoutManager = this.contentItem.layoutManager;

        if (
            this._layoutManager.config.settings.reorderEnabled === true &&
            contentItem.config.reorderEnabled === true
        ) {
            this._dragListener = new DragListenerDirective(this.element);
            const dragStartSubscription = this._dragListener
                .dragStart$
                .subscribe(x => this._onDragStart(x));
            this.subscriptions.push(dragStartSubscription);
            this.contentItem.on("destroy", this._dragListener.destroy, this._dragListener);
        }

        this._onTabClickFn = (x) => this._onTabClick(x);

        this.rawElement.addEventListener("mousedown", this._onTabClickFn, {
            passive: true
        });
        this.rawElement.addEventListener("touchstart", this._onTabClickFn, {
            passive: true
        });

        (this.contentItem as any).tab = this;
        this.contentItem.emit("tab", this);
        this.contentItem.layoutManager.emit("tabCreated", this);

        if (this.contentItem.isComponent) {
            (this.contentItem as any).container.tab = this;
            (this.contentItem as any).container.emit("tab", this);
        }
    }

    /**
     * Sets this tab's active state. To programmatically
     * switch tabs, use header.setActiveContentItem( item ) instead.
     */
    setActive(isActive: boolean) {
        if (isActive === this.isActive) {
            return;
        }
        this.isActive = isActive;

        if (isActive) {
            this.element.addClass("lm_active");
        } else {
            this.element.removeClass("lm_active");
        }

        // modified
        if (isActive) {
            this.element.find("a")
                .addClass("active");
        } else {
            this.element.find("a")
                .removeClass("active");
        }
    }

    destroy() {

        this.subscriptions.forEach(x => x.unsubscribe());

        this.rawElement.removeEventListener("mousedown", this._onTabClickFn);
        this.rawElement.removeEventListener("touchstart", this._onTabClickFn);

        if (this._dragListener) {
            this.contentItem.off("destroy", this._dragListener.destroy, this._dragListener);
            this._dragListener = null;
        }
        this.element.remove();
    }

    _onDragStart(coordinates: Vector2) {
        // tslint:disable-next-line:no-unused-expression
        new DragProxy(
            coordinates,
            this._dragListener,
            this._layoutManager,
            this.contentItem,
            this.header.parent
        );
    }

    _onTabClick(event) {
        if (event.button === 0 || event.type === "touchstart") {
            const activeContentItem = this.header.parent.getActiveContentItem();
            if (this.contentItem !== activeContentItem) {
                this.header.parent.setActiveContentItem(this.contentItem);
            }
        }
    }

}
