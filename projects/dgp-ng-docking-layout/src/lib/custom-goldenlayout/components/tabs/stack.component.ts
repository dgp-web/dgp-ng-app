import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    HostBinding,
    Inject,
    QueryList,
    ViewChild,
    ViewChildren
} from "@angular/core";
import {
    ComponentConfiguration,
    HeaderConfig,
    ITEM_CONFIG,
    itemDefaultConfig,
    LAYOUT_CONFIG,
    LayoutConfiguration,
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
import { DragStartEvent } from "../../models/drag-start-event.model";
import type { RowOrColumnComponent } from "../grid/row-or-column.component";
import { Vector2 } from "../../../common";
import { DragListenerDirective } from "../drag-and-drop/drag-listener.directive";
import { MatLegacyTabGroup as MatTabGroup } from "@angular/material/legacy-tabs";
import { DropTargetIndicatorComponent } from "../drag-and-drop/drop-target-indicator.component";
import { TabDropPlaceholderComponent } from "./tab-drop-placeholder.component";
import { DragProxyFactory } from "../../services/drag-proxy.factory";
import { ContentItemCreationService } from "../../services/content-item-creation.service";

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
                         (dragStart$)="onTabDragStart($event, componentConfig, i)"
                         class="tab-header">
                        <ng-container *ngIf="componentConfig.componentState.labelTemplate; else textBasedLabel">
                            <ng-container [ngTemplateOutlet]="componentConfig.componentState.labelTemplate()"></ng-container>
                        </ng-container>
                        <ng-template #textBasedLabel>
                            {{ componentConfig.title }}
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
    private headerConfig: HeaderConfig;

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

    readonly hasHeaders = this.layoutConfig.settings.hasHeaders;

    constructor(
        private readonly dropTargetIndicator: DropTargetIndicatorComponent,
        private readonly tabDropPlaceholder: TabDropPlaceholderComponent,
        @Inject(LAYOUT_CONFIG)
        public layoutConfig: LayoutConfiguration,
        @Inject(ITEM_CONFIG)
        public config: StackConfiguration,
        @Inject(PARENT_ITEM_COMPONENT)
        public parent: StackParentComponent,
        private readonly elementRef: ElementRef<HTMLElement>,
        private readonly cd: ChangeDetectorRef,
        @Inject(forwardRef(() => DragProxyFactory))
        private readonly dragProxyFactory: DragProxyFactory,
        @Inject(forwardRef(() => ContentItemCreationService))
        private readonly contentItemCreationService: ContentItemCreationService,
    ) {
        this.initialize();
    }

    onTabDragStart(coordinates: Vector2, contentItem: ComponentConfiguration, tabIndex: number) {
        const dragListener = this.matTabDraglisteners.get(tabIndex);
        this.processDragStart({coordinates, contentItem, dragListener});
    }

    ngAfterViewInit(): void {
        this.init();
    }

    initialize(): void {

        this.config = {...itemDefaultConfig, ...this.config};

        this.headerConfig = {
            show: this.layoutConfig.settings.hasHeaders === true && this.config.hasHeaders !== false,
        };

        this.setupHeaderPosition();
    }

    onDragStart(componentConfig: string) {
        this.removeChild(componentConfig);
    }

    private resetHeaderDropZone() {
        this.tabDropPlaceholder.remove();
    }

    private setupHeaderPosition() {
        const side = sides.indexOf(this.headerConfig.show as DropSegment) >= 0 && this.headerConfig.show;
        this._side = side;
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
        // TODO: REplace
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

    private setActiveContentItem(componentId: string) {
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

    private removeChild(componentId: string) {
        const contentItem = this.config.content.find(x => x.id === componentId);
        let index = this.config.content.indexOf(contentItem);

        this.config.content.splice(index, 1);

        if (this.config.content.length === 0 && this.config.isClosable === true) {
            // TODO: Replace parent call
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

        const stack = this.createAndInitStack(contentItem);

        const assignmentInfo = computeStackOnDropAssignmentInfo({
            dropSegment: this.dropSegment as DropSegment,
            parentType: this.parent.isColumn ? "column" : "row"
        });

        /*
         * If the item is dropped on top or bottom of a column or left and right of a row, it's already
         * laid out in the correct way. Just add it as a child
         */
        if (assignmentInfo.hasCorrectParent) {
            this.addStackToExistingRowOrColumn({...assignmentInfo, stack});
            /*
             * This handles items that are dropped on top or bottom of a row or left / right of a column. We need
             * to create the appropriate contentItem for them to live in
             */
        } else {
            this.addStackToNewRowOrColumn({...assignmentInfo, stack});
        }
    }

    private addStackToNewRowOrColumn(payload: {
        readonly stack: StackComponent;
    } & StackOnDropAssignmentInfo) {
        const stack = payload.stack;
        const insertBefore = payload.insertBefore;
        const dimension = payload.dimension;
        const isVertical = payload.isVertical;

        const type = isVertical ? "column" : "row";
        const rowOrColumn = this.contentItemCreationService.createContentItem<RowOrColumnComponent>({type}, this);
        // TODO: Replace with event emitter
        this.parent.replaceChild(this, rowOrColumn);

        rowOrColumn.addChild(stack, insertBefore ? 0 : undefined, true);
        rowOrColumn.addChild(this, insertBefore ? undefined : 0, true);

        this.config[dimension] = 50;
        stack.config[dimension] = 50;
        rowOrColumn.callDownwards("setSize");
    }

    private addStackToExistingRowOrColumn(payload: {
        readonly stack: StackComponent;
    } & StackOnDropAssignmentInfo) {
        const stack = payload.stack;
        const insertBefore = payload.insertBefore;
        const dimension = payload.dimension;

        // TODO: Replace with event emitter
        const index = this.parent.contentItems.indexOf(this);
        this.parent.addChild(stack, insertBefore ? index : index + 1, true);
        this.config[dimension] *= 0.5;
        stack.config[dimension] = this.config[dimension];
        this.parent.callDownwards("setSize");
    }

    private createAndInitStack(component: GlComponent): StackComponent {
        const stack = this.contentItemCreationService.createContentItem<StackComponent>({
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

            // TODO: Extract isInArea(payload: {area: AreaSides; point: Point});
            if (area.x1 < x && area.x2 > x && area.y1 < y && area.y2 > y) {

                if (segment === DropSegment.Header) {
                    this.dropSegment = DropSegment.Header;
                    this.highlightHeaderDropZone(x);
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
    private getAreaForElement<T = number>(element: JQuery): Area {
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

    private getAreaForOwnElement() {
        return this.getAreaForElement(this.element);
    }

    private getAreaForHeaderElement() {
        return this.getAreaForElement($(this.headerComponent.nativeElement));
    }

    getArea(): Area {
        if (this.element.is(":visible") === false) {
            return null;
        }

        const headerArea = this.getAreaForHeaderElement(),
            contentArea = this.getAreaForOwnElement(),
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

            return this.getAreaForElement(this.element);
        }

        // TODO: Extract function updateContentAreaDimensions
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

        return this.getAreaForElement(this.element);
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

        // TODO: extract methods for the individual cases
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

            tabLeft = offset.left;
            tabTop = offset.top;
            tabWidth = tabElement.width();


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

        placeHolderLeft = this.tabDropPlaceholder.offset().left;

        this.dropTargetIndicator.highlightArea({
            x1: placeHolderLeft,
            x2: placeHolderLeft + this.tabDropPlaceholder.width(),
            y1: tabTop,
            y2: tabTop + tabElement.innerHeight()
        });
    }

    private processDragStart(x: { readonly contentItem: ComponentConfiguration } & DragStartEvent) {
        if (!x.dragListener) return;

        const resolved = this.contentItems?.find(y => y.config.id === x.contentItem.id);

        if (!resolved) return;

        // TODO: Creating a DragProxy comes with a lot of layout changes that are handled in its constructor
        return this.dragProxyFactory.create({
            coordinates: x.coordinates,
            dragListener: x.dragListener,
            contentItem: resolved,
            originalParent: this
        });
    }

    protected processSelectedContentItemChange(index: number) {
        const x = this.config.content[index];
        if (!x) return;
        if (x.id === this.config.activeItemId) return;
        this.setActiveContentItem(x.id);
    }
}


export interface StackOnDropAssignmentInfo {
    readonly dimension: "height" | "width";
    readonly hasCorrectParent: boolean;
    readonly insertBefore: boolean;
    readonly isHorizontal: boolean;
    readonly isVertical: boolean;
}

export function computeStackOnDropAssignmentInfo(payload: {
    readonly dropSegment: DropSegment;
    readonly parentType: "row" | "column";
}): StackOnDropAssignmentInfo {

    const dropSegment = payload.dropSegment;
    const parentType = payload.parentType;

    const isVertical = dropSegment === DropSegment.Top || dropSegment === DropSegment.Bottom;
    const isHorizontal = dropSegment === DropSegment.Left || dropSegment === DropSegment.Right;
    const insertBefore = dropSegment === DropSegment.Top || dropSegment === DropSegment.Left;
    const hasCorrectParent = (isVertical && parentType === "column") || (isHorizontal && parentType === "row");
    const dimension = isVertical ? "height" : "width";

    return {
        isVertical,
        isHorizontal,
        insertBefore,
        hasCorrectParent,
        dimension
    };
}
