import { ChangeDetectionStrategy, Component, EventEmitter, Inject, InjectionToken, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { stripHtmlTags } from "../../common/functions";
import { Vector2 } from "../../common/models";
import { dockingLayoutViewMap } from "../../docking-layout/views";
import { DragListenerDirective } from "./drag-listener.directive";
import { DragProxy } from "./drag-proxy.component";
import { AbstractContentItemComponent } from "./abstract-content-item.component";
import { HeaderComponent } from "./header.component";
import { DockingLayoutService } from "../docking-layout.service";

export abstract class JQueryComponent {

    private readonly element: JQuery;

}


/**
 * Represents an individual tab within a Stack's header
 */

export const TAB_HEADER_REF = new InjectionToken("tabHeaderRef");
export const TAB_CONTENT_ITEM_REF = new InjectionToken("tabContentItemRef");

export type ClickHandler<TEvent> = (event: TEvent) => void;

@Component({
    selector: "dgp-tab",
    template: `
        <!-- <li class="lm_tab nav-item">
             <a class="lm_title nav-link">
                 <button type="button"
                         class="close"
                         aria-label="Close"
                         style="cursor:pointer;margin-left:16px;">
                     <span aria-hidden="true">&times;</span>
                 </button>
             </a>
         </li>-->
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent {

    private subscriptions: Subscription[] = [];

<<<<<<< HEAD
    private header: HeaderComponent;
    private contentItem: AbstractContentItemComponent;
    element: JQuery;
    private titleElement: JQuery;
    private closeElement: JQuery;
    private isActive: boolean;
    private dragListener: DragListenerDirective;
    private onTabClickFn: ClickHandler<any>;
    private onCloseClickFn: ClickHandler<any>;
    private rawElement: HTMLElement;

    @Output()
    readonly selected = new EventEmitter();
=======
    private header: any;
    private contentItem: any;
    element: any;
    private titleElement: any;
    private closeElement: any;
    private isActive: any;
    private _layoutManager: any;
    private _dragListener: DragListenerDirective;
    private _onTabClickFn: any;
    private _onCloseClickFn: any;
    private rawElement: any;
>>>>>>> 96811564682502886854e7309f0b59c14fd4101f

    @Output()
    readonly selected = new EventEmitter();

    constructor(
        private readonly dockingLayoutService: DockingLayoutService,
        @Inject(TAB_HEADER_REF)
            header,
        @Inject(TAB_CONTENT_ITEM_REF)
            contentItem) {

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

<<<<<<< HEAD
        this.onTabClickFn = (x) => this.onTabClick(x);
        this.onCloseClickFn = (x) => this.onCloseClick(x);
=======
        this._onTabClickFn = (x) => this.onTabClick(x);
        this._onCloseClickFn = (x) => this._onCloseClick(x);
>>>>>>> 96811564682502886854e7309f0b59c14fd4101f

        this.rawElement.addEventListener("mousedown", this.onTabClickFn, {
            passive: true
        });
        this.rawElement.addEventListener("touchstart", this.onTabClickFn, {
            passive: true
        });

        if (this.contentItem.config.isClosable) {
            this.closeElement.on("click touchstart", this.onCloseClickFn);
            this.closeElement.on("mousedown", this.onCloseMousedown);
        } else {
            this.closeElement.remove();
        }

        this.contentItem.tab = this;
        this.contentItem.emit("tab", this);
        this.dockingLayoutService.emit("tabCreated", this);

        if (this.contentItem.isComponent) {
            this.contentItem.container.tab = this;
            this.contentItem.container.emit("tab", this);
        }
    }

    setTitle(title) {
        this.element.attr("title", stripHtmlTags(title));
        this.titleElement.append(title);
    }

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

        this.closeElement.off("click touchstart", this.onCloseClickFn);
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

<<<<<<< HEAD
    private onTabClick(event: Event) {
=======
    /**
     * Callback when the tab is clicked
     */
    private onTabClick(event) {
>>>>>>> 96811564682502886854e7309f0b59c14fd4101f
        this.selected.emit();
    }

    onCloseClick(event: Event) {
        event.stopPropagation();
        // TODO: Output
        this.header.parent.removeChild(this.contentItem);
    }

    onCloseMousedown(event: Event) {
        event.stopPropagation();
    }

}
