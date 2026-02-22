import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnInit,
    QueryList,
    ViewChildren,
    ViewContainerRef
} from "@angular/core";
import { ColumnConfiguration, ItemConfiguration, itemDefaultConfig, RowConfiguration } from "../../types";
import { LayoutManagerUtilities } from "../../utilities";
import { SplitterComponent } from "../resize/splitter.component";
import { RowOrColumnParentComponent } from "../../models/row-parent-component.model";
import { RowOrColumnContentItemComponent } from "../../models/row-or-column-content-item-component.model";
import { DockingLayoutEngineObject } from "../docking-layout-engine-object";
import type { StackComponent } from "../tabs/stack.component";
import { Many } from "data-modeling";
import { calculateAbsoluteSizes } from "../../functions/grid/calculate-absolute-sizes.function";
import { AbsoluteSizes } from "../../model/grid/absolute-sizes.model";
import { calculateRelativeSizes } from "../../functions/grid/calculate-relative-sizes.function";

export interface SplitterComponents {
    before: RowOrColumnContentItemComponent;
    after: RowOrColumnContentItemComponent;
}


@Component({
    selector: "dgp-row-or-column",
    template: `

        <!--  /**
         * TEMPLATE_BASED: Comment-in
         */ -->
       <!-- <ng-container *ngFor="let itemConfig of config.content">

            <ng-container [ngSwitch]="itemConfig.type">

                <ng-container *ngSwitchCase="'row'">
                    Row
                    <dgp-row-or-column [config]="itemConfig"
                                       [parent]="getParent()"
                                       #child>

                    </dgp-row-or-column>
                </ng-container>
                <ng-container *ngSwitchCase="'column'">
                    Column
                    <dgp-row-or-column [config]="itemConfig"
                                       [parent]="getParent()"
                                       #child>

                    </dgp-row-or-column>
                </ng-container>
                <ng-container *ngSwitchCase="'stack'">
                    Stack
                    <dgp-stack [config]="itemConfig"
                               #child>

                    </dgp-stack>
                </ng-container>
                <ng-container *ngSwitchCase="'component'">
                    Component
                    <dgp-gl-component #child
                                      [config]="itemConfig"
                                      [isHidden]="false"></dgp-gl-component>
                </ng-container>

            </ng-container>

        </ng-container>-->
    `,
    styles: [`
        :host {
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class RowOrColumnComponent extends DockingLayoutEngineObject implements OnInit, AfterViewInit {

    @HostBinding("class.lm_item")
    readonly bindings = true;

    isRow: boolean;

    isColumn: boolean;

    readonly element = $(this.elementRef.nativeElement);
    childElementContainer = this.element;

    public splitterSize: number;
    public splitterGrabSize: number;
    public _dimension: string;

    public readonly splitters = new Array<SplitterComponent>();
    private splitterPosition: number = null;
    private splitterMinPosition: number = null;
    private splitterMaxPosition: number = null;
    public layoutManagerUtilities = new LayoutManagerUtilities();

    @ViewChildren("child")
    contentItems1: QueryList<RowOrColumnContentItemComponent>;

    contentItems: RowOrColumnContentItemComponent[] = [];

    isInitialised = false;

    @Input()
    config: RowConfiguration | ColumnConfiguration;

    @Input()
    parent: RowOrColumnParentComponent;


    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly elementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    getParent() {
        return this;
    }

    init(): void {
        if (this.isInitialised === true) return;


        const isColumn = this.config.type === "column";

        if (isColumn) {
            this.element.addClass("lm_column");
            this.isColumn = true;
            this.isRow = false;
        } else {
            this.element.addClass("lm_row");
            this.isColumn = false;
            this.isRow = true;
        }

        this.config = {...itemDefaultConfig, ...this.config};

        this.childElementContainer = this.element;
        this.splitterSize = 5;
        this.splitterGrabSize = 15;
        this._dimension = isColumn ? "height" : "width";

        /*this.contentItems.forEach((item, index) => {
            this.childElementContainer.append(item.element);
            if (index !== this.contentItems.length - 1) {
                item.element.after(this.createSplitter(index).element);
            }
        });*/

        this.isInitialised = true;

    }

    ngOnInit() {
        /**
         * TEMPLATE_BASED: Comment-in
         */
        // this.init();
    }

    ngAfterViewInit(): void {

        /**
         * TEMPLATE_BASED: Comment-in
         */
         // this.contentItems = this.contentItems1.toArray();


        this.contentItems.forEach((item, index) => {
            this.childElementContainer.append(item.element);
            if (index !== this.contentItems.length - 1) {
                item.element.after(this.createSplitter(index).element);
            }
        });
    }

    /**
     * Add a new contentItem to the Row or Column
     *
     * NOTE: This is not called initially but only when items are added at a later point (e.g. via drag-and-drop) when
     * the layout is already set up.
     */
    addChild(contentItem: RowOrColumnComponent | StackComponent, index: number, _$suspendResize: boolean) {

        let newItemSize: number,
            itemSize: number,
            splitterElement: JQuery<HTMLElement>;

        if (index === undefined) {
            index = this.contentItems.length;
        }

        if (this.contentItems.length > 0) {
            splitterElement = this.createSplitter(Math.max(0, index - 1)).element;

            if (index > 0) {
                this.contentItems[index - 1].element.after(splitterElement);
                splitterElement.after(contentItem.element);
            } else {
                this.contentItems[0].element.before(splitterElement);
                splitterElement.before(contentItem.element);
            }
        } else {
            this.childElementContainer.append(contentItem.element);
        }


        if (index === undefined) {
            index = this.contentItems.length;
        }

        this.contentItems.splice(index, 0, contentItem);

        if (this.config.content === undefined) {
            this.config.content = [];
        }

        this.config.content.splice(index, 0, contentItem.config);

        if (contentItem.config.type !== "stack") {
            (contentItem as RowOrColumnComponent).parent = this;
        }

        if (contentItem.isInitialised === false) {
            contentItem.init();
        }

        newItemSize = (1 / this.contentItems.length) * 100;

        if (_$suspendResize === true) {
            return;
        }

        for (let i = 0; i < this.contentItems.length; i++) {
            if (this.contentItems[i] === contentItem) {
                contentItem.config[this._dimension] = newItemSize;
            } else {
                itemSize = this.contentItems[i].config[this._dimension] *= (100 - newItemSize) / 100;
                this.contentItems[i].config[this._dimension] = itemSize;
            }
        }

        this.callDownwards("setSize");

    }

    /**
     * Removes a child of this element
     */
    removeChild(contentItem: RowOrColumnContentItemComponent, keepChild: boolean) {
        let index = this.layoutManagerUtilities.indexOf(contentItem, this.contentItems);
        const removedItemSize = contentItem.config[this._dimension];
        const splitterIndex = Math.max(index - 1, 0);
        let childItem: RowOrColumnContentItemComponent;

        /**
         * Remove the splitter before the item or after if the item happens
         * to be the first in the row/column
         */
        if (this.splitters[splitterIndex]) {
            this.splitters[splitterIndex].destroy();
            this.splitters.splice(splitterIndex, 1);
        }

        /**
         * Allocate the space that the removed item occupied to the remaining items
         */
        for (let i = 0; i < this.contentItems.length; i++) {
            if (this.contentItems[i] !== contentItem) {
                this.contentItems[i].config[this._dimension] += removedItemSize / (this.contentItems.length - 1);
            }
        }


        index = this.contentItems.indexOf(contentItem);

        if (keepChild !== true) {
            this.contentItems[index].destroy();
        }

        this.contentItems.splice(index, 1);

        this.config.content.splice(index, 1);

        if (this.contentItems.length > 0) {
            this.callDownwards("setSize");

        } else if (this.config.isClosable === true) {
            if (this.parent.config.type === "column" || this.parent.config.type === "row") {
                (this.parent as RowOrColumnComponent).removeChild(this, undefined);
            }
        }

        if (this.contentItems.length === 1 && this.config.isClosable === true) {
            childItem = this.contentItems[0];
            this.contentItems = [];
            this.parent.replaceChild(this, childItem as RowOrColumnComponent);
        } else {
            this.callDownwards("setSize");
        }
    }

    destroy() {
        this.unsubscribe();
        this.callDownwards("destroy", [], true, true);
        this.element.remove();
    }

    /**
     * Replaces a child of this Row or Column with another contentItem
     */
    replaceChild(oldChild: RowOrColumnContentItemComponent, newChild: RowOrColumnContentItemComponent, destroyOldChild?: boolean) {
        const size = oldChild.config[this._dimension];

        const index = this.contentItems.indexOf(oldChild);
        const parentNode = oldChild.element[0].parentNode;

        parentNode.replaceChild(newChild.element[0], oldChild.element[0]);

        if (destroyOldChild === true) {
            if (oldChild.config.type !== "stack") {
                (oldChild as RowOrColumnComponent).parent = null;
            }

            oldChild.destroy();
        }

        this.contentItems[index] = newChild;

        if (newChild.config.type !== "stack") {
            (newChild as RowOrColumnComponent).parent = this;
        }

        if (newChild.isInitialised === false) {
            newChild.init();
        }

        newChild.config[this._dimension] = size;
        this.callDownwards("setSize");
    }

    setSize() {
        this.calculateRelativeSizes();
        this.setAbsoluteSizes();
    }

    /**
     * Turns the relative sizes calculated by calculateRelativeSizes into
     * absolute pixel values and applies them to the children's DOM elements
     *
     * Assigns additional pixels to counteract Math.floor
     */
    private setAbsoluteSizes(): void {
        const sizeData = this.calculateAbsoluteSizes();

        this.contentItems.forEach((item, index) => {
            if (sizeData.additionalPixel - index > 0) {
                sizeData.itemSizes[index]++;
            }

            if (this.isColumn) {
                item.element.width(sizeData.totalWidth);
                item.element.height(sizeData.itemSizes[index]);
            } else {
                item.element.width(sizeData.itemSizes[index]);
                item.element.height(sizeData.totalHeight);
            }
        });
    }

    private calculateAbsoluteSizes(): AbsoluteSizes {
        return calculateAbsoluteSizes({
            itemConfigs: this.contentItems.map(x => x.config),
            isColumn: this.isColumn,
            element: this.element,
            splitterSize: this.splitterSize
        });
    }

    private calculateRelativeSizes(): void {
        let configs = this.contentItems.map(x => x.config) as Many<ItemConfiguration>;
        configs = calculateRelativeSizes({
            itemConfigs: configs,
            isColumn: this.isColumn,
            splitterSize: this.splitterSize,
            element: this.element,
            minItemWidth: 10
        });
        configs.forEach((item, index) => {
            this.contentItems[index].config = item as any;
        });
    }

    remove() {
        if (this.parent.config.type === "column" || this.parent.config.type === "row") {
            (this.parent as RowOrColumnComponent).removeChild(this, undefined);
        }
    }

    private createSplitter(index: number): SplitterComponent {
        const vcRef = this.viewContainerRef;
        const splitterComponentRef = vcRef.createComponent(SplitterComponent);
        const splitter = splitterComponentRef.instance;

        splitter.isVertical = this.isColumn;
        splitter.size = this.splitterSize;
        splitter.grabSize = this.splitterGrabSize < this.splitterSize ? this.splitterSize : this.splitterGrabSize;

        const dragSub = splitter
            .drag$
            .subscribe(x => this.onSplitterDrag(splitter, x.x, x.y));

        this.subscriptions.push(dragSub);

        const splitterDragStartSubscription = splitter
            .dragStart$
            .subscribe(x => this.onSplitterDragStart(splitter));

        this.subscriptions.push(splitterDragStartSubscription);

        const splitterDragStopSubscription = splitter
            .dragStop$
            .subscribe(() => this.onSplitterDragStop(splitter));

        this.subscriptions.push(splitterDragStopSubscription);

        this.splitters.splice(index, 0, splitter);
        return splitter;
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

    private onSplitterDragStart(splitter: SplitterComponent): void {
        const items = this.getItemsForSplitter(splitter),
            minSize = 10;

        const beforeMinSize = 0;
        const afterMinSize = 0;

        this.splitterPosition = 0;
        this.splitterMinPosition = -1 * (items.before.element[this._dimension]() - (beforeMinSize || minSize));
        this.splitterMaxPosition = items.after.element[this._dimension]() - (afterMinSize || minSize);
    }

    private onSplitterDrag(splitter: SplitterComponent, offsetX?: number, offsetY?: number): void {
        const offset = this.isColumn ? offsetY : offsetX;

        if (offset > this.splitterMinPosition && offset < this.splitterMaxPosition) {
            this.splitterPosition = offset;
            splitter.element.css(this.isColumn ? "top" : "left", offset);
        }
    }

    private onSplitterDragStop(splitter: SplitterComponent): void {
        const items = this.getItemsForSplitter(splitter),
            sizeBefore = items.before.element[this._dimension](),
            sizeAfter = items.after.element[this._dimension](),
            splitterPositionInRange = (this.splitterPosition + sizeBefore) / (sizeBefore + sizeAfter),
            totalRelativeSize = items.before.config[this._dimension] + items.after.config[this._dimension];

        items.before.config[this._dimension] = splitterPositionInRange * totalRelativeSize;
        items.after.config[this._dimension] = (1 - splitterPositionInRange) * totalRelativeSize;

        splitter.element.css({top: 0, left: 0});

        this.layoutManagerUtilities.animFrame(() => this.callDownwards("setSize"));
    }


}
