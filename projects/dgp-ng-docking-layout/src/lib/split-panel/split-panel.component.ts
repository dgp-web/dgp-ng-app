import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    EmbeddedViewRef,
    Input,
    OnChanges,
    OnDestroy,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef
} from "@angular/core";
import { KeyValueStore } from "entity-store";
import { ResizeSensor } from "css-element-queries";
import { timer } from "rxjs";
import { uniqBy } from "lodash";
import { ComponentConfiguration, ItemConfiguration, LayoutManager } from "../custom-goldenlayout";
import { createGuid } from "dgp-ng-app";
import { SplitPanelContentComponent } from "./split-panel-content.component";

declare var $: any;

@Component({
    selector: "dgp-split-panel",
    template: "<ng-content></ng-content>",
    styles: [`
        :host {
            flex-grow: 1;
            display: flex;
            height: 100%;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitPanelComponent implements OnChanges, OnDestroy, AfterViewInit {

    @ContentChildren(SplitPanelContentComponent) topLevelItems: QueryList<SplitPanelContentComponent>;

    @Input()
    orientation: "horizontal" | "vertical" = "vertical";

    // Settings
    @Input() hasHeaders = false;
    @Input() constrainDragToContainer = true;
    @Input() reorderEnabled = false;
    @Input() selectionEnabled = false;
    @Input() popoutWholeStack = false;
    @Input() blockedPopoutsThrowError = true;
    @Input() closePopoutsOnUnload = true;
    @Input() showPopoutIcon = false;
    @Input() showMaximiseIcon = false;
    @Input() showCloseIcon = false;
    // Dimensions
    @Input() borderWidth = 5;
    @Input() minItemHeight = 10;
    @Input() minItemWidth = 10;
    @Input() headerHeight = 20;
    @Input() dragProxyWidth = 300;
    @Input() dragProxyHeight = 200;
    // Labels
    @Input() closeLabel = "close";
    @Input() maximizeLabel = "maximize";
    @Input() minimizeLabel = "minimize";
    @Input() popoutLabel = "open in new window";

    layout: any;

    private embeddedViewRefs: KeyValueStore<EmbeddedViewRef<any>> = {};
    private resizeSensor: ResizeSensor;

    constructor(private readonly vcRef: ViewContainerRef,
                private readonly elRef: ElementRef,
    ) {

    }

    ngOnDestroy(): void {
        Object.keys(this.embeddedViewRefs)
            .forEach(key => {
                this.embeddedViewRefs[key].destroy();
            });

        if (this.resizeSensor) this.resizeSensor.detach();
        if (this.layout) this.layout.destroy();
    }

    ngAfterViewInit(): void {
        this.topLevelItems.changes.subscribe(
            () => this.redraw()
        );

        this.redraw();
    }

    redraw(): void {
        // if (changes["content"]) {
        if (this.layout) this.layout.destroy();
        if (this.resizeSensor) this.resizeSensor.detach();

        const content = this.topLevelItems.toArray()
            .map(x => x.configuration);

        // if vertical --> create column, then row, then stack

        const topContent = {
            type: "column",
            id: createGuid(),
            content: []
        };

        const content1: any = content.forEach(x => {

            topContent.content.push({
                type: "row",
                id: createGuid(),
                content: [{
                    type: "stack",
                    id: createGuid(),
                    content: [
                        x
                    ]
                }]
            });

        });

        console.log(content1);

        const components = this.getComponents([topContent] as any);
        const uniqComponents = uniqBy(components, item => item.id);

        const config: any = {
            content: [topContent],
            labels: {
                close: this.closeLabel,
                maximise: this.maximizeLabel,
                minimise: this.minimizeLabel,
                popout: this.popoutLabel
            },
            settings: {
                hasHeaders: this.hasHeaders,
                constrainDragToContainer: this.constrainDragToContainer,
                reorderEnabled: this.reorderEnabled,
                selectionEnabled: this.selectionEnabled,
                popoutWholeStack: this.popoutWholeStack,
                blockedPopoutsThrowError: this.blockedPopoutsThrowError,
                closePopoutsOnUnload: this.closePopoutsOnUnload,
                showPopoutIcon: this.showPopoutIcon,
                showMaximiseIcon: this.showMaximiseIcon,
                showCloseIcon: this.showCloseIcon
            },
            dimensions: {
                borderWidth: this.borderWidth,
                minItemHeight: this.minItemHeight,
                minItemWidth: this.minItemWidth,
                headerHeight: this.headerHeight,
                dragProxyWidth: this.dragProxyWidth,
                dragProxyHeight: this.dragProxyHeight
            }
        };

        this.layout = new LayoutManager(config, this.elRef.nativeElement);

        // TODO: Type container and state
        uniqComponents.forEach(component => {

            this.layout.registerComponent(component.id, (container, componentState) => {

                const id = createGuid();

                container.on("open", () => {
                    this.createEmbeddedView(id, componentState.template(), container.getElement(), this);
                });

                container.on("destroy", () => {
                    this.destroyEmbeddedView(id, this);
                });

            });

        });

        this.layout.init();

        const element = this.elRef.nativeElement;
        this.resizeSensor = new ResizeSensor(element, () => this.updateLayout());
    }

    public ngOnChanges(changes: SimpleChanges): void {

    }

    private getComponents(content: ItemConfiguration[]): ComponentConfiguration[] {
        let result: ComponentConfiguration[] = [];

        content.forEach(item => {
            if (item.type === "component") {
                result.push(item as ComponentConfiguration);
            } else {
                result = result.concat(this.getComponents((item as any).content));
            }
        });

        return result;
    }

    updateLayout(): void {
        this.layout.updateSize();
    }

    private createEmbeddedView(id: string, template: TemplateRef<any>, element$: any, context: SplitPanelComponent): void {
        const embeddedViewRef = context.vcRef.createEmbeddedView(template);
        context.embeddedViewRefs[id] = embeddedViewRef;
        const detached = $(embeddedViewRef.rootNodes)
            .detach();
        element$.append(detached);

        timer(250).subscribe(() => {
            embeddedViewRef.markForCheck();
        });
    }

    private destroyEmbeddedView(id: string, context: SplitPanelComponent): void {
        const embeddedViewRef = context.embeddedViewRefs[id];
        delete context.embeddedViewRefs[id];
        if (embeddedViewRef) embeddedViewRef.destroy();
    }

}
