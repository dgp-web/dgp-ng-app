import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit, QueryList, ViewChildren } from "@angular/core";
import { ColumnConfiguration, itemDefaultConfig, RowConfiguration } from "../../types";
import { SplitterComponent } from "../resize/splitter.component";
import { RowOrColumnContentItemComponent } from "../../models/row-or-column-content-item-component.model";
import { Store } from "@ngrx/store";
import { removeChildOfRowOrCol } from "../../store/actions/remove-child-of-row-or-col.action";
import { trackByItemId } from "../../constants/track-by-item-id.function";


export interface SplitterComponents {
    before: RowOrColumnContentItemComponent;
    after: RowOrColumnContentItemComponent;
}


@Component({
    selector: "dgp-row-or-column",
    template: `

        @if (true) {

            <ng-container *ngFor="let itemConfig of config.content; let last = last; trackBy: trackByItemId">

                <ng-container [ngSwitch]="itemConfig.type">

                    <ng-container *ngSwitchCase="'row'">
                        <dgp-row-or-column [config]="itemConfig"
                                           #child>

                        </dgp-row-or-column>
                    </ng-container>
                    <ng-container *ngSwitchCase="'column'">
                        <dgp-row-or-column [config]="itemConfig"
                                           #child>

                        </dgp-row-or-column>
                    </ng-container>
                    <ng-container *ngSwitchCase="'stack'">
                        <dgp-stack [config]="itemConfig"
                                   #child>

                        </dgp-stack>
                    </ng-container>
                    <ng-container *ngSwitchCase="'component'">
                        <dgp-gl-component #child
                                          [config]="itemConfig"
                                          [isHidden]="false"></dgp-gl-component>
                    </ng-container>

                </ng-container>

                @if (!last) {
                    <dgp-gl-splitter #splitter
                                     [grabSize]="splitterGrabSize"
                                     [isVertical]="isColumn"
                                     [size]="splitterSize"
                                     (dragStart$)="onSplitterDragStart(splitter)"
                                     (drag$)="onSplitterDrag(splitter, $event.x, $event.y)"
                                     (dragStop$)="onSplitterDragStop(splitter)"/>
                }

            </ng-container>

        }
    `,
    styles: [`
        :host {
            flex-grow: 1;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class RowOrColumnComponent implements OnInit {

    protected readonly trackByItemId = trackByItemId;

    @HostBinding("class.lm_item")
    readonly bindings = true;

    readonly element = $(this.elementRef.nativeElement);
    public splitterSize: number;
    public splitterGrabSize: number;
    public _dimension: string;

    private splitterPosition: number = null;
    private splitterMinPosition: number = null;
    private splitterMaxPosition: number = null;

    @ViewChildren("child")
    contentItemQueryList: QueryList<RowOrColumnContentItemComponent>;

    @ViewChildren(SplitterComponent)
    splittersQueryList: QueryList<SplitterComponent>;

    get splitters(): SplitterComponent[] {
        return this.splittersQueryList?.toArray() || [];
    }

    get contentItems(): RowOrColumnContentItemComponent[] {
        return this.contentItemQueryList?.toArray() || [];
    }

    @Input()
    config: RowConfiguration | ColumnConfiguration;

    constructor(
        private readonly elementRef: ElementRef<HTMLElement>,
        private readonly store: Store<any>
    ) {
    }

    @HostBinding("style.width.%")
    get getWidth() {
        return +this.config.width;
    }

    @HostBinding("style.height.%")
    get getHeight() {
        return +this.config.height;
    }

    @HostBinding("class.lm_column")
    get isColumn() {
        return this.config.type === "column";
    }

    @HostBinding("class.lm_row")
    get isRow() {
        return this.config.type === "column";
    }

    ngOnInit() {
        this.config = {...itemDefaultConfig, ...this.config};

        this.splitterSize = 5;
        this.splitterGrabSize = 15;
        this._dimension = this.isColumn ? "height" : "width";
    }

    /**
     * Removes a child of this element
     */
    removeChild(contentItem: RowOrColumnContentItemComponent, keepChild: boolean) {

        this.store.dispatch(removeChildOfRowOrCol({
            parentConfig: this.config,
            contentItemConfig: contentItem.config,
            keepChild
        }));
    }

    /**
     * Locates the instance of lm.controls.Splitter in the array of
     * registered splitters and returns a map containing the contentItem
     * before and after the splitters, both of which are affected if the
     * splitter is moved
     */
    private getItemsForSplitter(splitter: SplitterComponent): SplitterComponents {
        const index = this.splitters.indexOf(splitter);

        return {
            before: this.contentItems[index],
            after: this.contentItems[index + 1]
        };
    }

    onSplitterDragStart(splitter: SplitterComponent): void {
        const items = this.getItemsForSplitter(splitter),
            minSize = 10;

        const beforeMinSize = 0;
        const afterMinSize = 0;

        this.splitterPosition = 0;
        this.splitterMinPosition = -1 * (items.before.element[this._dimension]() - (beforeMinSize || minSize));
        this.splitterMaxPosition = items.after.element[this._dimension]() - (afterMinSize || minSize);
    }

    onSplitterDrag(splitter: SplitterComponent, offsetX?: number, offsetY?: number): void {
        const offset = this.isColumn ? offsetY : offsetX;

        if (offset > this.splitterMinPosition && offset < this.splitterMaxPosition) {
            this.splitterPosition = offset;
            splitter.element.css(this.isColumn ? "top" : "left", offset);
        }
    }

    onSplitterDragStop(splitter: SplitterComponent): void {
        const items = this.getItemsForSplitter(splitter),
            sizeBefore = items.before.element[this._dimension](),
            sizeAfter = items.after.element[this._dimension](),
            splitterPositionInRange = (this.splitterPosition + sizeBefore) / (sizeBefore + sizeAfter),
            totalRelativeSize = items.before.config[this._dimension] + items.after.config[this._dimension];

        console.log(this._dimension, sizeBefore, sizeAfter, splitterPositionInRange, totalRelativeSize);

        items.before.config[this._dimension] = splitterPositionInRange * totalRelativeSize;
        items.after.config[this._dimension] = (1 - splitterPositionInRange) * totalRelativeSize;

        splitter.element.css({top: 0, left: 0});
    }
}


