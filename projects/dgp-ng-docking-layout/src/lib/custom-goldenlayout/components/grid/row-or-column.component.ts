import { ChangeDetectionStrategy, Component, Directive } from "@angular/core";
import { dockingLayoutViewMap } from "../../../docking-layout/views";
import { DockingLayoutService } from "../../docking-layout.service";
import { ColumnConfiguration, ItemConfiguration, itemDefaultConfig, RowConfiguration } from "../../types";
import { LayoutManagerUtilities } from "../../utilities";
import { SplitterComponent } from "../resize/splitter.component";
import { RowOrColumnParentComponent } from "../../models/row-parent-component.model";
import { RowOrColumnContentItemComponent } from "../../models/row-or-column-content-item-component.model";
import { DockingLayoutEngineObject } from "../docking-layout-engine-object";
import { StackComponent } from "../tabs/stack.component";

export interface SplitterComponents {
    before: RowOrColumnContentItemComponent;
    after: RowOrColumnContentItemComponent;
}

export interface Wide {
    width: number;
}

export interface AbsoluteSizes {
    itemSizes: Array<number>;
    additionalPixel: number;
    totalWidth: number;
    totalHeight: number;
}

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class RowOrColumnComponentBase extends DockingLayoutEngineObject {

    public readonly element: JQuery<HTMLElement>;
    public readonly splitterSize: number;
    public readonly splitterGrabSize: number;
    public readonly _dimension: string;
    public readonly splitters = new Array<SplitterComponent>();

    public childElementContainer: JQuery<HTMLElement>;
    private splitterPosition: number = null;
    private splitterMinPosition: number = null;
    private splitterMaxPosition: number = null;
    public layoutManagerUtilities = new LayoutManagerUtilities();

    contentItems: RowOrColumnContentItemComponent[] = [];

    isInitialised = false;
    isRow = false;
    isColumn = false;
    isStack = false;
    config: RowConfiguration | ColumnConfiguration;

    constructor(
        isColumn: boolean,
        public dockingLayoutService: DockingLayoutService,
        config: RowConfiguration | ColumnConfiguration,
        public parent: RowOrColumnParentComponent
    ) {
        super();

        this.config = {...itemDefaultConfig, ...config};
        if (config.content) this.createContentItems(config);

        this.isRow = !isColumn;
        this.isColumn = isColumn;

        this.element = $(dockingLayoutViewMap.rowOrColumn.render({isColumn}));
        this.childElementContainer = this.element;
        this.splitterSize = dockingLayoutService.config.dimensions.borderWidth;
        this.splitterGrabSize = dockingLayoutService.config.dimensions.borderGrabWidth;
        this._dimension = isColumn ? "height" : "width";
    }

    init(): void {
        if (this.isInitialised === true) return;

        for (let i = 0; i < this.contentItems.length; i++) {
            this.childElementContainer.append(this.contentItems[i].element);
        }

        this.isInitialised = true;

        for (let i = 0; i < this.contentItems.length - 1; i++) {
            this.contentItems[i].element.after(this.createSplitter(i).element);
        }
    }

    /**
     * Add a new contentItem to the Row or Column
     */
    addChild(contentItem: RowOrColumnComponentBase | StackComponent, index: number, _$suspendResize: boolean) {

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
        const removedItemSize = contentItem.config[this._dimension],

            splitterIndex = Math.max(index - 1, 0);
        let childItem: RowOrColumnContentItemComponent;

        if (index === -1) {
            throw new Error("Can't remove child. ContentItem is not child of this Row or Column");
        }

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
            this.parent.removeChild(this, undefined);
        }

        if (this.contentItems.length === 1 && this.config.isClosable === true) {
            childItem = this.contentItems[0];
            this.contentItems = [];
            this.parent.replaceChild(this, childItem as RowOrColumnComponentBase, true);
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

        // TODO this doesn't update the config... refactor to leave item nodes untouched after creation
        if (newChild.parent.isInitialised === true && newChild.isInitialised === false) {
            if (!newChild.isStack) newChild.init();
        }

        this.callDownwards("setSize");
        newChild.config[this._dimension] = size;
        this.callDownwards("setSize");
    }

    /**
     * Called whenever the dimensions of this item or one of its parents change
     */
    setSize() {
        if (this.contentItems.length > 0) {
            this.calculateRelativeSizes();
            this.setAbsoluteSizes();
        }
        this.emit("resize");
    }

    /**
     * Turns the relative sizes calculated by calculateRelativeSizes into
     * absolute pixel values and applies them to the children's DOM elements
     *
     * Assigns additional pixels to counteract Math.floor
     */
    private setAbsoluteSizes(): void {
        const sizeData = this.calculateAbsoluteSizes();

        for (let i = 0; i < this.contentItems.length; i++) {
            if (sizeData.additionalPixel - i > 0) {
                sizeData.itemSizes[i]++;
            }

            if (this.isColumn) {
                this.contentItems[i].element.width(sizeData.totalWidth);
                this.contentItems[i].element.height(sizeData.itemSizes[i]);
            } else {
                this.contentItems[i].element.width(sizeData.itemSizes[i]);
                this.contentItems[i].element.height(sizeData.totalHeight);
            }
        }
    }

    /**
     * Calculates the absolute sizes of all the children of this Item.
     */
    private calculateAbsoluteSizes(): AbsoluteSizes {
        let i: number,
            totalSplitterSize = (this.contentItems.length - 1) * this.splitterSize,
            totalWidth = this.element.width(),
            totalHeight = this.element.height(),
            totalAssigned = 0,
            additionalPixel: number,
            itemSize: number,
            itemSizes = new Array<number>();

        if (this.isColumn) {
            totalHeight -= totalSplitterSize;
        } else {
            totalWidth -= totalSplitterSize;
        }

        for (i = 0; i < this.contentItems.length; i++) {
            if (this.isColumn) {
                itemSize = Math.floor(totalHeight * (this.contentItems[i].config.height / 100));
            } else {
                itemSize = Math.floor(totalWidth * (this.contentItems[i].config.width / 100));
            }

            totalAssigned += itemSize;
            itemSizes.push(itemSize);
        }

        additionalPixel = Math.floor((this.isColumn ? totalHeight : totalWidth) - totalAssigned);

        return {
            itemSizes,
            additionalPixel,
            totalWidth,
            totalHeight
        };
    }

    /**
     * Calculates the relative sizes of all children of this Item. The logic
     * is as follows:
     *
     * - Add up the total size of all items that have a configured size
     *
     * - If the total == 100 (check for floating point errors)
     *        Excellent, job done
     *
     * - If the total is > 100,
     *        set the size of items without set dimensions to 1/3 and add this to the total
     *        set the size off all items so that the total is hundred relative to their original size
     *
     * - If the total is < 100
     *        If there are items without set dimensions, distribute the remainder to 100 evenly between them
     *        If there are no items without set dimensions, increase all items sizes relative to
     *        their original size so that they add up to 100
     */
    private calculateRelativeSizes(): void {

        let total = 0;
        const itemsWithoutSetDimension = [],
            dimension = this.isColumn ? "height" : "width";

        this.contentItems.forEach(x => {
            if (x.config[dimension]) {
                total += x.config[dimension];
            } else {
                itemsWithoutSetDimension.push(x);
            }
        });

        const roundedTotal = Math.round(total);

        /**
         * Everything adds up to hundred, all good :-)
         */
        if (roundedTotal === 100) {
            this.respectMinItemWidth();
            return;

            /**
             * Allocate the remaining size to the items without a set dimension
             */
        } else if (roundedTotal < 100 && itemsWithoutSetDimension.length > 0) {
            const itemsWithoutSetDimensionLength = itemsWithoutSetDimension.length;
            itemsWithoutSetDimension.forEach(x => {
                x.config[dimension] = (100 - total) / itemsWithoutSetDimensionLength;
            });
            this.respectMinItemWidth();
            return;

            /**
             * If the total is > 100, but there are also items without a set dimension left, assing 50
             * as their dimension and add it to the total
             *
             * This will be reset in the next step
             */
        } else if (roundedTotal > 100) {
            itemsWithoutSetDimension.forEach(x => {
                x.config[dimension] = 50;
                total += 50;
            });
        }

        /**
         * Set every item's size relative to 100 relative to its size to total
         */
        this.contentItems.forEach(x => {
            x.config[dimension] = (x.config[dimension] / total) * 100;
        });

        this.respectMinItemWidth();
    }

    private respectMinItemWidth(): void {
        const minItemWidth = this.dockingLayoutService.config.dimensions
            ? (this.dockingLayoutService.config.dimensions.minItemWidth || 0)
            : 0;
        let sizeData: AbsoluteSizes = null;
        const entriesOverMin: Array<Wide> = [];
        let totalOverMin = 0;
        let totalUnderMin = 0;
        let remainingWidth = 0;
        let itemSize = 0;
        let contentItem: RowOrColumnContentItemComponent = null;
        let reducePercent: number;
        let reducedWidth: number;
        const allEntries: Array<Wide> = [];
        let entry: Wide;

        if (this.isColumn || !minItemWidth || this.contentItems.length <= 1) return;

        sizeData = this.calculateAbsoluteSizes();

        /**
         * Figure out how much we are under the min item size total and how much room we have to use.
         */
        for (let i = 0; i < this.contentItems.length; i++) {
            contentItem = this.contentItems[i];
            itemSize = sizeData.itemSizes[i];

            if (itemSize < minItemWidth) {
                totalUnderMin += minItemWidth - itemSize;
                entry = {width: minItemWidth};
            } else {
                totalOverMin += itemSize - minItemWidth;
                entry = {width: itemSize};
                entriesOverMin.push(entry);
            }

            allEntries.push(entry);
        }

        /**
         * If there is nothing under min, or there is not enough over to make up the difference, do nothing.
         */
        if (totalUnderMin === 0 || totalUnderMin > totalOverMin) return;

        /**
         * Evenly reduce all columns that are over the min item width to make up the difference.
         */
        reducePercent = totalUnderMin / totalOverMin;
        remainingWidth = totalUnderMin;
        for (let i = 0; i < entriesOverMin.length; i++) {
            entry = entriesOverMin[i];
            reducedWidth = Math.round((entry.width - minItemWidth) * reducePercent);
            remainingWidth -= reducedWidth;
            entry.width -= reducedWidth;
        }

        /**
         * Take anything remaining from the last item.
         */
        if (remainingWidth !== 0) {
            allEntries[allEntries.length - 1].width -= remainingWidth;
        }

        /**
         * Set every item's size relative to 100 relative to its size to total
         */
        for (let i = 0; i < this.contentItems.length; i++) {
            this.contentItems[i].config.width = (allEntries[i].width / sizeData.totalWidth) * 100;
        }
    }

    remove() {
        this.parent.removeChild(this, undefined);
    }

    private createContentItems(config: ItemConfiguration) {
        this.contentItems = config.content.map(x => this.dockingLayoutService.createContentItem(x, this));
    }

    private createSplitter(index: number): SplitterComponent {
        const vcRef = this.dockingLayoutService.getViewContainerRef();
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
            minSize = this.dockingLayoutService.config.dimensions[this.isColumn ? "minItemHeight" : "minItemWidth"];

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


@Component({
    selector: "dgp-row-or-column",
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowOrColumnComponent extends RowOrColumnComponentBase {
}
