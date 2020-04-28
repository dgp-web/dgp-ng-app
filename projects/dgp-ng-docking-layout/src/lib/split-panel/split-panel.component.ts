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
    ViewChild,
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
    template: "<mat-card #host><ng-content></ng-content></mat-card>",
    styles: [`
        :host {
            width: 100vw;
            height: 100vh;
            display: block;
        }

        mat-card {
            padding: 0;
            border-radius: 0;
            flex-grow: 1;
            display: flex;
            height: 100%;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitPanelComponent implements OnDestroy, AfterViewInit {

    private embeddedViewRefs: KeyValueStore<EmbeddedViewRef<any>> = {};
    private resizeSensor: ResizeSensor;

    @ViewChild("host", {read: ElementRef})
    elementRef: ElementRef;

    @ContentChildren(SplitPanelContentComponent)
    topLevelItems: QueryList<SplitPanelContentComponent>;

    @Input()
    orientation: SplitPanelOrientation = "vertical";

    layout: LayoutManager;

    constructor(private readonly viewContainerRef: ViewContainerRef
    ) {
    }

    static destroyEmbeddedView(id: string, context: SplitPanelComponent): void {
        const embeddedViewRef = context.embeddedViewRefs[id];
        delete context.embeddedViewRefs[id];
        if (embeddedViewRef) {
            embeddedViewRef.destroy();
        }
    }

    ngAfterViewInit(): void {
        this.topLevelItems.changes.subscribe(() => this.redraw());
        this.redraw();
    }

    ngOnDestroy(): void {
        Object.keys(this.embeddedViewRefs)
            .forEach(key => this.embeddedViewRefs[key].destroy());
        this.destroyLayout();
    }

    private redraw(): void {
        this.destroyLayout();

        const componentConfigurations = this.topLevelItems.toArray()
            .map(x => x.configuration);

        const root = createComponentTree({
            content: componentConfigurations,
            orientation: this.orientation
        });

        this.layout = new LayoutManager(createLayoutConfig(root), this.elementRef.nativeElement);

        componentConfigurations.forEach(componentConfig => this.layout.registerComponent(componentConfig.id, (container, component) => {
            const instanceId = createGuid();
            container.on("open",
                () => this.createEmbeddedView(instanceId, component.template(), container.getElement(), this)
            );
            container.on("destroy",
                () => SplitPanelComponent.destroyEmbeddedView(instanceId, this)
            );
        }));

        this.initLayout();
    }

    private createEmbeddedView(id: string, template: TemplateRef<any>, element$: any, context: SplitPanelComponent): void {
        const embeddedViewRef = context.viewContainerRef.createEmbeddedView(template);
        context.embeddedViewRefs[id] = embeddedViewRef;
        const detached = $(embeddedViewRef.rootNodes)
            .detach();
        element$.append(detached);

        timer(250)
            .subscribe(() => embeddedViewRef.markForCheck());
    }

    private initLayout() {
        this.layout.init();
        const element = this.elementRef.nativeElement;
        this.resizeSensor = new ResizeSensor(element, () => this.updateLayout());
    }

    private updateLayout() {
        this.layout.updateSize();
    }

    private destroyLayout() {
        if (this.resizeSensor) {
            this.resizeSensor.detach();
        }
        if (this.layout) {
            this.layout.destroy();
        }
    }

}
