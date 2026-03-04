import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Inject,
    InjectionToken,
    Input,
    Output,
    QueryList,
    ViewChildren
} from "@angular/core";
import { Area, AreaSides } from "../models/area.model";
import { DropTarget } from "../models/drop-target.model";
import { ItemConfiguration } from "../types";
import type { RowOrColumnComponent } from "./grid/_row-or-column.component";
import { trackByItemId } from "../constants/track-by-item-id.function";

export const ROOT_CONTAINER_ELEMENT = new InjectionToken("rootContainerElement");

export interface RootDropEvent {
    contentItem: any;
    area: Area;
}

@Component({
    selector: "dgp-gl-root",
    template: `
        <ng-container *ngFor="let itemConfig of config.content; trackBy: trackByItemId">

            <dgp-row-or-column #child
                               [config]="itemConfig"/>

        </ng-container>
    `,
    styles: [`
        :host {
            position: relative;
            width: 100% !important;
            height: 100% !important;;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class RootComponent implements AfterViewInit, DropTarget {

    readonly trackByItemId = trackByItemId;

    @ViewChildren("child")
    contentItemsQueryList: QueryList<RowOrColumnComponent>;

    get contentItems(): RowOrColumnComponent[] {
        return this.contentItemsQueryList?.toArray() || [];
    }

    @HostBinding("class.lm_item")
    readonly bindings = true;

    readonly element = $(this.elRef.nativeElement);

    @Input()
    config: ItemConfiguration;

    @Output()
    readonly dragOver = new EventEmitter<AreaSides>();

    @Output()
    readonly drop = new EventEmitter<RootDropEvent>();

    constructor(
        @Inject(ROOT_CONTAINER_ELEMENT)
        private readonly containerElement: JQuery<HTMLElement>,
        private readonly elRef: ElementRef,
        readonly cd: ChangeDetectorRef
    ) {
    }

    ngAfterViewInit() {
        this.containerElement.append(this.element);
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

}

