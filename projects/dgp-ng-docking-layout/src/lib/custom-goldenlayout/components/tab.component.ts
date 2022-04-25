import { Subscription } from "rxjs";
import { stripHtmlTags } from "../../common/functions";
import { Vector2 } from "../../common/models";
import { dockingLayoutViewMap } from "../../docking-layout/views";
import { DragListenerDirective } from "./drag-listener.directive";
import { DragProxy } from "./drag-proxy.component";
import { ChangeDetectionStrategy, Component } from "@angular/core";

export abstract class JQueryComponent {

    private readonly element: JQuery;

}

/**
 * Represents an individual tab within a Stack's header
 */
@Component({
    selector: "dgp-tab",
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent {

    private subscriptions: Subscription[] = [];

    private header: any;
    private contentItem: any;
    private element: any;
    private titleElement: any;
    private closeElement: any;
    private isActive: any;
    private _layoutManager: any;
    private _dragListener: DragListenerDirective;
    private _onTabClickFn: any;
    private _onCloseClickFn: any;
    private rawElement: any;

    constructor(header, contentItem) {

        this.header = header;
        this.contentItem = contentItem;
        this.element = $(
            dockingLayoutViewMap.tab.render()
        );
        this.rawElement = this.element[0];
        this.titleElement = this.element.find(".lm_title");
        this.closeElement = this.element.find(".close");
        this.closeElement[contentItem.config.isClosable ? "show" : "hide"]();
        this.isActive = false;

        this.setTitle(contentItem.config.title);
        this.contentItem.on("titleChanged", this.setTitle, this);

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
        this._onCloseClickFn = (x) => this._onCloseClick(x);

        this.rawElement.addEventListener("mousedown", this._onTabClickFn, {
            passive: true
        });
        this.rawElement.addEventListener("touchstart", this._onTabClickFn, {
            passive: true
        });

        if (this.contentItem.config.isClosable) {
            this.closeElement.on("click touchstart", this._onCloseClickFn);
            this.closeElement.on("mousedown", this._onCloseMousedown);
        } else {
            this.closeElement.remove();
        }

        this.contentItem.tab = this;
        this.contentItem.emit("tab", this);
        this.contentItem.layoutManager.emit("tabCreated", this);

        if (this.contentItem.isComponent) {
            this.contentItem.container.tab = this;
            this.contentItem.container.emit("tab", this);
        }
    }

    /**
     * Sets the tab's title to the provided string and sets
     * its title attribute to a pure text representation (without
     * html tags) of the same string.
     */
    setTitle(title) {
        this.element.attr("title", stripHtmlTags(title));
        this.titleElement.append(title);
        // this.titleElement.html( title );
    }

    /**
     * Sets this tab's active state. To programmatically
     * switch tabs, use header.setActiveContentItem( item ) instead.
     */
    setActive(isActive) {
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

    /**
     * Destroys the tab
     */
    _$destroy() {

        this.subscriptions.forEach(x => x.unsubscribe());

        this.rawElement.removeEventListener("mousedown", this._onTabClickFn);
        this.rawElement.removeEventListener("touchstart", this._onTabClickFn);

        this.closeElement.off("click touchstart", this._onCloseClickFn);
        if (this._dragListener) {
            this.contentItem.off("destroy", this._dragListener.destroy, this._dragListener);
            this._dragListener = null;
        }
        this.element.remove();
    }

    /**
     * Callback for the DragListener
     */
    _onDragStart(coordinates: Vector2) {
        if (this.contentItem.parent.isMaximised === true) {
            this.contentItem.parent.toggleMaximise();
        }
        // tslint:disable-next-line:no-unused-expression
        new DragProxy(
            coordinates,
            this._dragListener,
            this._layoutManager,
            this.contentItem,
            this.header.parent
        );
    }

    /**
     * Callback when the tab is clicked
     */
    _onTabClick(event) {
        // left mouse button or tap
        if (event.button === 0 || event.type === "touchstart") {
            const activeContentItem = this.header.parent.getActiveContentItem();
            if (this.contentItem !== activeContentItem) {
                this.header.parent.setActiveContentItem(this.contentItem);
            }

            // middle mouse button
        } else if (event.button === 1 && this.contentItem.config.isClosable) {
            this._onCloseClick(event);
        }
    }

    /**
     * Callback when the tab's close button is
     * clicked
     */
    _onCloseClick(event) {
        event.stopPropagation();
        this.header.parent.removeChild(this.contentItem);
    }


    /**
     * Callback to capture tab close button mousedown
     * to prevent tab from activating.
     */
    _onCloseMousedown(event) {
        event.stopPropagation();
    }

}
