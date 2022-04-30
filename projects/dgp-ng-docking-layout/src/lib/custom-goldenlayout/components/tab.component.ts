import {ChangeDetectionStrategy, Component, EventEmitter, Inject, InjectionToken, Output} from "@angular/core";
import {Subscription} from "rxjs";
import {stripHtmlTags} from "../../common/functions";
import {Vector2} from "../../common/models";
import {dockingLayoutViewMap} from "../../docking-layout/views";
import {DragListenerDirective} from "./drag-listener.directive";
import {DragProxyComponent} from "./drag-proxy.component";
import {AbstractContentItemComponent} from "./abstract-content-item.component";
import {HeaderComponent} from "./header.component";
import {DockingLayoutService} from "../docking-layout.service";


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

    private titleElement: JQuery;
    private closeElement: JQuery;
    private isActive: boolean;
    private dragListener: DragListenerDirective;
    private rawElement: HTMLElement;

    @Output()
    readonly selected = new EventEmitter();

    private readonly onTabClickFn: ClickHandler<any> = (x) => this.onTabClick(x);
    private readonly onCloseClickFn: ClickHandler<any> = (x) => this.onCloseClick(x);

    element: JQuery;

    constructor(
        private readonly dockingLayoutService: DockingLayoutService,
        @Inject(TAB_HEADER_REF)
        private readonly header: HeaderComponent,
        @Inject(TAB_CONTENT_ITEM_REF)
        private readonly contentItem: AbstractContentItemComponent) {

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

    setActive(isActive: boolean) {
        if (isActive === this.isActive) return;
        this.isActive = isActive;

        if (isActive) {
            this.element.addClass("lm_active");
            this.element.find("a").addClass("active");
        } else {
            this.element.removeClass("lm_active");
            this.element.find("a").removeClass("active");
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

    private onDragStart(coordinates: Vector2) {
        // tslint:disable-next-line:no-unused-expression
        new DragProxyComponent(
            coordinates,
            this.dragListener,
            this.dockingLayoutService,
            this.contentItem,
            this.header.parent
        );
    }

    private onTabClick(event: Event) {
        this.selected.emit();
    }

    private setTitle(title: string) {
        this.element.attr("title", stripHtmlTags(title));
        this.titleElement.append(title);
    }

    private onCloseClick(event: Event) {
        event.stopPropagation();
        // TODO: Output
        this.header.parent.removeChild(this.contentItem);
    }

    onCloseMousedown(event: Event) {
        event.stopPropagation();
    }

}
