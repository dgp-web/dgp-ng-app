import { Subscription } from "rxjs";
import { Vector2 } from "../../common/models";
import { dockingLayoutViewMap } from "../../docking-layout/views";
import { DragListenerDirective } from "./drag-listener.directive";
import { DragProxy } from "./drag-proxy.component";
import { AbstractContentItemComponent } from "./abstract-content-item.component";
import { HeaderComponent } from "./header.component";

/**
 * Represents an individual tab within a Stack's header
 */
export class TabComponent {

    private subscriptions: Subscription[] = [];

    readonly element = $(
        dockingLayoutViewMap.tab.render({
            title: this.contentItem.config.title
        })
    );
    private rawElement = this.element[0];
    private readonly dockingLayoutService = this.contentItem.layoutManager;
    private isActive = false;
    private dragListener: DragListenerDirective;
    private readonly onTabClickFn: (event) => void;

    constructor(
        private readonly header: HeaderComponent,
        readonly contentItem: AbstractContentItemComponent
    ) {

        if (
            this.dockingLayoutService.config.settings.reorderEnabled === true &&
            contentItem.config.reorderEnabled === true
        ) {
            this.dragListener = new DragListenerDirective(this.element);
            const dragStartSubscription = this.dragListener
                .dragStart$
                .subscribe(x => this.onDragStart(x));
            this.subscriptions.push(dragStartSubscription);
            this.contentItem.on("destroy", this.dragListener.destroy, this.dragListener);
        }

        this.onTabClickFn = (x) => this.onTabClick(x);

        this.rawElement.addEventListener("mousedown", this.onTabClickFn, {
            passive: true
        });
        this.rawElement.addEventListener("touchstart", this.onTabClickFn, {
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
        if (isActive === this.isActive) return;
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

        this.rawElement.removeEventListener("mousedown", this.onTabClickFn);
        this.rawElement.removeEventListener("touchstart", this.onTabClickFn);

        if (this.dragListener) {
            this.contentItem.off("destroy", this.dragListener.destroy, this.dragListener);
            this.dragListener = null;
        }
        this.element.remove();
    }

    onDragStart(coordinates: Vector2) {
        // tslint:disable-next-line:no-unused-expression
        new DragProxy(
            coordinates,
            this.dragListener,
            this.dockingLayoutService,
            this.contentItem,
            this.header.parent
        );
    }

    onTabClick(event) {
        if (event.button === 0 || event.type === "touchstart") {
            const activeContentItem = this.header.parent.getActiveContentItem();
            if (this.contentItem !== activeContentItem) {
                this.header.parent.setActiveContentItem(this.contentItem);
            }
        }
    }

}
