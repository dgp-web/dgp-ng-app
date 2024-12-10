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
import { createGuid } from "dgp-ng-app";
import { KeyValueStore } from "entity-store";
import { timer } from "rxjs";
import { ComponentRegistry, DockingLayoutService } from "../custom-goldenlayout";
import { createLayoutConfig, createSplitPanelComponentTree } from "./functions";
import { SplitPanelOrientation } from "./models";
import { SplitPanelContentComponent } from "./split-panel-content.component";

@Component({
    selector: "dgp-split-panel",
    template: `
        <mat-card appearance="outlined" #host
                  dgpResizeSensor
                  (sizeChanged)="updateLayout()">
            <ng-content></ng-content>
        </mat-card>`,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
            overflow: auto;
            flex-grow: 1;
        }

        /* TODO(mdc-migration): The following rule targets internal classes of card that may no longer apply for the MDC version. */
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

    @Input()
    splitterSize = 4;

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
            createLayoutConfig(root, this.splitterSize), this.viewContainerRef
        );

        componentConfigurations
            .filter(componentConfig => !this.componentRegistry.hasComponent(componentConfig.id as string))
            .forEach(componentConfig => this.componentRegistry.registerComponent(componentConfig.id, (container, component) => {
                const instanceId = createGuid();
                container.onOpen.subscribe(
                    () => this.createEmbeddedView(instanceId, component.template(), container.getElement(), this)
                );
                container.onDestroy.subscribe(
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
    }

    updateLayout() {
        this.dockingLayoutService.updateSize();
    }

    private destroyLayout() {
        if (this.dockingLayoutService) {
            this.dockingLayoutService.destroy();
        }
    }

}
