import { AbstractContentItemComponent } from "./shared/abstract-content-item.component";
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    forwardRef,
    HostBinding,
    Inject,
    InjectionToken
} from "@angular/core";
import { DockingLayoutService } from "../docking-layout.service";
import { Area, AreaSides } from "../models/area.model";
import { isNullOrUndefined } from "dgp-ng-app";
import { DropTarget } from "../models/drop-target.model";
import { ItemConfiguration, itemDefaultConfig } from "../types";
import { stateChangedEventType } from "../constants/event-types/state-changed-event-type.constant";
import { ALL_EVENT } from "../constants/event-types/all-event.constant";
import { BubblingEvent, EventEmitter, LayoutManagerUtilities } from "../utilities";
import { goldenLayoutEngineConfig } from "../constants/golden-layout-engine-config.constant";
import { beforeItemDestroyedEventType } from "../constants/event-types/before-item-destroyed-event-type.constant";
import { itemDestroyedEventType } from "../constants/event-types/item-destroyed-event-type.constant";
import { itemCreatedEventType } from "../constants/event-types/item-created-event-type.constant";
import { createItemTypeCreatedEventType } from "../functions/create-item-type-created-event-type.function";

export const ROOT_CONFIG = new InjectionToken("rootConfig");
export const ROOT_CONTAINER_ELEMENT = new InjectionToken("rootContainerElement");

@Component({
    selector: "dgp-gl-root",
    template: ``,
    styles: [`
        :host {
            position: relative;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent extends EventEmitter implements AfterViewInit, DropTarget {

    contentItems: AbstractContentItemComponent[] = [];

    isInitialised = false;

    pendingEventPropagations = {};
    throttledEvents = [stateChangedEventType];

    @HostBinding("class.lm_item")
    readonly bindings = true;

    readonly type = "root";
    public element: JQuery;
    public childElementContainer: JQuery<HTMLElement>;

    constructor(
        @Inject(forwardRef(() => DockingLayoutService))
        readonly dockingLayoutService: DockingLayoutService,
        @Inject(ROOT_CONFIG)
        readonly config: ItemConfiguration,
        @Inject(ROOT_CONTAINER_ELEMENT)
        private readonly containerElement: JQuery<HTMLElement>,
        private readonly elRef: ElementRef
    ) {
        super();

        this.config = {...itemDefaultConfig, ...config};
        this.on(ALL_EVENT, this.propagateEvent, this);
        if (config.content) this.createContentItems(config);
    }

    ngAfterViewInit() {
        this.element = $(this.elRef.nativeElement);
        this.childElementContainer = this.element;
        this.containerElement.append(this.element);

        this.callDownwards("init");

        this.dockingLayoutService.registerInitialization();
    }

    addChild(contentItem: AbstractContentItemComponent) {
        if (this.contentItems.length > 0) {
            throw new Error("Root node can only have a single child");
        }

        this.childElementContainer.append(contentItem.element);

        const index = this.contentItems.length;

        this.contentItems.splice(index, 0, contentItem);

        if (this.config.content === undefined) {
            this.config.content = [];
        }

        this.config.content.splice(index, 0, contentItem.config);
        contentItem.parent = this;

        if (contentItem.parent.isInitialised === true && contentItem.isInitialised === false) {
            contentItem.init();
        }
        this.setSize();

        this.emitBubblingEvent(stateChangedEventType);
    }

    setSize(width?: number, height?: number) {
        if (isNullOrUndefined(this.element)) return;

        width = (typeof width === "undefined") ? this.containerElement.width() : width;
        height = (typeof height === "undefined") ? this.containerElement.height() : height;

        this.element.width(width);
        this.element.height(height);

        /*
         * Root can be empty
         */
        if (this.contentItems[0]) {
            this.contentItems[0].element.width(width);
            this.contentItems[0].element.height(height);
        }
    }

    highlightDropZone(x, y, area: AreaSides) {
        this.dockingLayoutService.tabDropPlaceholder.remove();
        this.dockingLayoutService.dropTargetIndicator.highlightArea(area);
    }

    _$onDrop(contentItem: AbstractContentItemComponent, area: Area) {
        let stack;

        if (contentItem.isComponent) {
            stack = this.dockingLayoutService.createContentItem({
                type: "stack",
                header: contentItem.config.header || {}
            }, this);
            stack.init();
            stack.addChild(contentItem);
            contentItem = stack;
        }

        if (!this.contentItems.length) {
            this.addChild(contentItem);
        } else {
            const type = area.side[0] === "x" ? "row" : "column";
            const dimension = area.side[0] === "x" ? "width" : "height";
            const insertBefore = area.side[1] === "2";
            const column: AbstractContentItemComponent = this.contentItems[0];
            if (!(column.isRow || column.isColumn) || column.config.type !== type) { // TODO: move this type here
                const rowOrColumn = this.dockingLayoutService.createContentItem({type}, this);
                this.replaceChild(column, rowOrColumn);
                rowOrColumn.addChild(contentItem, insertBefore ? 0 : undefined, true);
                rowOrColumn.addChild(column, insertBefore ? undefined : 0, true);
                column.config[dimension] = 50;
                contentItem.config[dimension] = 50;
                rowOrColumn.callDownwards("setSize");
            } else {
                const sibbling = column.contentItems[insertBefore ? 0 : column.contentItems.length - 1];
                column.addChild(contentItem, insertBefore ? 0 : undefined, true);
                sibbling.config[dimension] *= 0.5;
                contentItem.config[dimension] = sibbling.config[dimension];
                column.callDownwards("setSize");
            }
        }
    }

    getArea(element?: JQuery): Area {
        element = element || this.element;

        const offset = element.offset(),
            width = element.width(),
            height = element.height();

        return {
            x1: offset.left,
            y1: offset.top,
            x2: offset.left + width,
            y2: offset.top + height,
            surface: width * height,
            contentItem: this as any
        };
    }

    callDownwards(functionName: string,
                  functionArguments?: any[],
                  bottomUp?: boolean,
                  skipSelf?: boolean) {
        if (bottomUp !== true && skipSelf !== true) {
            this[functionName].apply(this, functionArguments || []);
        }
        for (let i = 0; i < this.contentItems.length; i++) {
            this.contentItems[i].callDownwards(functionName, functionArguments, bottomUp);
        }
        if (bottomUp === true && skipSelf !== true) {
            this[functionName].apply(this, functionArguments || []);
        }
    }

    removeChild(contentItem: AbstractContentItemComponent, keepChild?: boolean) {

        const index = this.contentItems.indexOf(contentItem);

        if (keepChild !== true) {
            this.contentItems[index].destroy();
        }

        this.contentItems.splice(index, 1);

        this.config.content.splice(index, 1);

        if (this.contentItems.length > 0) {
            this.callDownwards("setSize");

        }
    }

    replaceChild(oldChild: AbstractContentItemComponent, newChild: AbstractContentItemComponent, destroyOldChild?: boolean) {

        const index = this.contentItems.indexOf(oldChild);
        const parentNode = oldChild.element[0].parentNode;

        parentNode.replaceChild(newChild.element[0], oldChild.element[0]);

        if (destroyOldChild === true) {
            oldChild.parent = null;
            oldChild.destroy();
        }

        this.contentItems[index] = newChild;
        newChild.parent = this;

        if (newChild.parent.isInitialised === true && newChild.isInitialised === false) {
            newChild.init();
        }

        this.callDownwards("setSize");
    }

    select() {
        if (this.dockingLayoutService.selectedItem !== this) {
            this.dockingLayoutService.selectItem(this, true);
            this.element.addClass(goldenLayoutEngineConfig.cssClasses.selected);
        }
    }

    deselect() {
        if (this.dockingLayoutService.selectedItem === this) {
            this.dockingLayoutService.selectedItem = null;
            this.element.removeClass(goldenLayoutEngineConfig.cssClasses.selected);
        }
    }

    destroy() {
        this.unsubscribe();
        this.emitBubblingEvent(beforeItemDestroyedEventType);
        this.callDownwards("destroy", [], true, true);
        this.element.remove();
        this.emitBubblingEvent(itemDestroyedEventType);
    }

    init(): void {
        for (let i = 0; i < this.contentItems.length; i++) {
            this.childElementContainer.append(this.contentItems[i].element);
        }

        this.isInitialised = true;
        this.emitBubblingEvent(itemCreatedEventType);
        this.emitBubblingEvent(createItemTypeCreatedEventType(this.config.type));
    }

    emitBubblingEvent(name: string) {
        const event = new BubblingEvent(name, this);
        this.emit(name, event);
    }

    private createContentItems(config: ItemConfiguration) {
        this.contentItems = config.content.map(x => this.dockingLayoutService.createContentItem(x, this));
    }

    private propagateEvent(name: string, event: BubblingEvent) {
        if (event instanceof BubblingEvent &&
            event.isPropagationStopped === false &&
            this.isInitialised === true) {
            this.scheduleEventPropagationToLayoutManager(name, event);
        }
    }

    private scheduleEventPropagationToLayoutManager(name: string, event) {
        if (new LayoutManagerUtilities().indexOf(name, this.throttledEvents) === -1) {
            this.dockingLayoutService.emit(name, event.origin);
        } else {
            if (this.pendingEventPropagations[name] !== true) {
                this.pendingEventPropagations[name] = true;
                new LayoutManagerUtilities().animFrame(() => this.propagateEventToLayoutManager(name, event));
            }
        }

    }

    private propagateEventToLayoutManager(name: string, event) {
        this.pendingEventPropagations[name] = false;
        this.dockingLayoutService.emit(name, event);
    }
}
