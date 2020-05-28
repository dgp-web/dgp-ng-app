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
import { ResizeSensor } from "css-element-queries";
import { createGuid } from "dgp-ng-app";
import { KeyValueStore } from "entity-store";
import { timer } from "rxjs";
import { ComponentRegistry, DockingLayoutService } from "../custom-goldenlayout";
import { createSplitPanelComponentTree, createLayoutConfig } from "./functions";
import { SplitPanelOrientation } from "./models";
import { SplitPanelContentComponent } from "./split-panel-content.component";

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
            padding: 0 !important;
            border-radius: 0 !important;
            flex-grow: 1 !important;
            display: flex !important;
            height: 100% !important;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DockingLayoutService,
        ComponentRegistry
    ]
})
export class SplitPanelComponent implements OnDestroy, AfterViewInit {

    @ViewChild("host", {read: ElementRef})
    elementRef: ElementRef;
    @ContentChildren(SplitPanelContentComponent)
    items: QueryList<SplitPanelContentComponent>;
    @Input()
    orientation: SplitPanelOrientation = "vertical";
    private embeddedViewRefs: KeyValueStore<EmbeddedViewRef<any>> = {};
    private resizeSensor: ResizeSensor;

    @Input()
    splitterSize = 1;

    constructor(private readonly viewContainerRef: ViewContainerRef,
                private readonly dockingLayoutService: DockingLayoutService,
                private readonly componentRegistry: ComponentRegistry
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
        this.items.changes.subscribe(() => this.redraw());
        this.redraw();
    }

    ngOnDestroy(): void {
        Object.keys(this.embeddedViewRefs)
            .forEach(key => this.embeddedViewRefs[key].destroy());
        this.destroyLayout();
    }

    private redraw(): void {
        this.destroyLayout();

        const componentConfigurations = this.items.toArray()
            .map(x => x.configuration);

        const root = createSplitPanelComponentTree({
            content: componentConfigurations,
            orientation: this.orientation
        });

        this.dockingLayoutService.createDockingLayout(
            createLayoutConfig(root, this.splitterSize), this.elementRef.nativeElement
        );

        componentConfigurations.forEach(componentConfig => this.componentRegistry.registerComponent(componentConfig.id, (container, component) => {
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
        timer(0).subscribe(() => {

            const embeddedViewRef = context.viewContainerRef.createEmbeddedView(template);
            context.embeddedViewRefs[id] = embeddedViewRef;
            const detached = $(embeddedViewRef.rootNodes)
                .detach();
            element$.append(detached);

            timer(0)
                .subscribe(() => embeddedViewRef.markForCheck());
        });
    }

    private initLayout() {
        this.dockingLayoutService.init();
        const element = this.elementRef.nativeElement;
        this.resizeSensor = new ResizeSensor(element, () => this.updateLayout());
    }

    private updateLayout() {
        this.dockingLayoutService.updateSize();
    }

    private destroyLayout() {
        if (this.resizeSensor) {
            this.resizeSensor.detach();
        }
        if (this.dockingLayoutService) {
            this.dockingLayoutService.destroy();
        }
    }

}
