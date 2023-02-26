import { dockingLayoutViewMap } from "../../docking-layout/views";
import { EventEmitter } from "../utilities";
import { AbstractContentItemComponent } from "./abstract-content-item.component";
import { HeaderButtonComponent } from "./header-button.component";
import { TabComponent } from "./tab.component";
import { StackComponent } from "./stack.component";
import { DropSegment } from "../models/drop-segment.model";
import { DockingLayoutService } from "../docking-layout.service";
import { widthOrHeight } from "../functions/width-or-height.function";
import { stateChangedEventType } from "../constants/event-types/state-changed-event-type.constant";
import { tabsClassName } from "../constants/class-names/tabs-class-name.constant";
import { tabDropdownListClassName } from "../constants/class-names/tabs-dropdown-list-class-name.constant";
import { controlsClassName } from "../constants/class-names/controls-class-name.constant";
import { selectableClassName } from "../constants/class-names/selectable-class-name.constant";

/**
 * This class represents a header above a Stack ContentItem.
 */
export class HeaderComponent extends EventEmitter {

    readonly element: JQuery<HTMLElement>;
    readonly rawElement: HTMLElement;
    readonly tabs: Array<TabComponent>;
    activeContentItem: any;
    private tabsContainer: JQuery<HTMLElement>;
    private tabDropdownContainer: JQuery<HTMLElement>;
    private controlsContainer: JQuery<HTMLElement>;
    private closeButton: any;
    private tabDropdownButton: any;
    private readonly hideAdditionalTabsDropdown: any;
    private _lastVisibleTabIndex: number;
    private readonly _tabControlOffset: any;

    constructor(
        private readonly layoutManager: DockingLayoutService,
        readonly parent: StackComponent
    ) {
        super();

        this.element = $(dockingLayoutViewMap.header.render());
        this.rawElement = this.element[0];

        if (this.layoutManager.config.settings.selectionEnabled === true) {
            this.element.addClass(selectableClassName);

            this.rawElement.addEventListener("click", (x) => this.onHeaderClick(x), {
                passive: true
            });
            this.rawElement.addEventListener("touchstart", (x) => this.onHeaderClick(x), {
                passive: true
            });

        }

        this.tabsContainer = this.element.find("." + tabsClassName);
        this.tabDropdownContainer = this.element.find("." + tabDropdownListClassName);
        this.tabDropdownContainer.hide();
        this.controlsContainer = this.element.find("." + controlsClassName);
        this.parent.on("resize", this.updateTabSizes, this);
        this.tabs = [];
        this.activeContentItem = null;
        this.closeButton = null;
        this.tabDropdownButton = null;
        this.hideAdditionalTabsDropdown = () => this._hideAdditionalTabsDropdown();
        $(document)
            .mouseup(this.hideAdditionalTabsDropdown);

        this._lastVisibleTabIndex = -1;
        this._tabControlOffset = this.layoutManager.config.settings.tabControlOffset;
        this.createControls();
    }

    /**
     * Creates a new tab and associates it with a contentItem
     */
    createTab(contentItem: AbstractContentItemComponent, index?: number): void {
        let tab: TabComponent;

        // If there's already a tab relating to the
        // content item, don't do anything
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].contentItem === contentItem) {
                return;
            }
        }

        tab = new TabComponent(this, contentItem);

        if (this.tabs.length === 0) {
            this.tabs.push(tab);
            this.tabsContainer.append(tab.element);
            return;
        }

        if (index === undefined) {
            index = this.tabs.length;
        }

        if (index > 0) {
            this.tabs[index - 1].element.after(tab.element);
        } else {
            this.tabs[0].element.before(tab.element);
        }

        this.tabs.splice(index, 0, tab);
        this.updateTabSizes();
    }

    /**
     * Finds a tab based on the contentItem its associated with and removes it.
     */
    removeTab(contentItem: AbstractContentItemComponent): void {
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].contentItem === contentItem) {
                this.tabs[i].destroy();
                this.tabs.splice(i, 1);
                return;
            }
        }
    }

    /**
     * The programmatical equivalent of clicking a Tab.
     */
    setActiveContentItem(contentItem: AbstractContentItemComponent) {
        let i: number, j: number, isActive: boolean, activeTab: TabComponent;

        for (i = 0; i < this.tabs.length; i++) {
            isActive = this.tabs[i].contentItem === contentItem;
            this.tabs[i].setActive(isActive);
            if (isActive === true) {
                this.activeContentItem = contentItem;
                this.parent.config.activeItemIndex = i;
            }
        }

        if (this.layoutManager.config.settings.reorderOnTabMenuClick) {
            /**
             * If the tab selected was in the dropdown, move everything down one to make way for this one to be the first.
             * This will make sure the most used tabs stay visible.
             */
            if (this._lastVisibleTabIndex !== -1 && this.parent.config.activeItemIndex > this._lastVisibleTabIndex) {
                activeTab = this.tabs[this.parent.config.activeItemIndex];
                for (j = this.parent.config.activeItemIndex; j > 0; j--) {
                    this.tabs[j] = this.tabs[j - 1];
                }
                this.tabs[0] = activeTab;
                this.parent.config.activeItemIndex = 0;
            }
        }

        this.updateTabSizes();
        this.parent.emitBubblingEvent(stateChangedEventType);
    }

    /**
     * Programmatically operate with header position.
     *
     * @param {string} position one of ('top','left','right','bottom') to set or empty to get it.
     *
     * @returns {string} previous header position
     */
    position(position) {
        let previous = this.parent._header.show;
        if (previous && !this.parent._side) {
            previous = DropSegment.Top;
        }
        if (position !== undefined && this.parent._header.show !== position) {
            this.parent._header.show = position;
        }
        return previous;
    }

    /**
     * Programmatically set closability.
     *
     * @package private
     * @param {Boolean} isClosable Whether to enable/disable closability.
     *
     * @returns {Boolean} Whether the action was successful
     */
    _$setClosable(isClosable) {
        if (this.closeButton && this.isClosable()) {
            this.closeButton.element[isClosable ? "show" : "hide"]();
            return true;
        }

        return false;
    }

    /**
     * Destroys the entire header
     */
    destroy(): void {
        this.emit("destroy", this);

        for (let i = 0; i < this.tabs.length; i++) {
            this.tabs[i].destroy();
        }
        $(document)
            .off("mouseup", this.hideAdditionalTabsDropdown);
        this.element.remove();
    }

    /**
     * get settings from header
     */
    _getHeaderSetting(name: string): string {
        if (name in this.parent._header) {
            return this.parent._header[name];
        }
    }

    /**
     * Creates the popout, maximise and close buttons in the header's top right corner
     */
    private createControls(): void {
        let closeStack,
            label: string,
            tabDropdownLabel: string,
            showTabDropdown;

        /**
         * Dropdown to show additional tabs.
         */
        showTabDropdown = () => this.showAdditionalTabsDropdown();
        tabDropdownLabel = this.layoutManager.config.labels.tabDropdown;
        this.tabDropdownButton = new HeaderButtonComponent(this, tabDropdownLabel, "lm_tabdropdown", showTabDropdown);
        this.tabDropdownButton.element.hide();


        /**
         * Close button
         */
        if (this.isClosable()) {
            closeStack = () => this.parent.remove();
            label = this._getHeaderSetting("close");
            this.closeButton = new HeaderButtonComponent(this, label, "lm_close", closeStack);
        }
    }

    /**
     * Shows drop down for additional tabs when there are too many to display.
     */
    private showAdditionalTabsDropdown(): void {
        this.tabDropdownContainer.show();
    }

    /**
     * Hides drop down for additional tabs when there are too many to display.
     */
    _hideAdditionalTabsDropdown(): void {
        this.tabDropdownContainer.hide();
    }

    /**
     * Checks whether the header is closable based on the parent config and
     * the global config.
     */
    isClosable(): boolean {
        return this.parent.config.isClosable && this.layoutManager.config.settings.showCloseIcon;
    }

    /**
     * Invoked when the header's background is clicked (not it's tabs or controls)
     */
    private onHeaderClick(event: Event): void {
        if (event.target === this.element[0]) {
            this.parent.select();
        }
    }

    /**
     * Pushes the tabs to the tab dropdown if the available space is not sufficient
     */
    private updateTabSizes(showTabMenu?: boolean): void {
        if (this.tabs.length === 0) return;

        // Show the menu based on function argument
        this.tabDropdownButton.element.toggle(showTabMenu === true);

        this.element.css(widthOrHeight(!this.parent._sided), "");
        this.element[widthOrHeight(this.parent._sided)](this.layoutManager.config.dimensions.headerHeight);
        let availableWidth = this.element.outerWidth() - this.controlsContainer.outerWidth() - this._tabControlOffset,
            cumulativeTabWidth = 0,
            visibleTabWidth = 0,
            tabElement: JQuery<HTMLElement>,
            i: number,
            j: number,
            marginLeft: string,
            overlap = 0,
            tabWidth: number,
            tabOverlapAllowance = this.layoutManager.config.settings.tabOverlapAllowance,
            tabOverlapAllowanceExceeded = false,
            activeIndex = (this.activeContentItem ? this.tabs.indexOf(this.activeContentItem.tab) : 0),
            activeTab = this.tabs[activeIndex];
        if (this.parent._sided) {
            availableWidth = this.element.outerHeight() - this.controlsContainer.outerHeight() - this._tabControlOffset;
        }
        this._lastVisibleTabIndex = -1;

        for (i = 0; i < this.tabs.length; i++) {
            tabElement = this.tabs[i].element;

            // Put the tab in the tabContainer so its true width can be checked
            this.tabsContainer.append(tabElement);
            tabWidth = tabElement.outerWidth() + parseInt(tabElement.css("margin-right"), 10);

            cumulativeTabWidth += tabWidth;

            // Include the active tab's width if it isn't already
            // This is to ensure there is room to show the active tab
            if (activeIndex <= i) {
                visibleTabWidth = cumulativeTabWidth;
            } else {
                visibleTabWidth = cumulativeTabWidth + activeTab.element.outerWidth() + parseInt(activeTab.element.css("margin-right"), 10);
            }

            // If the tabs won't fit, check the overlap allowance.
            if (visibleTabWidth > availableWidth) {

                // Once allowance is exceeded, all remaining tabs go to menu.
                if (!tabOverlapAllowanceExceeded) {

                    // No overlap for first tab or active tab
                    // Overlap spreads among non-active, non-first tabs
                    if (activeIndex > 0 && activeIndex <= i) {
                        overlap = (visibleTabWidth - availableWidth) / (i - 1);
                    } else {
                        overlap = (visibleTabWidth - availableWidth) / i;
                    }

                    // Check overlap against allowance.
                    if (overlap < tabOverlapAllowance) {
                        for (j = 0; j <= i; j++) {
                            marginLeft = (j !== activeIndex && j !== 0) ? "-" + overlap + "px" : "";
                            this.tabs[j].element.css({"z-index": i - j, "margin-left": marginLeft});
                        }
                        this._lastVisibleTabIndex = i;
                        this.tabsContainer.append(tabElement);
                    } else {
                        tabOverlapAllowanceExceeded = true;
                    }

                } else if (i === activeIndex) {
                    // Active tab should show even if allowance exceeded. (We left room.)
                    tabElement.css({"z-index": "auto", "margin-left": ""});
                    this.tabsContainer.append(tabElement);
                }

                if (tabOverlapAllowanceExceeded && i !== activeIndex) {
                    if (showTabMenu) {
                        // Tab menu already shown, so we just add to it.
                        tabElement.css({"z-index": "auto", "margin-left": ""});
                        this.tabDropdownContainer.append(tabElement);
                    } else {
                        // We now know the tab menu must be shown, so we have to recalculate everything.
                        this.updateTabSizes(true);
                        return;
                    }
                }

            } else {
                this._lastVisibleTabIndex = i;
                tabElement.css({"z-index": "auto", "margin-left": ""});
                this.tabsContainer.append(tabElement);
            }
        }

    }

}

