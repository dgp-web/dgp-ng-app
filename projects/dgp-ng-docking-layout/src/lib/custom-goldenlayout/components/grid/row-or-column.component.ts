import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Inject,
    QueryList,
    ViewChildren,
    ViewContainerRef
} from "@angular/core";
import {
    ColumnConfiguration,
    ITEM_CONFIG,
    ItemConfiguration,
    itemDefaultConfig,
    PARENT_ITEM_COMPONENT,
    RowConfiguration
} from "../../types";
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
import { DockingLayoutService } from "../../docking-layout.service";

export interface SplitterComponents {
    before: RowOrColumnContentItemComponent;
    after: RowOrColumnContentItemComponent;
}


@Component({
    selector: "dgp-row-or-column",
    template: `

        <!--<ng-container *ngFor="let itemConfig of config.content">

            <ng-container [ngSwitch]="itemConfig.type">

                <dgp-row-or-column *ngSwitchCase="'row'"
                                   #child>
                    Row
                </dgp-row-or-column>
                <dgp-row-or-column *ngSwitchCase="'column'"
                                   #child>
                    Column
                </dgp-row-or-column>
                <dgp-stack *ngSwitchCase="'stack'"
                           #child>
                    Stack
                </dgp-stack>

            </ng-container>

        </ng-container>-->
    `,
    styles: [`
        :host {
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowOrColumnComponent extends DockingLayoutEngineObject {

    @HostBinding("class.lm_item")
    readonly bindings = true;

    @HostBinding("class.lm_row")
    readonly isRow = this.config.type === "row";

    @HostBinding("class.lm_column")
    readonly isColumn = this.config.type === "column";

    readonly element = $(this.elementRef.nativeElement);
    readonly childElementContainer = this.element;

    public readonly splitterSize = 5;
    public readonly splitterGrabSize = 15;
    public readonly _dimension: string;

    public readonly splitters = new Array<SplitterComponent>();
    private currentSplitterPosition: number = null;
    private currentSplitterMinPosition: number = null;
    private currentSplitterMaxPosition: number = null;
    public layoutManagerUtilities = new LayoutManagerUtilities();

    @ViewChildren("#child")
    contentItems1: QueryList<RowOrColumnContentItemComponent>;

    contentItems: RowOrColumnContentItemComponent[] = [];

    isInitialised = false;


    constructor(
        private readonly dockingLayoutService: DockingLayoutService,
        private readonly viewContainerRef: ViewContainerRef,
        @Inject(ITEM_CONFIG)
        public config: RowConfiguration | ColumnConfiguration,
        @Inject(PARENT_ITEM_COMPONENT)
        public parent: RowOrColumnParentComponent,
        private readonly elementRef: ElementRef<HTMLElement>
    ) {
        super();

        const isColumn = config.type === "column";

        this.config = {...itemDefaultConfig, ...config};
        if (config.content) this.createContentItems(config);

        this.childElementContainer = this.element;
        this._dimension = isColumn ? "height" : "width";
    }

    init(): void {
        if (this.isInitialised === true) return;

        this.contentItems.forEach((item, index) => {
            this.childElementContainer.append(item.element);
            if (index !== this.contentItems.length - 1) {
                const splitter = this.createAndRegisterSplitter(index);
                item.element.after(splitter.element);
            }
        });

        this.isInitialised = true;

    }

    private tryInitIndex(index?: number): number {
        if (index === undefined) index = this.contentItems.length;
        return index;
    }

    /**
     * Add a new contentItem to the Row or Column
     */
    addChild(contentItem: RowOrColumnComponent | StackComponent, index: number, _$suspendResize: boolean) {

        let newItemSize: number;
        let itemSize: number;
        let splitterElement: JQuery<HTMLElement>;

        index = this.tryInitIndex(index);

        if (this.contentItems.length > 0) {
            const contentItemIndex = Math.max(0, index - 1);
            const splitter = this.createAndRegisterSplitter(contentItemIndex);
            splitterElement = splitter.element;

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

        this.contentItems.splice(index, 0, contentItem);

        if (this.config.content === undefined) {
            this.config.content = [];
        }

        this.config.content.splice(index, 0, contentItem.config);
        contentItem.parent = this;

        if (contentItem.parent.isInitialised === true && contentItem.isInitialised === false) {
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
            oldChild.parent = null;
            oldChild.destroy();
        }

        this.contentItems[index] = newChild;
        newChild.parent = this;

        if (newChild.parent.isInitialised === true && newChild.isInitialised === false) {
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

    private createContentItems(config: ItemConfiguration) {
        this.contentItems = config.content.map(x => this.dockingLayoutService.createContentItem(x, this));
    }

    private setSplitterInputs(splitter: SplitterComponent) {
        /**
         * Set ng inputs
         */
        splitter.isVertical = this.isColumn;
        splitter.size = this.splitterSize;
        splitter.grabSize = this.splitterGrabSize < this.splitterSize ? this.splitterSize : this.splitterGrabSize;
    }

    private subscribeToSplitterOutputs(splitter: SplitterComponent) {
        /**
         * Subscribe to ng outputs
         */
        const dragSub = splitter
            .drag$
            .subscribe(x => this.onSplitterDrag(splitter, x.x, x.y));

        const splitterDragStartSubscription = splitter
            .dragStart$
            .subscribe(x => this.onSplitterDragStart(splitter));

        const splitterDragStopSubscription = splitter
            .dragStop$
            .subscribe(() => this.onSplitterDragStop(splitter));

        this.subscriptions.push(dragSub);
        this.subscriptions.push(splitterDragStartSubscription);
        this.subscriptions.push(splitterDragStopSubscription);
    }

    private registerSplitter(splitter: SplitterComponent, contentItemIndex: number) {
        this.splitters.splice(contentItemIndex, 0, splitter);
    }

    private createSplitter(): SplitterComponent {
        const vcRef = this.viewContainerRef;
        const splitterComponentRef = vcRef.createComponent(SplitterComponent);
        const splitter = splitterComponentRef.instance;

        this.setSplitterInputs(splitter);
        this.subscribeToSplitterOutputs(splitter);

        return splitter;
    }

    private createAndRegisterSplitter(contentItemIndex: number): SplitterComponent {
        const splitter = this.createSplitter();
        this.registerSplitter(splitter, contentItemIndex);

        /**
         * Return the created element
         */
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

        const before = this.contentItems[index];
        const after = this.contentItems[index + 1];

        return {before, after};
    }

    private onSplitterDragStart(splitter: SplitterComponent): void {
        this.computeCurrentSplitterPositions(splitter);
    }

    private computeCurrentSplitterPositions(splitter: SplitterComponent) {
        const items = this.getItemsForSplitter(splitter);
        const minSize = 10;

        this.currentSplitterPosition = 0;
        this.currentSplitterMinPosition = -1 * (items.before.element[this._dimension]() - minSize);
        this.currentSplitterMaxPosition = items.after.element[this._dimension]() - minSize;
    }

    private onSplitterDrag(splitter: SplitterComponent, offsetX?: number, offsetY?: number): void {
        const offset = this.isColumn ? offsetY : offsetX;

        if (offset > this.currentSplitterMinPosition && offset < this.currentSplitterMaxPosition) {
            this.currentSplitterPosition = offset;
            splitter.element.css(this.isColumn ? "top" : "left", offset);
        }
    }

    private onSplitterDragStop(splitter: SplitterComponent): void {
        const items = this.getItemsForSplitter(splitter);
        const sizeBefore = items.before.element[this._dimension]();
        const sizeAfter = items.after.element[this._dimension]();
        const splitterPositionInRange = (this.currentSplitterPosition + sizeBefore) / (sizeBefore + sizeAfter);
        const totalRelativeSize = items.before.config[this._dimension] + items.after.config[this._dimension];

        items.before.config[this._dimension] = splitterPositionInRange * totalRelativeSize;
        items.after.config[this._dimension] = (1 - splitterPositionInRange) * totalRelativeSize;

        splitter.element.css({top: 0, left: 0});

        this.layoutManagerUtilities.animFrame(() => this.callDownwards("setSize"));
    }


}
