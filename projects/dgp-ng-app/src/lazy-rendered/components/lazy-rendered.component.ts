import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    EmbeddedViewRef,
    Input,
    OnDestroy,
    TemplateRef,
    ViewContainerRef
} from "@angular/core";
import { DgpLazyRenderedContentDirective } from "../directives/dgp-lazy-rendered-content.directive";
import { DgpLazyRenderedPlaceholderDirective } from "../directives/dgp-lazy-rendered-placeholder.directive";
import { observeAttribute$ } from "../../utils/observe-input";
import { distinctUntilHashChanged } from "../../utils/distinct-until-hash-changed.function";
import { Subscription } from "rxjs";

export enum LazyRenderedContentDisplayStrategy {
    WhileInView = "whileInView"
}

@Component({
    selector: "dgp-lazy-rendered",
    template: `
        <ng-content></ng-content>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpLazyRenderedComponent implements AfterViewInit, OnDestroy {

    private showContentSubscription: Subscription;
    private embeddedViewRef: EmbeddedViewRef<any>;
    private intersectionObserver: IntersectionObserver;

    @ContentChild(DgpLazyRenderedContentDirective, {
        read: TemplateRef
    }) contentTemplateRef: TemplateRef<any>;

    @ContentChild(DgpLazyRenderedPlaceholderDirective, {
        read: TemplateRef
    }) placeholderTemplateRef: TemplateRef<any>;

    /**
     * default: parent element
     */
    @Input()
    displayRegionSelector: string;

    showContent = false;

    @Input()
    contentDisplayStrategy = LazyRenderedContentDisplayStrategy.WhileInView;

    private readonly showContent$ = observeAttribute$(
        this as DgpLazyRenderedComponent, "showContent"
    );

    constructor(
        private readonly vcRef: ViewContainerRef,
        private readonly elRef: ElementRef<HTMLElement>
    ) {
    }

    ngAfterViewInit(): void {
        // TODO
        this.checkIntersectionWithDisplayRegion();

        this.showContentSubscription = this.showContent$.pipe(
            distinctUntilHashChanged()
        ).subscribe(showContent => {
            if (this.embeddedViewRef) {
                this.embeddedViewRef.destroy();
            }
            if (showContent) {
                this.embeddedViewRef = this.vcRef.createEmbeddedView(this.contentTemplateRef);
            } else {
                this.embeddedViewRef = this.vcRef.createEmbeddedView(this.placeholderTemplateRef);
            }
        });
    }

    ngOnDestroy(): void {
        if (this.showContentSubscription && !this.showContentSubscription.closed) {
            this.showContentSubscription.unsubscribe();
        }
        this.intersectionObserver?.disconnect();
    }

    private checkIntersectionWithDisplayRegion() {

        let displayRegion: Element;
        if (this.displayRegionSelector) {
            displayRegion = document.querySelector(this.displayRegionSelector);
        } else {
            displayRegion = this.elRef.nativeElement.parentElement;
        }

        // TODO: Make this an input
        const options: IntersectionObserverInit = {
            root: displayRegion,
            rootMargin: "240px 0px 0px 0px",
            threshold: 0
        };

        this.intersectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {

                // TODO
                this.showContent = entry.isIntersecting;

            });
        }, options);

        const target = this.elRef.nativeElement;
        this.intersectionObserver.observe(target);
    }

}
