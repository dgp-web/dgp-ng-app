import { AbstractContentItemComponent } from "./shared/abstract-content-item.component";
import { ItemContainerComponent } from "./grid/item-container.component";
import { ChangeDetectionStrategy, Component, Directive, ElementRef, forwardRef, Inject } from "@angular/core";
import { DockingLayoutService } from "../docking-layout.service";
import { ComponentConfiguration, ITEM_CONFIG, ItemConfiguration, itemDefaultConfig, PARENT_ITEM_COMPONENT } from "../types";
import { BubblingEvent, EventEmitter, LayoutManagerUtilities } from "../utilities";
import { StackComponent } from "./tabs/stack.component";
import { stateChangedEventType } from "../constants/event-types/state-changed-event-type.constant";
import { RootComponent } from "./root.component";
import { ALL_EVENT } from "../constants/event-types/all-event.constant";
import { AreaSides } from "../models/area.model";
import { beforeItemDestroyedEventType } from "../constants/event-types/before-item-destroyed-event-type.constant";
import { itemDestroyedEventType } from "../constants/event-types/item-destroyed-event-type.constant";
import { itemCreatedEventType } from "../constants/event-types/item-created-event-type.constant";
import { createItemTypeCreatedEventType } from "../functions/create-item-type-created-event-type.function";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class ComponentAbstractContentItemComponent extends EventEmitter {

    contentItems: (AbstractContentItemComponent | StackComponent)[] = [];

    isInitialised = false;
    element: JQuery;
    childElementContainer: JQuery;

    pendingEventPropagations = {};
    throttledEvents = [stateChangedEventType];

    protected constructor(
        readonly dockingLayoutService: DockingLayoutService,
        readonly config: ItemConfiguration,
        public parent: AbstractContentItemComponent | RootComponent
    ) {
        super();

        this.config = {...itemDefaultConfig, ...config};
        this.on(ALL_EVENT, this.propagateEvent, this);
        if (config.content) this.createContentItems(config);
    }

    callDownwards(functionName: string,
                  functionArguments?: any[],
                  bottomUp?: boolean,
                  skipSelf?: boolean) {
        if (bottomUp !== true && skipSelf !== true) {
            this[functionName].apply(this, functionArguments || []);
        }
        for (let i = 0; i < this.contentItems.length; i++) {
            this.contentItems[i].callDownwards(functionName, functionArguments, bottomUp);
        }
        if (bottomUp === true && skipSelf !== true) {
            this[functionName].apply(this, functionArguments || []);
        }
    }

    removeChild(contentItem: AbstractContentItemComponent, keepChild?: boolean) {

        const index = this.contentItems.indexOf(contentItem);

        if (keepChild !== true) {
            this.contentItems[index].destroy();
        }

        this.contentItems.splice(index, 1);

        this.config.content.splice(index, 1);

        if (this.contentItems.length > 0) {
            this.callDownwards("setSize");

        } else if (this.config.isClosable === true) {
            this.parent.removeChild(this as any);
        }
    }

    remove() {
        this.parent.removeChild(this as any);
    }

    _$setParent(parent: AbstractContentItemComponent) {
        this.parent = parent;
    }

    highlightDropZone(x: number, y: number, area: AreaSides) {
        this.dockingLayoutService.dropTargetIndicator.highlightArea(area);
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
        this.contentItems.filter(x => x.config.type === "stack")
            .map(x => x as StackComponent)
            .map(stack => stack.getActiveContentItem())
            .forEach(component => component[methodName]());
    }

    /**
     * Destroys this item ands its children
     */
    destroy() {
        this.unsubscribe();
        this.emitBubblingEvent(beforeItemDestroyedEventType);
        this.callDownwards("destroy", [], true, true);
        this.element.remove();
        this.emitBubblingEvent(itemDestroyedEventType);
    }

    /**
     * The tree of content items is created in two steps: First all content items are instantiated,
     * then init is called recursively from top to bottem. this is the basic init function,
     * it can be used, extended or overwritten by the content items
     *
     * Its behaviour depends on the content item
     *
     * @package private
     */
    init(): void {
        for (let i = 0; i < this.contentItems.length; i++) {
            this.childElementContainer.append(this.contentItems[i].element);
        }

        this.isInitialised = true;
        this.emitBubblingEvent(itemCreatedEventType);
        this.emitBubblingEvent(createItemTypeCreatedEventType(this.config.type));
    }

    /**
     * Emit an event that bubbles up the item tree.
     */
    emitBubblingEvent(name: string) {
        const event = new BubblingEvent(name, this);
        this.emit(name, event);
    }

    /**
     * Private method, creates all content items for this node at initialisation time
     * PLEASE NOTE, please see addChild for adding contentItems add runtime
     */
    private createContentItems(config: ItemConfiguration) {
        this.contentItems = config.content.map(x => this.dockingLayoutService.createContentItem(x, this as any));
    }

    /**
     * Called for every event on the item tree. Decides whether the event is a bubbling
     * event and propagates it to its parent
     */
    private propagateEvent(name: string, event: BubblingEvent) {
        if (event instanceof BubblingEvent &&
            event.isPropagationStopped === false &&
            this.isInitialised === true) {

            /**
             * In some cases (e.g. if an element is created from a DragSource) it
             * doesn't have a parent and is not below root. If that's the case
             * propagate the bubbling event from the top level of the substree directly
             * to the layoutManager
             */
            if (this.parent) {
                (this.parent as AbstractContentItemComponent).emit?.apply(this.parent, Array.prototype.slice.call(arguments, 0));
            } else {
                this.scheduleEventPropagationToLayoutManager(name, event);
            }
        }
    }

    /**
     * All raw events bubble up to the root element. Some events that
     * are propagated to - and emitted by - the layoutManager however are
     * only string-based, batched and sanitized to make them more usable
     */
    private scheduleEventPropagationToLayoutManager(name: string, event) {
        if (new LayoutManagerUtilities().indexOf(name, this.throttledEvents) === -1) {
            this.dockingLayoutService.emit(name, event.origin);
        } else {
            if (this.pendingEventPropagations[name] !== true) {
                this.pendingEventPropagations[name] = true;
                new LayoutManagerUtilities().animFrame(() => this.propagateEventToLayoutManager(name, event));
            }
        }

    }

    /**
     * Callback for events scheduled by _scheduleEventPropagationToLayoutManager
     */
    private propagateEventToLayoutManager(name: string, event) {
        this.pendingEventPropagations[name] = false;
        this.dockingLayoutService.emit(name, event);
    }
}

@Component({
    selector: "dgp-gl-component",
    template: ``,
    styles: [`
        :host {
            overflow: auto;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlComponent extends ComponentAbstractContentItemComponent {
    private container: ItemContainerComponent;
    isComponent = true;

    constructor(
        @Inject(forwardRef(() => DockingLayoutService))
        public dockingLayoutService: DockingLayoutService,
        @Inject(ITEM_CONFIG)
        public config: ComponentConfiguration,
        @Inject(PARENT_ITEM_COMPONENT)
        public parent: AbstractContentItemComponent,
        private readonly elementRef: ElementRef<HTMLElement>,
    ) {
        super(dockingLayoutService, config, parent);

        this.isComponent = true;

        const vcRef = this.dockingLayoutService.getViewContainerRef();

        const itemContainerComponentRef = vcRef.createComponent(ItemContainerComponent);
        itemContainerComponentRef.instance.config = this.config;
        itemContainerComponentRef.changeDetectorRef.markForCheck();
        this.container = itemContainerComponentRef.instance;

        this.element = $(this.elementRef.nativeElement);
        // move rendered item to container (shouldn't be necessary?)
        this.elementRef.nativeElement.append(itemContainerComponentRef.injector.get(ElementRef).nativeElement);
    }

    setSize() {
    }

    init() {
        super.init();
        this.container.emit("open");
    }

    hide() {
        this.container.hide();
        super.hide();
    }

    show() {
        this.container.show();
        super.show();
    }

    destroy() {
        this.container.emit("destroy", this);
        super.destroy();
    }

}
