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
export class RootComponent extends AbstractContentItemComponent implements AfterViewInit, DropTarget {

    @HostBinding("class.lm_item")
    readonly bindings = true;

    readonly isRoot = true;
    readonly type = "root";
    public element: JQuery;
    public childElementContainer: any;
    public _containerElement: any;

    constructor(
        @Inject(forwardRef(() => DockingLayoutService))
        public layoutManager: DockingLayoutService,
        @Inject(ROOT_CONFIG)
        public config,
        @Inject(ROOT_CONTAINER_ELEMENT)
        public containerElement,
        private readonly elRef: ElementRef
    ) {
        super(layoutManager, config, containerElement);
    }

    ngAfterViewInit() {
        this.element = $(this.elRef.nativeElement);
        this.childElementContainer = this.element;
        this._containerElement = this.containerElement;
        this._containerElement.append(this.element);

        this.callDownwards("init");

        this.layoutManager.registerInitialization();
    }

    addChild(contentItem) {
        if (this.contentItems.length > 0) {
            throw new Error("Root node can only have a single child");
        }

        this.childElementContainer.append(contentItem.element);

        super.addChild(contentItem);
        this.setSize();

        this.emitBubblingEvent("stateChanged");
    }

    setSize(width?: number, height?: number) {
        if (isNullOrUndefined(this.element)) return;

        width = (typeof width === "undefined") ? this._containerElement.width() : width;
        height = (typeof height === "undefined") ? this._containerElement.height() : height;

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
        this.layoutManager.tabDropPlaceholder.remove();
        super.highlightDropZone(x, y, area);
    }

    _$onDrop(contentItem: AbstractContentItemComponent, area: Area) {
        let stack;

        if (contentItem.isComponent) {
            stack = this.layoutManager.createContentItem({
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
                const rowOrColumn = this.layoutManager.createContentItem({type}, this);
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

}
