import { dockingLayoutViewMap } from "../../docking-layout/views";
import { AbstractContentItemComponent } from "./abstract-content-item.component";
import { ChangeDetectionStrategy, Component, forwardRef, Inject, InjectionToken } from "@angular/core";
import { DockingLayoutService } from "../docking-layout.service";
import { AreaSides } from "../models/area.model";

export const ROOT_CONFIG = new InjectionToken("rootConfig");
export const ROOT_CONTAINER_ELEMENT = new InjectionToken("rootContainerElement");

@Component({
    selector: "dgp-gl-root",
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent extends AbstractContentItemComponent {
    isRoot: boolean;
    type: any;
    public element: any;
    public childElementContainer: any;
    public _containerElement: any;

    constructor(
        @Inject(forwardRef(() => DockingLayoutService))
        public layoutManager: DockingLayoutService,
        @Inject(ROOT_CONFIG)
        public config,
        @Inject(ROOT_CONTAINER_ELEMENT)
        public containerElement
    ) {
        super(layoutManager, config, containerElement);

        this.isRoot = true;
        this.type = "root";
        this.element = $(
            dockingLayoutViewMap.root.render()
        );
        this.childElementContainer = this.element;
        this._containerElement = containerElement;
        this._containerElement.append(this.element);

        this.callDownwards("_$init");
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

    _$onDrop(contentItem, area) {
        let stack;

        if (contentItem.isComponent) {
            stack = this.layoutManager.createContentItem({
                type: "stack",
                header: contentItem.config.header || {}
            }, this);
            stack._$init();
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
            if (!(column.isRow || column.isColumn) || column.type !== type) { // TODO: move this type here
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

}
