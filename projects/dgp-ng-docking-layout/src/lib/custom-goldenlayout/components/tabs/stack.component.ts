import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, Inject } from "@angular/core";
import { dockingLayoutViewMap } from "../../../docking-layout/views";
import { DockingLayoutService } from "../../docking-layout.service";
import {
    ComponentConfiguration,
    HeaderConfig,
    ITEM_CONFIG,
    itemDefaultConfig,
    ItemType,
    PARENT_ITEM_COMPONENT,
    StackConfiguration
} from "../../types";
import { LayoutManagerUtilities } from "../../utilities";
import { StackHeaderComponent } from "./stack-header.component";
import { Subscription } from "rxjs";
import { notNullOrUndefined, observeAttribute$ } from "dgp-ng-app";
import { sides } from "../../constants/sides.constant";
import { DropSegment } from "../../models/drop-segment.model";
import { ContentAreaDimensions } from "../../models/content-area-dimensions.model";
import { lmLeftClassName } from "../../constants/class-names/lm-left-class-name.constant";
import { lmHeaderClassName } from "../../constants/class-names/lm-header-class-name.constant";
import { lmBottomClassName } from "../../constants/class-names/lm-bottom-class-name.constant";
import { lmRightClassName } from "../../constants/class-names/lm-right-class-name.constant";
import { activeContentItemChangedEventType } from "../../constants/event-types/active-content-item-changed-event-type.constant";
import { DropTarget } from "../../models/drop-target.model";
import { Area, AreaSides } from "../../models/area.model";
import { GlComponent } from "../component.component";
import { StackParentComponent } from "../../models/stack-parent-component.model";
import { DockingLayoutEngineObject } from "../docking-layout-engine-object";
import { DragProxy } from "../drag-and-drop/drag-proxy.component";
import { DragStartEvent } from "../../models/drag-start-event.model";

@Component({
    selector: "dgp-stack",
    template: `
        <!--<dgp-gl-header [model]="config"
                       (dragStart)="processDragStart($event)"
                       (selectedContentItemChange)="processSelectedContentItemChange($event)"></dgp-gl-header>-->
        <!--<
            <div class="lm_items card-body" style="padding: 0;"></div>
        -->
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StackComponent extends DockingLayoutEngineObject implements DropTarget, AfterViewInit {

    @HostBinding("class.lm_item")
    @HostBinding("class.lm_stack")
    @HostBinding("class.card")
    readonly bindings = true;

    _side: boolean | DropSegment;
    _sided: boolean;
    _header: HeaderConfig;

    contentItems: GlComponent[] = [];

    element = $(this.elementRef.nativeElement);

    childElementContainer: JQuery;

    isInitialised = false;

    private activeContentItem: GlComponent = null;
    private dropSegment: keyof ContentAreaDimensions = null;
    private dropIndex: number = null;
    private subscription: Subscription;
    // @ViewChild(HeaderComponent, {read: HeaderComponent})
    private headerComponent: StackHeaderComponent;

    contentAreaDimensions: ContentAreaDimensions = null;
    isStack = true;
    config: StackConfiguration;
    readonly config$ = observeAttribute$(this as StackComponent, "config");

    constructor(
        private readonly dockingLayoutService: DockingLayoutService,
        @Inject(ITEM_CONFIG) config: StackConfiguration,
        @Inject(PARENT_ITEM_COMPONENT)
        public parent: StackParentComponent,
        private readonly elementRef: ElementRef<HTMLElement>
    ) {
        super();

        this.config = {...itemDefaultConfig, ...config};
        if (config.content) this.createContentItems(config);

        this.initialize();
    }

    ngAfterViewInit(): void {

    }

    initialize(): void {

        const vcRef = this.dockingLayoutService.getViewContainerRef();
        const headerComponentRef = vcRef.createComponent(StackHeaderComponent);
        this.headerComponent = headerComponentRef.instance;

        this.config$.subscribe(x => {
            this.headerComponent.model = x;
        });

        this.headerComponent.selectedContentItemChange.subscribe(x => {
            this.processSelectedContentItemChange(x);
        });

        this.headerComponent.dragStart.subscribe(x => {
            this.processDragStart(x);
        });

        // this.headerComponent = new HeaderComponent(dockingLayoutService, this);
        const cfg = this.dockingLayoutService.config;
        this._header = { // defaults' reconstruction from old configuration style
            show: cfg.settings.hasHeaders === true && this.config.hasHeaders !== false,
            popout: cfg.settings.showPopoutIcon && cfg.labels.popout,
            maximise: cfg.settings.showMaximiseIcon && cfg.labels.maximise,
            close: cfg.settings.showCloseIcon && cfg.labels.close,
            minimise: cfg.labels.minimise,
        };

        if (this.config.header) {
            Object.assign(this._header, this.config.header);
        }
        if (this.config.content && this.config.content[0] && this.config.content[0].header) {
            Object.assign(this._header, this.config.content[0].header);
        }


        this.childElementContainer = $(
            dockingLayoutViewMap.stackContent.render()
        );

        this.element.append(this.headerComponent.element);
        this.element.append(this.childElementContainer);

        this.setupHeaderPosition();

    }

    private resetHeaderDropZone() {
        this.dockingLayoutService.tabDropPlaceholder.remove();
    }

    private setupHeaderPosition() {
        const side = sides.indexOf(this._header.show as DropSegment) >= 0 && this._header.show;
        this.headerComponent.element.toggle(!!this._header.show);
        this._side = side;
        this._sided = [DropSegment.Right, DropSegment.Left].indexOf(this._side as DropSegment) >= 0;
        this.element.removeClass(lmLeftClassName + " " + lmRightClassName + " " + lmBottomClassName);
        if (this._side) {
            this.element.addClass("lm_" + this._side);
        }
        if (this.element.find("." + lmHeaderClassName).length && this.childElementContainer) {
            const headerPosition = [DropSegment.Right, DropSegment.Bottom].indexOf(this._side as DropSegment) >= 0 ? "before" : "after";
            this.headerComponent.element[headerPosition](this.childElementContainer);
            this.callDownwards("setSize");
        }
    }

    private highlightBodyDropZone(segment: keyof ContentAreaDimensions) {
        const highlightArea = this.contentAreaDimensions[segment].highlightArea;
        this.dockingLayoutService.dropTargetIndicator.highlightArea(highlightArea);
        this.dropSegment = segment;
    }

    remove() {
        this.parent.removeChild(this, undefined);
    }

    hide() {
        this.callOnActiveComponents("hide");
        this.element.hide();
        this.dockingLayoutService.updateSize();
    }

    show() {
        this.callOnActiveComponents("show");
        this.element.show();
        this.dockingLayoutService.updateSize();
    }

    private callOnActiveComponents(methodName: string): void {
        this.getActiveContentItem()[methodName]();
    }

    private createContentItems(config: StackConfiguration) {
        this.contentItems = config.content.map(x => this.dockingLayoutService.createContentItem(x, this));
    }

    setSize() {
        const headerSize = this._header.show ? this.dockingLayoutService.config.dimensions.headerHeight : 0;
        const contentWidth = this.element.width() - (this._sided ? headerSize : 0);
        const contentHeight = this.element.height() - (!this._sided ? headerSize : 0);

        this.childElementContainer.width(contentWidth);
        this.childElementContainer.height(contentHeight);

        for (let i = 0; i < this.contentItems.length; i++) {
            this.contentItems[i].element.width(contentWidth)
                .height(contentHeight);
        }
    }

    init() {
        if (this.isInitialised === true) return;

        for (let i = 0; i < this.contentItems.length; i++) {
            this.childElementContainer.append(this.contentItems[i].element);
            this.contentItems[i].hide();
        }

        this.isInitialised = true;

        if (this.contentItems.length > 0) {
            const initialItem = this.contentItems[this.config.activeItemIndex || 0];
            this.setActiveContentItem(initialItem);
        }

        if (notNullOrUndefined(this.config.publishSelectedItemChange$)) {
            this.subscription = this.config.publishSelectedItemChange$.subscribe(change => {
                if (this.contentItems.find(x => x.config.id === change.id)) {
                    this.setActiveContentItem(this.contentItems.find(x => x.config.id === change.id) as any);
                }
            });
        }

    }

    setActiveContentItem(contentItem: GlComponent) {
        if (this.activeContentItem !== null) {
            this.activeContentItem.hide();
        }

        this.activeContentItem = contentItem;
        this.config.activeItemId = contentItem.config.id;
        contentItem.show();
        this.emit(activeContentItemChangedEventType, contentItem);
        this.dockingLayoutService.emit(activeContentItemChangedEventType, contentItem);

        if (this.config.onSelectedItemChange) {
            this.config.onSelectedItemChange(contentItem.config.id);
        }
    }

    getActiveContentItem(): GlComponent {
        return this.contentItems.find(x => x.config.id === this.headerComponent.getActiveContentItem()?.id);
    }

    addChild(contentItem: GlComponent, index?) {

        if (index === undefined) {
            index = this.contentItems.length;
        }

        this.contentItems.splice(index, 0, contentItem);

        if (this.config.content === undefined) {
            this.config.content = [];
        }

        this.config.content.splice(index, 0, contentItem.config);
        contentItem.parent = this as any;

        this.childElementContainer.append(contentItem.element);
        this.setActiveContentItem(contentItem);
        this.callDownwards("setSize");
    }

    removeChild(contentItem: GlComponent, keepChild) {
        let index = this.contentItems.indexOf(contentItem);

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

        if (this.headerComponent.getActiveContentItem().id === contentItem.config.id) {
            if (this.contentItems.length > 0) {
                this.setActiveContentItem(this.contentItems[Math.max(index - 1, 0)] as any);
            } else {
                this.activeContentItem = null;
            }
        }
    }

    destroy() {
        this.unsubscribe();
        this.callDownwards("destroy", [], true, true);
        this.element.remove();
        this.headerComponent.destroy();

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
        let isVertical = this.dropSegment === DropSegment.Top || this.dropSegment === DropSegment.Bottom,
            isHorizontal = this.dropSegment === DropSegment.Left || this.dropSegment === DropSegment.Right,
            insertBefore = this.dropSegment === DropSegment.Top || this.dropSegment === DropSegment.Left,
            hasCorrectParent = (isVertical && this.parent.isColumn) || (isHorizontal && this.parent.isRow),
            type: ItemType = isVertical ? "column" : "row",
            dimension = isVertical ? "height" : "width",
            index,
            stack,
            rowOrColumn;

        /*
         * The content item can be either a component or a stack. If it is a component, wrap it into a stack
         */
        if (contentItem.isComponent) {
            stack = this.dockingLayoutService.createContentItem({
                type: "stack",
                header: contentItem.config.header || {}
            }, this as any);
            stack.init();
            stack.addChild(contentItem);
            contentItem = stack;
        }

        /*
         * If the item is dropped on top or bottom of a column or left and right of a row, it's already
         * layd out in the correct way. Just add it as a child
         */
        if (hasCorrectParent) {
            index = new LayoutManagerUtilities().indexOf(this, this.parent.contentItems);
            this.parent.addChild(contentItem as any, insertBefore ? index : index + 1, true);
            this.config[dimension] *= 0.5;
            contentItem.config[dimension] = this.config[dimension];
            this.parent.callDownwards("setSize");
            /*
             * This handles items that are dropped on top or bottom of a row or left / right of a column. We need
             * to create the appropriate contentItem for them to live in
             */
        } else {
            type = isVertical ? "column" : "row";
            rowOrColumn = this.dockingLayoutService.createContentItem({type}, this);
            this.parent.replaceChild(this as any, rowOrColumn);

            rowOrColumn.addChild(contentItem, insertBefore ? 0 : undefined, true);
            rowOrColumn.addChild(this, insertBefore ? undefined : 0, true);

            this.config[dimension] = 50;
            contentItem.config[dimension] = 50;
            rowOrColumn.callDownwards("setSize");
        }
    }

    /**
     * If the user hovers above the header part of the stack, indicate drop positions for tabs.
     * otherwise indicate which segment of the body the dragged item would be dropped on
     */
    highlightDropZone(x, y) {
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
    private getAreaInternal(element?: JQuery): Area {
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
            contentItem: this as any
        };
    }

    getArea(): Area {
        if (this.element.is(":visible") === false) {
            return null;
        }

        const getArea = this.getAreaInternal,
            headerArea = getArea.call(this, this.headerComponent.element),
            contentArea = getArea.call(this, this.childElementContainer),
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
        if (this.contentItems.length === 0) {

            this.contentAreaDimensions.body = {
                hoverArea: contentArea,
                highlightArea: contentArea
            };

            return getArea.call(this, this.element);
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

        return getArea.call(this, this.element);
    }

    private highlightHeaderDropZone(x: number) {
        let i: number,
            tabElement: JQuery<HTMLElement>,
            tabsLength = this.headerComponent.tabs.length,
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
            headerOffset = this.headerComponent.element.offset();

            this.dockingLayoutService.dropTargetIndicator.highlightArea({
                x1: headerOffset.left,
                x2: headerOffset.left + 100,
                y1: headerOffset.top + this.headerComponent.element.height() - 20,
                y2: headerOffset.top + this.headerComponent.element.height()
            });

            return;
        }

        for (i = 0; i < tabsLength; i++) {
            tabElement = this.headerComponent.tabs.toArray()[i].element;
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
            tabElement.before(this.dockingLayoutService.tabDropPlaceholder.$element);
        } else {
            this.dropIndex = Math.min(i + 1, tabsLength);
            tabElement.after(this.dockingLayoutService.tabDropPlaceholder.$element);
        }


        if (this._sided) {
            placeHolderTop = this.dockingLayoutService.tabDropPlaceholder.offset().top;
            this.dockingLayoutService.dropTargetIndicator.highlightArea({
                x1: tabTop,
                x2: tabTop + tabElement.innerHeight(),
                y1: placeHolderTop,
                y2: placeHolderTop + this.dockingLayoutService.tabDropPlaceholder.width()
            });
            return;
        }
        placeHolderLeft = this.dockingLayoutService.tabDropPlaceholder.offset().left;

        this.dockingLayoutService.dropTargetIndicator.highlightArea({
            x1: placeHolderLeft,
            x2: placeHolderLeft + this.dockingLayoutService.tabDropPlaceholder.width(),
            y1: tabTop,
            y2: tabTop + tabElement.innerHeight()
        });
    }

    processDragStart(x: { readonly contentItem: ComponentConfiguration } & DragStartEvent) {
        if (!x.dragListener) return;

        const resolved = this.contentItems.find(y => y.config.id === x.contentItem.id);

        return new DragProxy(
            x.coordinates,
            x.dragListener,
            this.dockingLayoutService,
            resolved,
            this
        );
    }

    processSelectedContentItemChange(x: ComponentConfiguration) {
        const resolved = this.contentItems.find(y => y.config.id === x.id);
        if (resolved === this.getActiveContentItem()) return;
        this.setActiveContentItem(resolved);
    }
}

