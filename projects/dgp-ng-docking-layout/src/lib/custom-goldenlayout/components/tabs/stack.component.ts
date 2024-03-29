import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostBinding,
    Inject,
    QueryList,
    ViewChild,
    ViewChildren
} from "@angular/core";
import { DockingLayoutService } from "../../docking-layout.service";
import {
    ComponentConfiguration,
    HeaderConfig,
    ITEM_CONFIG,
    itemDefaultConfig,
    PARENT_ITEM_COMPONENT,
    StackConfiguration
} from "../../types";
import { Subscription } from "rxjs";
import { notNullOrUndefined, observeAttribute$ } from "dgp-ng-app";
import { sides } from "../../constants/sides.constant";
import { DropSegment } from "../../models/drop-segment.model";
import { ContentAreaDimensions } from "../../models/content-area-dimensions.model";
import { lmLeftClassName } from "../../constants/class-names/lm-left-class-name.constant";
import { lmBottomClassName } from "../../constants/class-names/lm-bottom-class-name.constant";
import { lmRightClassName } from "../../constants/class-names/lm-right-class-name.constant";
import { DropTarget } from "../../models/drop-target.model";
import { Area, AreaSides } from "../../models/area.model";
import { GlComponent } from "../component.component";
import { StackParentComponent } from "../../models/stack-parent-component.model";
import { DragProxy } from "../drag-and-drop/drag-proxy.component";
import { DragStartEvent } from "../../models/drag-start-event.model";
import type { RowOrColumnComponent } from "../grid/row-or-column.component";
import { Vector2 } from "../../../common";
import { DragListenerDirective } from "../drag-and-drop/drag-listener.directive";
import { MatTabGroup } from "@angular/material/tabs";
import { DropTargetIndicatorComponent } from "../drag-and-drop/drop-target-indicator.component";
import { TabDropPlaceholderComponent } from "./tab-drop-placeholder.component";

@Component({
    selector: "dgp-stack",
    template: `
        <mat-tab-group *ngIf="hasHeaders"
                       [selectedIndex]="config.activeItemIndex"
                       (selectedIndexChange)="processSelectedContentItemChange($event)">
            <mat-tab *ngFor="let componentConfig of config.content; let i = index;">
                <ng-template mat-tab-label>
                    <div #tabHeader
                         dgpGlDragListener
                         (dragStart$)="onDragStart1($event, componentConfig, i)"
                         class="tab-header">
                        <ng-container *ngIf="componentConfig.componentState.labelTemplate; else textBasedLabel">
                            <ng-container [ngTemplateOutlet]="componentConfig.componentState.labelTemplate()"></ng-container>
                        </ng-container>
                        <ng-template #textBasedLabel>
                            {{componentConfig.title}}
                        </ng-template>
                    </div>
                </ng-template>
            </mat-tab>
        </mat-tab-group>

        <dgp-gl-component *ngFor="let componentConfig of config.content"
                          [config]="componentConfig"
                          [isHidden]="config.activeItemId !== componentConfig.id"
                          (dragStart)="onDragStart(componentConfig.id)"></dgp-gl-component>
    `,
    styles: [`
        :host {
            overflow: auto;
            display: flex;
            flex-direction: column;
        }

        mat-tab-group {
            flex-shrink: 0;
            height: 50px;
        }

        .tab-header {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-left: 8px;
            padding-right: 8px;
        }
    `]
})
export class StackComponent implements DropTarget, AfterViewInit {

    @ViewChildren("tabHeader", {read: DragListenerDirective})
    private matTabDraglisteners: QueryList<DragListenerDirective>;

    @ViewChildren(GlComponent)
    private contentItems: QueryList<GlComponent>;

    @HostBinding("class.lm_item")
    @HostBinding("class.lm_stack")
    readonly bindings = true;

    _side: boolean | DropSegment;
    _sided: boolean;
    _header: HeaderConfig;

    element = $(this.elementRef.nativeElement);

    isInitialised = false;

    private activeContentItem: GlComponent = null;
    private dropSegment: keyof ContentAreaDimensions = null;
    private dropIndex: number = null;
    private subscription: Subscription;
    @ViewChild(MatTabGroup, {read: ElementRef})
    private headerComponent: ElementRef<HTMLElement>;

    contentAreaDimensions: ContentAreaDimensions = null;
    isStack = true;
    readonly config$ = observeAttribute$(this as StackComponent, "config");

    readonly hasHeaders = this.dockingLayoutService.config.settings.hasHeaders;

    constructor(
        private readonly dockingLayoutService: DockingLayoutService,
        private readonly dropTargetIndicator: DropTargetIndicatorComponent,
        private readonly tabDropPlaceholder: TabDropPlaceholderComponent,
        @Inject(ITEM_CONFIG)
        public config: StackConfiguration,
        @Inject(PARENT_ITEM_COMPONENT)
        public parent: StackParentComponent,
        private readonly elementRef: ElementRef<HTMLElement>,
        private readonly cd: ChangeDetectorRef
    ) {
        this.initialize();
    }

    onDragStart1(coordinates: Vector2, contentItem: ComponentConfiguration, tabIndex: number) {
        const dragListener = this.matTabDraglisteners.get(tabIndex);
        this.processDragStart({coordinates, contentItem, dragListener});
    }

    ngAfterViewInit(): void {
        this.init();
    }

    initialize(): void {

        this.config = {...itemDefaultConfig, ...this.config};

        const cfg = this.dockingLayoutService.config;
        this._header = {
            show: cfg.settings.hasHeaders === true && this.config.hasHeaders !== false,
        };

        this.setupHeaderPosition();
    }

    onDragStart(componentConfig: string) {
        this.removeChild(componentConfig, true);
    }

    private resetHeaderDropZone() {
        this.tabDropPlaceholder.remove();
    }

    private setupHeaderPosition() {
        const side = sides.indexOf(this._header.show as DropSegment) >= 0 && this._header.show;
        this._side = side;
        this._sided = [DropSegment.Right, DropSegment.Left].indexOf(this._side as DropSegment) >= 0;
        this.element.removeClass(lmLeftClassName + " " + lmRightClassName + " " + lmBottomClassName);
        if (this._side) {
            this.element.addClass("lm_" + this._side);
        }
    }

    private highlightBodyDropZone(segment: keyof ContentAreaDimensions) {
        const highlightArea = this.contentAreaDimensions[segment].highlightArea;
        this.dropTargetIndicator.highlightArea(highlightArea);
        this.dropSegment = segment;
    }

    remove() {
        this.parent.removeChild(this, undefined);
    }

    hide() {
        this.element.hide();
    }

    show() {
        this.element.show();
    }

    init() {
        if (this.isInitialised === true) return;

        this.isInitialised = true;

        if (!this.config.content) this.config.content = [];

        if (this.config.content.length > 0) {
            this.setActiveContentItem(this.config.content[0].id);
        }

        if (notNullOrUndefined(this.config.publishSelectedItemChange$)) {
            this.subscription = this.config.publishSelectedItemChange$.subscribe(change => {
                if (this.config.content.find(x => x.id === change.id)) {
                    this.setActiveContentItem(change.id);
                }
            });
        }

    }

    setActiveContentItem(componentId: string) {
        const item = this.config.content.find(x => x.id === componentId);
        const index = this.config.content.indexOf(item);
        this.config.activeItemId = componentId;
        this.config.activeItemIndex = index;

        if (this.config.onSelectedItemChange) {
            this.config.onSelectedItemChange(componentId);
        }
    }

    addChild(contentItem: GlComponent, index?: number) {
        if (this.config.content === undefined) this.config.content = [];
        if (index === undefined) index = this.config.content.length;

        this.config.content.splice(index, 0, contentItem.config);
        this.setActiveContentItem(contentItem.config.id);
        this.cd.markForCheck();
    }

    removeChild(componentId: string, keepChild: boolean) {
        const contentItem = this.config.content.find(x => x.id === componentId);
        let index = this.config.content.indexOf(contentItem);

        if (keepChild !== true) {
            // this.contentItems[index].destroy();
        }

        this.config.content.splice(index, 1);

        if (this.config.content.length > 0) {
        } else if (this.config.isClosable === true) {
            this.parent.removeChild(this, undefined);
        }

        if (this.config.activeItemId === componentId) {
            if (this.config.content.length > 0) {
                this.setActiveContentItem(this.config.content[Math.max(index - 1, 0)].id);
            } else {
                this.activeContentItem = null;
            }
        }
    }

    destroy() {
        this.element.remove();

        if (notNullOrUndefined(this.subscription) && !this.subscription.closed) {
            this.subscription.unsubscribe();
        }
    }

    onDrop(contentItem: GlComponent) {
        /*
         * The item was dropped on the header area. Just add it as a child of this stack and
         * get the hell out of this logic
         */
        if (this.dropSegment === DropSegment.Header) {
            this.resetHeaderDropZone();
            this.addChild(contentItem, this.dropIndex);
            return;
        }

        /*
         * The stack is empty. Let's just add the element.
         */
        if (this.dropSegment === DropSegment.Body) {
            this.addChild(contentItem);
            return;
        }

        /*
         * The item was dropped on the top-, left-, bottom- or right- part of the content. Let's
         * aggregate some conditions to make the if statements later on more readable
         */
        const isVertical = this.dropSegment === DropSegment.Top || this.dropSegment === DropSegment.Bottom;
        const isHorizontal = this.dropSegment === DropSegment.Left || this.dropSegment === DropSegment.Right;
        const insertBefore = this.dropSegment === DropSegment.Top || this.dropSegment === DropSegment.Left;
        const hasCorrectParent = (isVertical && this.parent.isColumn) || (isHorizontal && this.parent.isRow);
        const dimension = isVertical ? "height" : "width";

        const stack = this.createAndInitStack(contentItem);

        /*
         * If the item is dropped on top or bottom of a column or left and right of a row, it's already
         * layd out in the correct way. Just add it as a child
         */
        if (hasCorrectParent) {
            this.addStackToExistingRowOrColumn({stack, dimension, insertBefore});
            /*
             * This handles items that are dropped on top or bottom of a row or left / right of a column. We need
             * to create the appropriate contentItem for them to live in
             */
        } else {
            this.addStackToNewRowOrColumn({stack, dimension, insertBefore, isVertical});
        }
    }

    private addStackToNewRowOrColumn(payload: {
        readonly stack: StackComponent;
        readonly isVertical: boolean;
        readonly insertBefore: boolean;
        readonly dimension: "width" | "height";
    }) {
        const stack = payload.stack;
        const insertBefore = payload.insertBefore;
        const dimension = payload.dimension;
        const isVertical = payload.isVertical;

        const type = isVertical ? "column" : "row";
        const rowOrColumn = this.dockingLayoutService.createContentItem<RowOrColumnComponent>({type}, this);
        this.parent.replaceChild(this, rowOrColumn);

        rowOrColumn.addChild(stack, insertBefore ? 0 : undefined, true);
        rowOrColumn.addChild(this, insertBefore ? undefined : 0, true);

        this.config[dimension] = 50;
        stack.config[dimension] = 50;
        rowOrColumn.callDownwards("setSize");
    }

    private addStackToExistingRowOrColumn(payload: {
        readonly stack: StackComponent;
        readonly insertBefore: boolean;
        readonly dimension: "width" | "height";
    }) {
        const stack = payload.stack;
        const insertBefore = payload.insertBefore;
        const dimension = payload.dimension;

        const index = this.parent.contentItems.indexOf(this);
        this.parent.addChild(stack, insertBefore ? index : index + 1, true);
        this.config[dimension] *= 0.5;
        stack.config[dimension] = this.config[dimension];
        this.parent.callDownwards("setSize");
    }

    private createAndInitStack(component: GlComponent): StackComponent {
        const stack = this.dockingLayoutService.createContentItem<StackComponent>({
            type: "stack",
        }, this);
        stack.init();
        stack.addChild(component);
        return stack;
    }

    /**
     * If the user hovers above the header part of the stack, indicate drop positions for tabs.
     * otherwise indicate which segment of the body the dragged item would be dropped on
     */
    highlightDropZone(x: number, y: number) {
        let segment: keyof ContentAreaDimensions;
        let area: AreaSides;

        for (segment in this.contentAreaDimensions) {
            area = this.contentAreaDimensions[segment].hoverArea;

            if (area.x1 < x && area.x2 > x && area.y1 < y && area.y2 > y) {

                if (segment === DropSegment.Header) {
                    this.dropSegment = DropSegment.Header;
                    this.highlightHeaderDropZone(this._sided ? y : x);
                } else {
                    this.resetHeaderDropZone();
                    this.highlightBodyDropZone(segment);
                }

                return;
            }
        }
    }

    /**
     * Returns the area the component currently occupies in the format
     */
    private getAreaInternal<T = number>(element?: JQuery): Area {
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

    getArea(): Area {
        if (this.element.is(":visible") === false) {
            return null;
        }

        const headerArea = this.getAreaInternal($(this.headerComponent.nativeElement)),
            contentArea = this.getAreaInternal(),
            contentWidth = contentArea.x2 - contentArea.x1,
            contentHeight = contentArea.y2 - contentArea.y1;

        this.contentAreaDimensions = {
            header: {
                hoverArea: headerArea,
                highlightArea: headerArea
            }
        };

        /**
         * If this Stack is a parent to rows, columns or other stacks only its
         * header is a valid dropzone.
         */
        if (this.activeContentItem && this.activeContentItem.isComponent === false) {
            return headerArea;
        }

        /**
         * Highlight the entire body if the stack is empty
         */
        if (this.config.content.length === 0) {

            this.contentAreaDimensions.body = {
                hoverArea: contentArea,
                highlightArea: contentArea
            };

            return this.getAreaInternal(this.element);
        }

        this.contentAreaDimensions.left = {
            hoverArea: {
                ...contentArea,
                x2: contentArea.x1 + contentWidth * 0.25
            },
            highlightArea: {
                ...contentArea,
                x2: contentArea.x1 + contentWidth * 0.5
            }
        };

        this.contentAreaDimensions.top = {
            hoverArea: {
                ...contentArea,
                x1: contentArea.x1 + contentWidth * 0.25,
                x2: contentArea.x1 + contentWidth * 0.75,
                y2: contentArea.y1 + contentHeight * 0.5
            },
            highlightArea: {
                ...contentArea,
                y2: contentArea.y1 + contentHeight * 0.5
            }
        };

        this.contentAreaDimensions.right = {
            hoverArea: {
                ...contentArea,
                x1: contentArea.x1 + contentWidth * 0.75
            },
            highlightArea: {
                ...contentArea,
                x1: contentArea.x1 + contentWidth * 0.5
            }
        };

        this.contentAreaDimensions.bottom = {
            hoverArea: {
                ...contentArea,
                x1: contentArea.x1 + contentWidth * 0.25,
                y1: contentArea.y1 + contentHeight * 0.5,
                x2: contentArea.x1 + contentWidth * 0.75
            },
            highlightArea: {
                ...contentArea,
                y1: contentArea.y1 + contentHeight * 0.5
            }
        };

        return this.getAreaInternal(this.element);
    }

    private highlightHeaderDropZone(x: number) {
        const headerElement = $(this.headerComponent.nativeElement);
        const tabsLength = this.matTabDraglisteners.length;

        let i: number,
            tabElement: JQuery<HTMLElement>,
            isAboveTab = false,
            tabTop: number,
            tabLeft: number,
            offset: JQuery.Coordinates,
            placeHolderTop: number,
            placeHolderLeft: number,
            headerOffset: JQuery.Coordinates,
            tabWidth: number,
            halfX: number;

        // Empty stack
        if (tabsLength === 0) {
            headerOffset = headerElement.offset();

            this.dropTargetIndicator.highlightArea({
                x1: headerOffset.left,
                x2: headerOffset.left + 100,
                y1: headerOffset.top + headerElement.height() - 20,
                y2: headerOffset.top + headerElement.height()
            });

            return;
        }

        for (i = 0; i < tabsLength; i++) {
            tabElement = $(this.matTabDraglisteners.toArray()[i].elementRef.nativeElement);
            offset = tabElement.offset();
            if (this._sided) {
                tabLeft = offset.top;
                tabTop = offset.left;
                tabWidth = tabElement.height();
            } else {
                tabLeft = offset.left;
                tabTop = offset.top;
                tabWidth = tabElement.width();
            }

            if (x > tabLeft && x < tabLeft + tabWidth) {
                isAboveTab = true;
                break;
            }
        }

        if (isAboveTab === false && x < tabLeft) {
            return;
        }

        halfX = tabLeft + tabWidth / 2;

        if (x < halfX) {
            this.dropIndex = i;
            tabElement.before(this.tabDropPlaceholder.$element);
        } else {
            this.dropIndex = Math.min(i + 1, tabsLength);
            tabElement.after(this.tabDropPlaceholder.$element);
        }


        if (this._sided) {
            placeHolderTop = this.tabDropPlaceholder.offset().top;
            this.dropTargetIndicator.highlightArea({
                x1: tabTop,
                x2: tabTop + tabElement.innerHeight(),
                y1: placeHolderTop,
                y2: placeHolderTop + this.tabDropPlaceholder.width()
            });
            return;
        }
        placeHolderLeft = this.tabDropPlaceholder.offset().left;

        this.dropTargetIndicator.highlightArea({
            x1: placeHolderLeft,
            x2: placeHolderLeft + this.tabDropPlaceholder.width(),
            y1: tabTop,
            y2: tabTop + tabElement.innerHeight()
        });
    }

    processDragStart(x: { readonly contentItem: ComponentConfiguration } & DragStartEvent) {
        if (!x.dragListener) return;

        const resolved = this.contentItems?.find(y => y.config.id === x.contentItem.id);

        if (!resolved) return;

        return new DragProxy(
            x.coordinates,
            x.dragListener,
            this.dockingLayoutService,
            resolved,
            this
        );
    }

    processSelectedContentItemChange(index: number) {
        const x = this.config.content[index];
        if (x.id === this.config.activeItemId) return;
        this.setActiveContentItem(x.id);
    }
}

