import { EventEmitter } from "../../utilities";
import { TabComponent } from "./tab.component";
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

    }

    destroy(): void {
        this.emit(destroyEventType, this);
        this.element.remove();
    }


}

