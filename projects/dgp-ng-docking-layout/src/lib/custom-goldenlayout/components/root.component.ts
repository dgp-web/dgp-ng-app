import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Inject,
    InjectionToken,
    Input,
    OnInit,
    Output
} from "@angular/core";
import { DockingLayoutService } from "../docking-layout.service";
import { Area, AreaSides } from "../models/area.model";
import { isNullOrUndefined } from "dgp-ng-app";
import { DropTarget } from "../models/drop-target.model";
import { ItemConfiguration } from "../types";
import type { RowOrColumnComponent } from "./grid/row-or-column.component";
import { DockingLayoutEngineObject } from "./docking-layout-engine-object";
import type { StackComponent } from "./tabs/stack.component";

export const ROOT_CONTAINER_ELEMENT = new InjectionToken("rootContainerElement");

@Component({
    selector: "dgp-gl-root",
    template: `
        <!--        <ng-container *ngFor="let itemConfig of config.content">
                    <dgp-row-or-column [ngSwitch]="itemConfig.type === 'row'">Row</dgp-row-or-column>
                    <dgp-row-or-column [ngSwitch]="itemConfig.type === 'column'">Column</dgp-row-or-column>
                </ng-container>-->
    `,
    styles: [`
        :host {
            position: relative;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent extends DockingLayoutEngineObject implements OnInit, AfterViewInit, DropTarget {

    contentItems: RowOrColumnComponent[];

    isInitialised = false;

    @HostBinding("class.lm_item")
    readonly bindings = true;

    readonly element = $(this.elRef.nativeElement);

    @Input()
    config: ItemConfiguration;

    @Output()
    readonly initialized = new EventEmitter<void>();

    constructor(
        readonly dockingLayoutService: DockingLayoutService,
        @Inject(ROOT_CONTAINER_ELEMENT)
        private readonly containerElement: JQuery<HTMLElement>,
        private readonly elRef: ElementRef
    ) {
        super();

    }

    ngOnInit(): void {
        this.contentItems = this.config.content.map(x => this.dockingLayoutService.createContentItem(x, this));
    }

    init(): void {
        this.contentItems.forEach(contentItem => {
            this.element.append(contentItem.element);
        });

        this.isInitialised = true;
    }

    ngAfterViewInit() {
        this.containerElement.append(this.element);
        this.callDownwards("init");
        this.initialized.emit();
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

    onDrop(contentItem: any, area: Area) {
        let stack: StackComponent;

        if (contentItem.isComponent) {
            stack = this.dockingLayoutService.createContentItem({
                type: "stack"
            }, this);
            stack.init();
            stack.addChild(contentItem);
            contentItem = stack;
        }

        const type = area.side[0] === "x" ? "row" : "column";
        const dimension = area.side[0] === "x" ? "width" : "height";
        const insertBefore = area.side[1] === "2";
        const column = this.contentItems[0];

        if (column.config.type !== type) {
            const rowOrColumn = this.dockingLayoutService.createContentItem<RowOrColumnComponent>({type}, this);
            this.replaceChild(column, rowOrColumn);
            rowOrColumn.addChild(contentItem, insertBefore ? 0 : undefined, true);
            rowOrColumn.addChild(column, insertBefore ? undefined : 0, true);
            column.config[dimension] = 50;
            contentItem.config[dimension] = 50;
            rowOrColumn.callDownwards("setSize");
        } else {
            const sibling = column.contentItems[insertBefore ? 0 : column.contentItems.length - 1];
            column.addChild(contentItem, insertBefore ? 0 : undefined, true);
            sibling.config[dimension] *= 0.5;
            contentItem.config[dimension] = sibling.config[dimension];
            column.callDownwards("setSize");
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
            contentItem: this
        };
    }

    // TODO: Easy
    removeChild(contentItem: RowOrColumnComponent, keepChild?: boolean) {
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

    replaceChild(oldChild: RowOrColumnComponent, newChild: RowOrColumnComponent, destroyOldChild?: boolean) {
        const index = this.contentItems.indexOf(oldChild);
        const parentNode = oldChild.element[0].parentNode;

        parentNode.replaceChild(newChild.element[0], oldChild.element[0]);

        if (destroyOldChild === true) {
            oldChild.parent = null;
            oldChild.destroy();
        }

        this.contentItems[index] = newChild;
        newChild.parent = this;

        if (newChild.parent.isInitialised && newChild.isInitialised === false) {
            newChild.init();
        }

        this.callDownwards("setSize");
    }

    destroy() {
        this.callDownwards("destroy", [], true, true);
        this.element.remove();
    }

}
