import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    EmbeddedViewRef,
    Input,
    OnDestroy,
    QueryList,
    TemplateRef,
    ViewContainerRef
} from "@angular/core";
import { KeyValueStore } from "entity-store";
import { ResizeSensor } from "css-element-queries";
import { timer } from "rxjs";
import { LayoutManager } from "../custom-goldenlayout";
import { createGuid } from "dgp-ng-app";
import { SplitPanelContentComponent } from "./split-panel-content.component";
import { SplitPanelOrientation } from "./models";
import { createComponentTree, createLayoutConfig } from "./functions";

@Component({
    selector: "dgp-split-panel",
    template: "<ng-content></ng-content>",
    styles: [`
        :host {
            flex-grow: 1;
            display: flex;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitPanelComponent implements OnDestroy, AfterViewInit {

    private embeddedViewRefs: KeyValueStore<EmbeddedViewRef<any>> = {};
    private resizeSensor: ResizeSensor;

    @ContentChildren(SplitPanelContentComponent)
    topLevelItems: QueryList<SplitPanelContentComponent>;

    @Input()
    orientation: SplitPanelOrientation = "vertical";

    layout: LayoutManager;

    constructor(private readonly vcRef: ViewContainerRef,
                private readonly elRef: ElementRef
    ) {
    }

    static destroyEmbeddedView(id: string, context: SplitPanelComponent): void {
        const embeddedViewRef = context.embeddedViewRefs[id];
        delete context.embeddedViewRefs[id];
        if (embeddedViewRef) embeddedViewRef.destroy();
    }

    ngAfterViewInit(): void {
        this.topLevelItems.changes.subscribe(() => this.redraw());
        this.redraw();
    }

    ngOnDestroy(): void {
        Object.keys(this.embeddedViewRefs).forEach(key => this.embeddedViewRefs[key].destroy());
        this.destroyLayout();
    }

    private redraw(): void {
        this.destroyLayout();

        const componentConfigurations = this.topLevelItems.toArray().map(x => x.configuration);

        const root = createComponentTree({
            content: componentConfigurations,
            orientation: this.orientation
        });

        this.layout = new LayoutManager(createLayoutConfig(root), this.elRef.nativeElement);

        componentConfigurations.forEach(componentConfig => {
            this.layout.registerComponent(componentConfig.id, (container, component) => {
                const instanceId = createGuid();
                container.on("open",
                    () => this.createEmbeddedView(instanceId, component.template(), container.getElement(), this)
                );
                container.on("destroy",
                    () => SplitPanelComponent.destroyEmbeddedView(instanceId, this)
                );
            });
        });


        this.initLayout();
    }

    private createEmbeddedView(id: string, template: TemplateRef<any>, element$: any, context: SplitPanelComponent): void {
        const embeddedViewRef = context.vcRef.createEmbeddedView(template);
        context.embeddedViewRefs[id] = embeddedViewRef;
        const detached = $(embeddedViewRef.rootNodes)
            .detach();
        element$.append(detached);

        timer(250).subscribe(() => embeddedViewRef.markForCheck());
    }

    private initLayout() {
        this.layout.init();

        const element = this.elRef.nativeElement;
        this.resizeSensor = new ResizeSensor(element, () => this.updateLayout());
    }

    private updateLayout() {
        this.layout.updateSize();
    }

    private destroyLayout() {
        if (this.resizeSensor) this.resizeSensor.detach();
        if (this.layout) this.layout.destroy();
    }

}
