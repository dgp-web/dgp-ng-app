import {
    AfterViewInit,
    ApplicationRef,
    ChangeDetectionStrategy,
    Component,
    ComponentRef,
    ElementRef,
    Injectable,
    Renderer2,
    Type,
    ViewContainerRef
} from "@angular/core";
import { BoxGroup, ConnectedScatterGroup } from "dgp-ng-charts";
import { Many } from "data-modeling";
import { createGuid } from "dgp-ng-app";
import { BlindTextComponent } from "./blind-text.component";
import { timer } from "rxjs";

@Component({
    selector: "dgp-ng-paged-media-labs",
    template: `
        <dgp-paged-media-page-A4>
            <dgp-paged-media-header>
                First section header
            </dgp-paged-media-header>

            <dgp-paged-media-content>
                First section content
            </dgp-paged-media-content>

            <dgp-paged-media-footer>
                First section footer
            </dgp-paged-media-footer>
        </dgp-paged-media-page-A4>

        <dgp-paged-media-page-A4>
            <dgp-paged-media-header>
                Second section header
            </dgp-paged-media-header>

            <dgp-paged-media-content>
                <div style="display: flex; flex-wrap: wrap;">
                    <dgp-box-plot [model]="boxGroups"></dgp-box-plot>
                    <dgp-connected-scatter-plot [model]="connectedScatterGroups"></dgp-connected-scatter-plot>
                </div>
            </dgp-paged-media-content>

            <dgp-paged-media-footer>
                Second section footer
            </dgp-paged-media-footer>
        </dgp-paged-media-page-A4>

    `,
    styles: [`
        dgp-box-plot, dgp-connected-scatter-plot {
            width: 320px;
            height: 240px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {

    readonly boxGroups: Many<BoxGroup> = [{
        boxGroupId: "Box data",
        label: "First group",
        boxes: [{
            boxId: createGuid(),
            colorHex: "#d8d8ef",
            quantiles: {
                max: 8,
                min: 0.23,
                lower: 3,
                upper: 7.4,
                median: 5.2
            },
            outliers: []
        }]
    }];
    readonly connectedScatterGroups: Many<ConnectedScatterGroup> = [{
        connectedScatterGroupId: "Scatter data",
        colorHex: "#d8d8ef",
        series: [{
            connectedScatterSeriesId: createGuid(),
            dots: [{
                x: 1,
                y: 2
            }, {
                x: 10,
                y: 7
            }]
        }]
    }];

    constructor(
        private readonly offscreenRenderer: OffscreenRenderer
    ) {

    }

    ngAfterViewInit(): void {
        timer(0).subscribe(() => {
            const componentRef = this.offscreenRenderer.createComponent(BlindTextComponent);
            const elRef = componentRef.injector.get(ElementRef) as ElementRef<HTMLDivElement>;

            const renderer = this.offscreenRenderer.getRenderer();
            renderer.setStyle(elRef.nativeElement, "width", "677.34px");

            console.log(elRef);

            const refWidth = 677.34;
            const refHeight = 930.56;

            console.log(elRef.nativeElement.getBoundingClientRect());
        });
    }

}

@Injectable({
    providedIn: "root"
})
export class OffscreenRenderer {

    constructor(
        private readonly appRef: ApplicationRef
    ) {
    }

    createComponent<C>(componentType: Type<C>): ComponentRef<C> {
        const componentRef = this.getViewContainerRef()
            .createComponent(componentType);

        const renderer = this.getRenderer();
        renderer.addClass(componentRef.injector.get(ElementRef).nativeElement, "dgp-hide-in-print");

        return componentRef;
    }

    getRenderer(): Renderer2 {
        const rootComponentRef = this.appRef.components[0] as ComponentRef<any>;
        return rootComponentRef.injector.get(Renderer2);
    }

    private getRootComponentRef<TRootComponent extends any>(): ComponentRef<TRootComponent> {
        return this.appRef.components[0] as ComponentRef<TRootComponent>;
    }

    private getViewContainerRef() {
        const rootComponentRef = this.getRootComponentRef();
        return rootComponentRef.injector.get(ViewContainerRef);
    }

}
