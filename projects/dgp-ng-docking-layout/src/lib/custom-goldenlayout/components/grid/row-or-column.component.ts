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
import { timer } from "rxjs";

export interface SplitterComponents {
    before: RowOrColumnContentItemComponent;
    after: RowOrColumnContentItemComponent;
}


@Component({
    selector: "dgp-row-or-column",
    template: `

        <!--<ng-container *ngFor="let itemConfig of config.content; let i = index; let last = isLast;">

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

            <ng-container *ngIf="!last">
                <dgp-gl-splitter [isVertical]="isColumn"
                                 [size]="splitterSize"></dgp-gl-splitter>

            </container>

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
    private readonly _dimension: "width" | "height" = this.isColumn ? "height" : "width";

    readonly element = $(this.elementRef.nativeElement);
    childElementContainer = this.element;

    public readonly splitterSize = 5;

    private readonly splitters = new Array<SplitterComponent>();

    private currentSplitterPosition: number = null;
    private currentSplitterMinPosition: number = null;
    private currentSplitterMaxPosition: number = null;

    @ViewChildren("#child")
    contentItems1: QueryList<RowOrColumnContentItemComponent>;

    @ViewChildren("#child1")
    splitters1: QueryList<SplitterComponent>;

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

        this.initStep0();
    }

    initStep0() {
        this.config = {...itemDefaultConfig, ...this.config};
        if (this.config.content) this.createContentItems(this.config);

        this.childElementContainer = this.element;
    }

    init(): void {
        if (this.isInitialised === true) return;

        this.contentItems.forEach((item, index) => {
            this.childElementContainer.append(item.element);

            /**
             * If not last item
             */
            if (index !== this.contentItems.length - 1) {
                this.addSplitterBeforeItem(item, index);
            }
        });

        this.isInitialised = true;
    }

    private addSplitterBeforeItem(item: RowOrColumnContentItemComponent, index: number) {
        const splitter = this.createAndRegisterSplitter(index);
        item.element.after(splitter.element);
    }

    private tryInitIndex(index?: number): number {
        if (index === undefined) index = this.contentItems.length;
        return index;
    }

    private addContentItemToView(contentItem: RowOrColumnComponent | StackComponent, index: number) {
        if (this.contentItems.length > 0) {
            const contentItemIndex = Math.max(0, index - 1);
            const splitter = this.createAndRegisterSplitter(contentItemIndex);
            const splitterElement = splitter.element;

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
    }

    private registerContentItem(contentItem: RowOrColumnComponent | StackComponent, index: number) {
        this.contentItems.splice(index, 0, contentItem);

        /**
         * Set inputs
         */
        if (this.config.content === undefined) this.config.content = [];
        this.config.content.splice(index, 0, contentItem.config);
    }

    private linkWithParentItemAndInit(contentItem: RowOrColumnComponent | StackComponent) {
        /**
         * Link with parent and init
         */
        contentItem.parent = this;

        if (contentItem.parent.isInitialised === true && contentItem.isInitialised === false) {
            contentItem.init();
        }
    }

    /**
     * Add a new contentItem to the Row or Column
     */
    addChild(newContentItem: RowOrColumnComponent | StackComponent, index: number) {
        index = this.tryInitIndex(index);

        this.addContentItemToView(newContentItem, index);
        this.registerContentItem(newContentItem, index);
        this.linkWithParentItemAndInit(newContentItem);
    }

    private tryRemoveSplitter(contentItemIndex: number) {
        const splitterIndex = Math.max(contentItemIndex - 1, 0);
        /**
         * Remove the splitter before the item or after if the item happens
         * to be the first in the row/column
         */
        if (this.splitters[splitterIndex]) {
            this.removeSplitter(splitterIndex);
        }
    }

    private removeSplitter(splitterIndex: number) {
        this.splitters[splitterIndex].destroy();
        this.splitters.splice(splitterIndex, 1);

    }

    private resizeAfterRemovingItem(contentItem: RowOrColumnContentItemComponent) {
        const removedItemSize = contentItem.config[this._dimension];
        for (let i = 0; i < this.contentItems.length; i++) {
            if (this.contentItems[i] !== contentItem) {
                this.contentItems[i].config[this._dimension] += removedItemSize / (this.contentItems.length - 1);
            }
        }
    }

    private destroyAndUnregisterItem(index: number) {
        this.contentItems[index].destroy();
        this.contentItems.splice(index, 1);
        this.config.content.splice(index, 1);
    }

    private tryRemoveSelfIfEmpty() {
        if (this.contentItems.length !== 0) return;
        if (!(this.parent.config.type === "column" || this.parent.config.type === "row")) return;

        (this.parent as RowOrColumnComponent).removeChild(this);
    }

    /**
     * Removes a child of this element
     */
    removeChild(contentItem: RowOrColumnContentItemComponent) {
        const index = this.contentItems.indexOf(contentItem);

        this.tryRemoveSplitter(index);
        this.resizeAfterRemovingItem(contentItem);
        this.destroyAndUnregisterItem(index);

        this.tryRemoveSelfIfEmpty();

        this.callDownwards("setSize");

    }

    destroy() {
        this.unsubscribe();
        this.callDownwards("destroy", [], true, true);
        this.element.remove();
    }

    private tryInitContentItem(contentItem: RowOrColumnContentItemComponent) {
        if (contentItem.parent.isInitialised === true && contentItem.isInitialised === false) {
            contentItem.init();
        }
    }

    private copySizeToNewChild(oldChild: RowOrColumnContentItemComponent, newChild: RowOrColumnContentItemComponent) {
        const size = oldChild.config[this._dimension];
        newChild.config[this._dimension] = size;
    }

    private replaceRegisteredChild(oldChild: RowOrColumnContentItemComponent, newChild: RowOrColumnContentItemComponent) {
        const index = this.contentItems.indexOf(oldChild);
        this.contentItems[index] = newChild;
    }

    private replaceChildInView(oldChild: RowOrColumnContentItemComponent, newChild: RowOrColumnContentItemComponent) {
        const parentNode = oldChild.element[0].parentNode;
        parentNode.replaceChild(newChild.element[0], oldChild.element[0]);
    }

    private setAsOwnChild(newChild: RowOrColumnContentItemComponent) {
        newChild.parent = this;
    }

    /**
     * Replaces a child of this Row or Column with another contentItem
     */
    replaceChild(oldChild: RowOrColumnContentItemComponent, newChild: RowOrColumnContentItemComponent) {
        this.replaceChildInView(oldChild, newChild);
        this.replaceRegisteredChild(oldChild, newChild);
        this.setAsOwnChild(newChild);
        this.tryInitContentItem(newChild);
        this.copySizeToNewChild(oldChild, newChild);

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

    private createContentItems(config: ItemConfiguration) {
        this.contentItems = config.content.map(x => this.dockingLayoutService.createContentItem(x, this));
    }

    private setSplitterInputs(splitter: SplitterComponent) {
        /**
         * Set ng inputs
         */
        splitter.isVertical = this.isColumn;
        splitter.size = this.splitterSize;
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

        timer(0).subscribe(() => {
            this.callDownwards("setSize");
        });
    }


}
