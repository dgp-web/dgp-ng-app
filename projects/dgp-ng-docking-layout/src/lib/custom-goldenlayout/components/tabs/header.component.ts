import { EventEmitter } from "../../utilities";
import { TabComponent } from "./tab.component";
import { widthOrHeight } from "../../functions/width-or-height.function";
import { tabsClassName } from "../../constants/class-names/tabs-class-name.constant";
import { selectableClassName } from "../../constants/class-names/selectable-class-name.constant";
import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter as NgEventEmitter,
    HostBinding,
    Input,
    Output,
    ViewContainerRef
} from "@angular/core";
import { destroyEventType } from "../../constants/event-types/destroy-event-type.constant";
import { ComponentConfiguration, LayoutConfiguration, StackConfiguration } from "../../types";
import { DragStartEvent } from "../../models/drag-start-event.model";

/**
 * This class represents a header above a Stack ContentItem.
 */
@Component({
    selector: "dgp-gl-header",
    template: `
        <ul class="lm_tabs card-header-tabs nav nav-tabs">
            <dgp-gl-tab *ngFor="let componentConfig of stackConfig.content"
                        [model]="componentConfig"
                        [isActive]="activeContentItem?.id === componentConfig.id"
                        (dragStart)="propagateDragStart($event, componentConfig)"
                        (selected)="propagateSelected(componentConfig)"></dgp-gl-tab>
        </ul>
    `
})
export class HeaderComponent extends EventEmitter implements AfterViewInit {

    @HostBinding("class.lm_header")
    @HostBinding("class.card-header")
    readonly bindings = true;

    readonly element = $(this.elementRef.nativeElement);
    readonly tabs = new Array<TabComponent>();
    activeContentItem: ComponentConfiguration;
    private tabsContainer: JQuery<HTMLElement>;
    private controlsContainer: JQuery<HTMLElement>;
    private lastVisibleTabIndex = -1;

    @Input()
    rootConfig: LayoutConfiguration;

    @Input()
    sided: boolean;

    @Input()
    stackConfig: StackConfiguration;

    @Output()
    readonly selectedContentItemChange = new NgEventEmitter<ComponentConfiguration>();

    @Output()
    readonly dragStart = new NgEventEmitter<{
        readonly contentItem: ComponentConfiguration;
    } & DragStartEvent>();

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly elementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    ngAfterViewInit(): void {
        if (this.rootConfig.settings.selectionEnabled === true) {
            this.element.addClass(selectableClassName);
        }
        this.tabsContainer = this.element.find("." + tabsClassName);
    }

    propagateDragStart(event: DragStartEvent, componentConfig: ComponentConfiguration) {
        this.dragStart.emit({
            contentItem: componentConfig,
            dragListener: event.dragListener,
            coordinates: event.coordinates
        });
    }

    propagateSelected(componentConfig: ComponentConfiguration) {
        this.selectedContentItemChange.emit(componentConfig);
    }


    /**
     * Finds a tab based on the contentItem its associated with and removes it.
     */
    removeTab(contentItem: ComponentConfiguration): void {
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].model.id === contentItem.id) {
                this.tabs.splice(i, 1);
                return;
            }
        }
    }

    /**
     * The programmatical equivalent of clicking a Tab.
     */
    setActiveContentItem(contentItem: ComponentConfiguration) {
        for (let i = 0; i < this.stackConfig.content.length; i++) {
            let isActive = this.stackConfig.content[i].id === contentItem.id;

            if (isActive === true) {
                this.activeContentItem = contentItem;
                this.stackConfig.activeItemIndex = i;
            }
        }

        if (this.rootConfig.settings.reorderOnTabMenuClick) {
            /**
             * If the tab selected was in the dropdown, move everything down one to make way for this one to be the first.
             * This will make sure the most used tabs stay visible.
             */
            if (this.lastVisibleTabIndex !== -1 && this.stackConfig.activeItemIndex > this.lastVisibleTabIndex) {
                let activeTab = this.tabs[this.stackConfig.activeItemIndex];
                for (let j = this.stackConfig.activeItemIndex; j > 0; j--) {
                    this.tabs[j] = this.tabs[j - 1];
                }
                this.tabs[0] = activeTab;
                this.stackConfig.activeItemIndex = 0;
            }
        }

        this.updateTabSizes();
    }

    destroy(): void {
        this.emit(destroyEventType, this);
        this.element.remove();
    }


    /**
     * Pushes the tabs to the tab dropdown if the available space is not sufficient
     */
    updateTabSizes(showTabMenu?: boolean): void {
        if (this.tabs.length === 0) return;

        this.element.css(widthOrHeight(!this.sided), "");
        this.element[widthOrHeight(this.sided)](this.rootConfig.dimensions.headerHeight);
        let availableWidth = this.element.outerWidth() - this.controlsContainer.outerWidth(),
            cumulativeTabWidth = 0,
            visibleTabWidth = 0,
            tabElement: JQuery<HTMLElement>,
            i: number,
            j: number,
            marginLeft: string,
            overlap = 0,
            tabWidth: number,
            tabOverlapAllowance = this.rootConfig.settings.tabOverlapAllowance,
            tabOverlapAllowanceExceeded = false,
            activeIndex = (this.activeContentItem ? this.stackConfig.content.indexOf(this.activeContentItem) : 0),
            activeTab = this.tabs[activeIndex];
        if (this.sided) {
            availableWidth = this.element.outerHeight() - this.controlsContainer.outerHeight();
        }
        this.lastVisibleTabIndex = -1;

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
                        this.lastVisibleTabIndex = i;
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
                    // We now know the tab menu must be shown, so we have to recalculate everything.
                    this.updateTabSizes(true);
                    return;
                }

            } else {
                this.lastVisibleTabIndex = i;
                tabElement.css({"z-index": "auto", "margin-left": ""});
                this.tabsContainer.append(tabElement);
            }
        }

    }

}

