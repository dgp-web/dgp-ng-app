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
    Output
} from "@angular/core";
import { Area, AreaSides } from "../models/area.model";
import { isNullOrUndefined, observeAttribute$ } from "dgp-ng-app";
import { DropTarget } from "../models/drop-target.model";
import { ItemConfiguration } from "../types";
import type { RowOrColumnComponent } from "./grid/row-or-column.component";
import { DockingLayoutEngineObject } from "./docking-layout-engine-object";
import { DockingLayoutService } from "../docking-layout.service";

export const ROOT_CONTAINER_ELEMENT = new InjectionToken("rootContainerElement");

export interface RootDropEvent {
    contentItem: any;
    area: Area;
}

@Component({
    selector: "dgp-gl-root",
    template: `
        <!-- <ng-container *ngFor="let itemConfig of config.content">
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
export class RootComponent extends DockingLayoutEngineObject implements AfterViewInit, DropTarget {

    contentItems: RowOrColumnComponent[] = [];

    isInitialised = false;

    @HostBinding("class.lm_item")
    readonly bindings = true;

    readonly element = $(this.elRef.nativeElement);

    @Input()
    config: ItemConfiguration;

    @Output()
    readonly initialized = new EventEmitter<void>();

    @Output()
    readonly dragOver = new EventEmitter<AreaSides>();

    @Output()
    readonly drop = new EventEmitter<RootDropEvent>();

    constructor(
        private readonly dockingLayoutService: DockingLayoutService,
        @Inject(ROOT_CONTAINER_ELEMENT)
        private readonly containerElement: JQuery<HTMLElement>,
        private readonly elRef: ElementRef
    ) {
        super();

    }

    ngAfterViewInit() {
        this.containerElement.append(this.element);
        this.callDownwards("init");
        this.initialized.emit();
    }

    init(): void {

        observeAttribute$(this as RootComponent, "config").subscribe(config => {
            this.contentItems = this.config.content.map(x => this.dockingLayoutService.createContentItem(x, this));
            this.contentItems.forEach(contentItem => {
                this.element.append(contentItem.element);
            });
        });

        this.isInitialised = true;
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

    highlightDropZone(x: number, y: number, area: AreaSides) {
        this.dragOver.emit(area);
    }

    onDrop(contentItem: any, area: Area) {
        this.drop.emit({contentItem, area});
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



}
