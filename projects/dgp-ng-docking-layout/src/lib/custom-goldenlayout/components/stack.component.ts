import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { dockingLayoutViewMap } from "../../docking-layout/views";
import { DockingLayoutService } from "../docking-layout.service";
import { ITEM_CONFIG, ItemConfiguration, ItemType, PARENT_ITEM_COMPONENT, StackConfiguration } from "../types";
import { LayoutManagerUtilities } from "../utilities";
import { AbstractContentItemComponent } from "./abstract-content-item.component";
import { HeaderComponent } from "./header.component";
import { Subscription } from "rxjs";
import { notNullOrUndefined } from "dgp-ng-app";
import { sides } from "../constants/sides.constant";
import { Side } from "../models/side.model";
import { stateChangedEventType } from "../constants/state-changed-event-type.constant";
import { DropSegment } from "../models/drop-segment.model";
import { ContentAreaDimensions } from "../models/content-area-dimensions.model";
import { lmLeftClassName } from "../constants/lm-left-class-name.constant";
import { lmHeaderClassName } from "../constants/lm-header-class-name.constant";
import { lmBottomClassName } from "../constants/lm-bottom-class-name.constant";
import { lmRightClassName } from "../constants/lm-right-class-name.constant";

@Component({
    selector: "dgp-stack",
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StackComponent extends AbstractContentItemComponent {
    private activeContentItem: AbstractContentItemComponent;
    private dropSegment: keyof ContentAreaDimensions;
    private dropIndex: number;

    _contentAreaDimensions: ContentAreaDimensions;

    header: HeaderComponent;

    subscription: Subscription;

    constructor(
        dockingLayoutService: DockingLayoutService,
        @Inject(ITEM_CONFIG)
            config: ItemConfiguration,
        @Inject(PARENT_ITEM_COMPONENT)
            parent: AbstractContentItemComponent
    ) {
        super(dockingLayoutService, config, parent);

        this.element = $(
            dockingLayoutViewMap.stack.render()
        );
        this.activeContentItem = null;
        const cfg = dockingLayoutService.config;
        this._header = { // defaults' reconstruction from old configuration style
            show: cfg.settings.hasHeaders === true && config.hasHeaders !== false,
            popout: cfg.settings.showPopoutIcon && cfg.labels.popout,
            maximise: cfg.settings.showMaximiseIcon && cfg.labels.maximise,
            close: cfg.settings.showCloseIcon && cfg.labels.close,
            minimise: cfg.labels.minimise,
        };

        if (config.header) {
            Object.assign(this._header, config.header);
        }
        if (config.content && config.content[0] && config.content[0].header) {
            Object.assign(this._header, config.content[0].header);
        }

        this.dropSegment = null;
        this._contentAreaDimensions = null;
        this.dropIndex = null;

        this.isStack = true;

        this.childElementContainer = $(
            dockingLayoutViewMap.stackContent.render()
        );
        this.header = new HeaderComponent(dockingLayoutService, this);

        this.element.append(this.header.element);
        this.element.append(this.childElementContainer);
        this.setupHeaderPosition();
        this._$validateClosability();

    }

    setSize() {
        const headerSize = this._header.show ? this.layoutManager.config.dimensions.headerHeight : 0;
        const contentWidth = this.element.width() - (this._sided ? headerSize : 0);
        const contentHeight = this.element.height() - (!this._sided ? headerSize : 0);

        this.childElementContainer.width(contentWidth);
        this.childElementContainer.height(contentHeight);

        for (let i = 0; i < this.contentItems.length; i++) {
            this.contentItems[i].element.width(contentWidth)
                .height(contentHeight);
        }
        this.emit("resize");
        this.emitBubblingEvent(stateChangedEventType);
    }

    _$init() {
        if (this.isInitialised === true) return;

        let i, initialItem;

        super._$init();

        for (i = 0; i < this.contentItems.length; i++) {
            this.header.createTab(this.contentItems[i]);
            this.contentItems[i]._$hide();
        }

        if (this.contentItems.length > 0) {
            initialItem = this.contentItems[this.config.activeItemIndex || 0];
            this.setActiveContentItem(initialItem);
        }

        if (notNullOrUndefined((this.config as StackConfiguration).publishSelectedItemChange$)) {
            this.subscription = (this.config as StackConfiguration).publishSelectedItemChange$.subscribe(change => {
                if (this.contentItems.find(x => x.config.id === change.id)) {
                    this.setActiveContentItem(this.contentItems.find(x => x.config.id === change.id));
                }
            });
        }

    }

    setActiveContentItem(contentItem) {
        if (this.activeContentItem !== null) {
            this.activeContentItem._$hide();
        }

        this.activeContentItem = contentItem;
        this.header.setActiveContentItem(contentItem);
        contentItem._$show();
        this.emit("activeContentItemChanged", contentItem);
        this.layoutManager.emit("activeContentItemChanged", contentItem);
        this.emitBubblingEvent("stateChanged");

        if ((this.config as StackConfiguration).onSelectedItemChange) {
            (this.config as StackConfiguration).onSelectedItemChange(contentItem.config.id);
        }
    }

    getActiveContentItem() {
        return this.header.activeContentItem;
    }

    addChild(contentItem: AbstractContentItemComponent, index?) {
        super.addChild(contentItem, index);
        this.childElementContainer.append(contentItem.element);
        this.header.createTab(contentItem, index);
        this.setActiveContentItem(contentItem);
        this.callDownwards("setSize");
        this._$validateClosability();
        this.emitBubblingEvent(stateChangedEventType);
    }

    removeChild(contentItem, keepChild) {
        const index = new LayoutManagerUtilities().indexOf(contentItem, this.contentItems);
        super.removeChild(contentItem, keepChild);
        this.header.removeTab(contentItem);
        if (this.header.activeContentItem === contentItem) {
            if (this.contentItems.length > 0) {
                this.setActiveContentItem(this.contentItems[Math.max(index - 1, 0)]);
            } else {
                this.activeContentItem = null;
            }
        }

        this._$validateClosability();
        this.emitBubblingEvent(stateChangedEventType);
    }


    /**
     * Validates that the stack is still closable or not. If a stack is able
     * to close, but has a non closable component added to it, the stack is no
     * longer closable until all components are closable.
     */
    _$validateClosability() {
        let contentItem,
            isClosable,
            len,
            i;

        isClosable = this.header._isClosable();

        for (i = 0, len = this.contentItems.length; i < len; i++) {
            if (!isClosable) break;

            isClosable = this.contentItems[i].config.isClosable;
        }

        this.header._$setClosable(isClosable);
    }

    _$destroy() {
        super._$destroy();
        this.header._$destroy();

        if (notNullOrUndefined(this.subscription) && !this.subscription.closed) {
            this.subscription.unsubscribe();
        }
    }


    /**
     * Ok, this one is going to be the tricky one: The user has dropped {contentItem} onto this stack.
     *
     * It was dropped on either the stacks header or the top, right, bottom or left bit of the content area
     * (which one of those is stored in this.dropSegment). Now, if the user has dropped on the header the case
     * is relatively clear: We add the item to the existing stack... job done (might be good to have
     * tab reordering at some point, but let's not sweat it right now)
     *
     * If the item was dropped on the content part things are a bit more complicated. If it was dropped on either the
     * top or bottom region we need to create a new column and place the items accordingly.
     * Unless, of course if the stack is already within a column... in which case we want
     * to add the newly created item to the existing column...
     * either prepend or append it, depending on whether its top or bottom.
     *
     * Same thing for rows and left / right drop segments... so in total there are 9 things that can potentially happen
     * (left, top, right, bottom) * is child of the right parent (row, column) + header drop
     */
    _$onDrop(contentItem: AbstractContentItemComponent) {

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
            stack = this.layoutManager.createContentItem({
                type: "stack",
                header: contentItem.config.header || {}
            }, this);
            stack._$init();
            stack.addChild(contentItem);
            contentItem = stack;
        }

        /*
         * If the item is dropped on top or bottom of a column or left and right of a row, it's already
         * layd out in the correct way. Just add it as a child
         */
        if (hasCorrectParent) {
            index = new LayoutManagerUtilities().indexOf(this, this.parent.contentItems);
            this.parent.addChild(contentItem, insertBefore ? index : index + 1, true);
            this.config[dimension] *= 0.5;
            contentItem.config[dimension] = this.config[dimension];
            this.parent.callDownwards("setSize");
            /*
             * This handles items that are dropped on top or bottom of a row or left / right of a column. We need
             * to create the appropriate contentItem for them to live in
             */
        } else {
            type = isVertical ? "column" : "row";
            rowOrColumn = this.layoutManager.createContentItem({type}, this);
            this.parent.replaceChild(this, rowOrColumn);

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
        let segment, area;

        for (segment in this._contentAreaDimensions) {
            area = this._contentAreaDimensions[segment].hoverArea;

            if (area.x1 < x && area.x2 > x && area.y1 < y && area.y2 > y) {

                if (segment === DropSegment.Header) {
                    this.dropSegment = DropSegment.Header;
                    this.highlightHeaderDropZone(this._sided ? y : x);
                } else {
                    this.resetHeaderDropZone();
                    this._highlightBodyDropZone(segment);
                }

                return;
            }
        }
    }

    _$getArea() {
        if (this.element.is(":visible") === false) {
            return null;
        }

        const getArea = super._$getArea,
            headerArea = getArea.call(this, this.header.element),
            contentArea = getArea.call(this, this.childElementContainer),
            contentWidth = contentArea.x2 - contentArea.x1,
            contentHeight = contentArea.y2 - contentArea.y1;

        this._contentAreaDimensions = {
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

            this._contentAreaDimensions.body = {
                hoverArea: contentArea,
                highlightArea: contentArea
            };

            return getArea.call(this, this.element);
        }

        this._contentAreaDimensions.left = {
            hoverArea: {
                ...contentArea,
                x2: contentArea.x1 + contentWidth * 0.25
            },
            highlightArea: {
                ...contentArea,
                x2: contentArea.x1 + contentWidth * 0.5
            }
        };

        this._contentAreaDimensions.top = {
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

        this._contentAreaDimensions.right = {
            hoverArea: {
                ...contentArea,
                x1: contentArea.x1 + contentWidth * 0.75
            },
            highlightArea: {
                ...contentArea,
                x1: contentArea.x1 + contentWidth * 0.5
            }
        };

        this._contentAreaDimensions.bottom = {
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
        let i,
            tabElement,
            tabsLength = this.header.tabs.length,
            isAboveTab = false,
            tabTop,
            tabLeft,
            offset,
            placeHolderTop,
            placeHolderLeft,
            headerOffset,
            tabWidth,
            halfX;

        // Empty stack
        if (tabsLength === 0) {
            headerOffset = this.header.element.offset();

            this.layoutManager.dropTargetIndicator.highlightArea({
                x1: headerOffset.left,
                x2: headerOffset.left + 100,
                y1: headerOffset.top + this.header.element.height() - 20,
                y2: headerOffset.top + this.header.element.height()
            });

            return;
        }

        for (i = 0; i < tabsLength; i++) {
            tabElement = this.header.tabs[i].element;
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
            tabElement.before(this.layoutManager.tabDropPlaceholder.$element);
        } else {
            this.dropIndex = Math.min(i + 1, tabsLength);
            tabElement.after(this.layoutManager.tabDropPlaceholder.$element);
        }


        if (this._sided) {
            placeHolderTop = this.layoutManager.tabDropPlaceholder.offset().top;
            this.layoutManager.dropTargetIndicator.highlightArea({
                x1: tabTop,
                x2: tabTop + tabElement.innerHeight(),
                y1: placeHolderTop,
                y2: placeHolderTop + this.layoutManager.tabDropPlaceholder.width()
            });
            return;
        }
        placeHolderLeft = this.layoutManager.tabDropPlaceholder.offset().left;

        this.layoutManager.dropTargetIndicator.highlightArea({
            x1: placeHolderLeft,
            x2: placeHolderLeft + this.layoutManager.tabDropPlaceholder.width(),
            y1: tabTop,
            y2: tabTop + tabElement.innerHeight()
        });
    }

    private resetHeaderDropZone() {
        this.layoutManager.tabDropPlaceholder.remove();
    }

    private setupHeaderPosition() {
        const side = sides.indexOf(this._header.show) >= 0 && this._header.show;
        this.header.element.toggle(!!this._header.show);
        this._side = side;
        this._sided = [Side.Right, Side.Left].indexOf(this._side) >= 0;
        this.element.removeClass(lmLeftClassName + " " + lmRightClassName + " " + lmBottomClassName);
        if (this._side) {
            this.element.addClass("lm_" + this._side);
        }
        if (this.element.find("." + lmHeaderClassName).length && this.childElementContainer) {
            const headerPosition = [Side.Right, Side.Bottom].indexOf(this._side) >= 0 ? "before" : "after";
            this.header.element[headerPosition](this.childElementContainer);
            this.callDownwards("setSize");
        }
    }

    private _highlightBodyDropZone(segment: keyof ContentAreaDimensions) {
        const highlightArea = this._contentAreaDimensions[segment].highlightArea;
        this.layoutManager.dropTargetIndicator.highlightArea(highlightArea);
        this.dropSegment = segment;
    }

}

