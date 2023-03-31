import { Directive } from "@angular/core";
import { DockingLayoutService } from "../../docking-layout.service";
import { HeaderConfig, ItemConfiguration, itemDefaultConfig } from "../../types";
import { BubblingEvent, EventEmitter, LayoutManagerUtilities } from "../../utilities";
import { AreaSides } from "../../models/area.model";
import { ALL_EVENT } from "../../constants/event-types/all-event.constant";
import { stateChangedEventType } from "../../constants/event-types/state-changed-event-type.constant";
import { StackComponent } from "../tabs/stack.component";
import { DropSegment } from "../../models/drop-segment.model";
import { RootComponent } from "../root.component";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AbstractContentItemComponent extends EventEmitter {

    _side: boolean | DropSegment;
    _sided: boolean;
    _header: HeaderConfig;

    contentItems: (AbstractContentItemComponent | StackComponent)[] = [];

    isInitialised = false;
    isRoot = false;
    isRow = false;
    isColumn = false;
    isStack = false;
    isComponent = false;

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
            this.parent.removeChild(this);
        }
    }

    addChild(contentItem: AbstractContentItemComponent, index?: number, foo?: boolean) {
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
    }

    replaceChild(oldChild: AbstractContentItemComponent, newChild: AbstractContentItemComponent, destroyOldChild?: boolean) {

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
            newChild.init();
        }

        this.callDownwards("setSize");
    }

    remove() {
        this.parent.removeChild(this);
    }

    _$setParent(parent: AbstractContentItemComponent) {
        this.parent = parent;
    }

    highlightDropZone(x: number, y: number, area: AreaSides) {
        this.dockingLayoutService.dropTargetIndicator.highlightArea(area);
    }

    destroy() {
        this.unsubscribe();
        this.callDownwards("destroy", [], true, true);
        this.element.remove();
    }

    init(): void {
        for (let i = 0; i < this.contentItems.length; i++) {
            this.childElementContainer.append(this.contentItems[i].element);
        }

        this.isInitialised = true;
    }

    emitBubblingEvent(name: string) {
        const event = new BubblingEvent(name, this);
        this.emit(name, event);
    }

    private createContentItems(config: ItemConfiguration) {
        this.contentItems = config.content.map(x => this.dockingLayoutService.createContentItem(x, this));
    }

    private propagateEvent(name: string, event: BubblingEvent) {
        if (event instanceof BubblingEvent &&
            event.isPropagationStopped === false &&
            this.isInitialised === true) {

            if (this.isRoot === false && this.parent) {
                (this.parent as AbstractContentItemComponent).emit?.apply(this.parent, Array.prototype.slice.call(arguments, 0));
            } else {
                this.scheduleEventPropagationToLayoutManager(name, event);
            }
        }
    }

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

    private propagateEventToLayoutManager(name: string, event) {
        this.pendingEventPropagations[name] = false;
        this.dockingLayoutService.emit(name, event);
    }
}

