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
    ViewChild,
    ViewContainerRef
} from "@angular/core";
import { createGuid, notNullOrUndefined } from "dgp-ng-app";
import { KeyValueStore } from "entity-store";
import { uniqBy } from "lodash";
import { combineLatest, timer } from "rxjs";
import {
    ComponentConfiguration,
    ComponentRegistry,
    DockingLayoutService,
    ItemConfiguration,
    StackConfiguration
} from "../../custom-goldenlayout";
import { DockingLayoutContainerComponent } from "./docking-layout-container.component";
import { DockingLayoutItemComponent } from "./docking-layout-item.component";

@Component({
    selector: "dgp-docking-layout",
    template: `
        <mat-card #host
                  dgpResizeSensor
                  (sizeChanged)="updateLayout()">
            <ng-content></ng-content>
        </mat-card>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
            overflow: auto;
            flex-grow: 1;
        }

        mat-card {
            padding: 0 !important;
            border-radius: 0 !important;
            flex-grow: 1 !important;
            display: flex !important;
            height: 100% !important;
            overflow: hidden;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DockingLayoutComponent implements OnChanges, OnDestroy, AfterViewInit {

    @ContentChildren(DockingLayoutItemComponent) topLevelItems: QueryList<DockingLayoutItemComponent>;
    @ContentChildren(DockingLayoutItemComponent, {descendants: true}) allItems: QueryList<DockingLayoutItemComponent>;
    @ContentChildren(DockingLayoutContainerComponent, {descendants: true}) allContainers: QueryList<DockingLayoutContainerComponent>;

    @ViewChild("host", {read: ElementRef})
    elementRef: ElementRef;

    @Input()
    splitterSize = 2;

    // Settings
    @Input() hasHeaders = true;
    @Input() constrainDragToContainer = true;
    @Input() reorderEnabled = true;
    @Input() selectionEnabled = true;
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

    private embeddedViewRefs: KeyValueStore<EmbeddedViewRef<any>> = {};

    constructor(private readonly vcRef: ViewContainerRef,
                private readonly dockingLayoutService: DockingLayoutService,
                private readonly componentRegistry: ComponentRegistry
    ) {
    }

    ngOnDestroy(): void {
        Object.keys(this.embeddedViewRefs)
            .forEach(key => {
                this.embeddedViewRefs[key].destroy();
            });

        if (this.dockingLayoutService) {
            this.dockingLayoutService.destroy();
        }

    }

    ngAfterViewInit(): void {
        combineLatest([
            this.allItems.changes,
            this.allContainers.changes,
        ])
            .subscribe(
                () => this.redraw()
            );

        this.redraw();
    }


    redraw(): void {
        if (this.dockingLayoutService) {
            this.dockingLayoutService.destroy();
        }
        const content = this.topLevelItems.toArray()
            .map(x => x.configuration);

        const components = this.getComponents(content);
        // const stacks = this.getStacks(content);
        const uniqComponents = uniqBy(components, item => item.id);

        const config: any = {
            content,
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
                borderWidth: this.splitterSize,
                minItemHeight: this.minItemHeight,
                minItemWidth: this.minItemWidth,
                headerHeight: this.headerHeight,
                dragProxyWidth: this.dragProxyWidth,
                dragProxyHeight: this.dragProxyHeight
            }
        };

        this.dockingLayoutService.createDockingLayout(
            config, this.vcRef
        );


        // TODO: Type container and state
        uniqComponents
            .filter(componentConfig => !this.componentRegistry.hasComponent(componentConfig.id as string))
            .forEach(component => {

                this.componentRegistry.registerComponent(component.id, (container, componentState) => {

                    const id = createGuid();

                    container.on("hide", () => {
                        this.destroyEmbeddedView(id, this);
                    });

                    container.on("show", () => {
                        this.createEmbeddedView(id, componentState.template(), container.getElement(), this);
                    });

                    container.on("destroy", () => {
                        this.destroyEmbeddedView(id, this);
                    });

                });

            });

        this.dockingLayoutService.init();
    }

    public ngOnChanges(changes: SimpleChanges): void {

    }

    updateLayout(): void {
        this.dockingLayoutService.updateSize();
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

    private getStacks(content: ItemConfiguration[]): StackConfiguration[] {
        let result: StackConfiguration[] = [];

        content.forEach(item => {
            if (item.type === "stack") {
                result.push(item as StackConfiguration);
            } else {
                result = result.concat(this.getStacks((item as any)));
            }
        });

        return result;
    }

    private createEmbeddedView(id: string, template: TemplateRef<any>, element$: any, context: DockingLayoutComponent) {

        if (notNullOrUndefined(context.embeddedViewRefs[id])) return;

        const embeddedViewRef = context.vcRef.createEmbeddedView(template);
        context.embeddedViewRefs[id] = embeddedViewRef;
        const detached = $(embeddedViewRef.rootNodes)
            .detach();
        element$.append(detached);

        timer(0).subscribe(() => embeddedViewRef?.markForCheck());
    }

    private destroyEmbeddedView(id: string, context: DockingLayoutComponent): void {
        const embeddedViewRef = context.embeddedViewRefs[id];
        delete context.embeddedViewRefs[id];
        if (embeddedViewRef) {
            embeddedViewRef.destroy();
        }
    }
}
