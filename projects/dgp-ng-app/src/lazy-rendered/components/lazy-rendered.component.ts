import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EmbeddedViewRef,
    Input,
    OnDestroy,
    TemplateRef
} from "@angular/core";
import { DgpLazyRenderedContentDirective } from "../directives/dgp-lazy-rendered-content.directive";
import { DgpLazyRenderedPlaceholderDirective } from "../directives/dgp-lazy-rendered-placeholder.directive";
import { observeAttribute$ } from "../../utils/observe-input";
import { distinctUntilHashChanged } from "../../utils/distinct-until-hash-changed.function";
import { Subject, Subscription } from "rxjs";
import { notNullOrUndefined } from "../../utils/null-checking.functions";
import { debounceTime, filter } from "rxjs/operators";

export enum LazyRenderedContentDisplayStrategy {
    WhileInView = "whileInView"
}

@Component({
    selector: "dgp-lazy-rendered",
    template: `
        <ng-content></ng-content>
        <ng-container *ngTemplateOutlet="currentTemplateRef"></ng-container>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-shrink: 0;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpLazyRenderedComponent implements AfterViewInit, OnDestroy {

    private showContentSubscription: Subscription;
    private saveLastHeightSubscription: Subscription;
    private intersectionObserver: IntersectionObserver;
    private lastSavedHeight: number;

    @ContentChild(DgpLazyRenderedContentDirective, {
        read: TemplateRef
    }) contentTemplateRef: TemplateRef<any>;

    @ContentChild(DgpLazyRenderedPlaceholderDirective, {
        read: TemplateRef
    }) placeholderTemplateRef: TemplateRef<any>;

    currentTemplateRef: TemplateRef<any>;
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

    private readonly heightScheduler = new Subject<void>();

    constructor(
        private readonly elRef: ElementRef<HTMLElement>,
        private readonly cd: ChangeDetectorRef
    ) {
    }

    ngAfterViewInit(): void {
        this.checkIntersectionWithDisplayRegion();

        this.showContentSubscription = this.showContent$.pipe(
            distinctUntilHashChanged()
        ).subscribe(showContent => {
            if (showContent) {
                this.lastSavedHeight = null;
                this.elRef.nativeElement.style.height = null;
                this.currentTemplateRef = this.contentTemplateRef;
            } else {
                if (notNullOrUndefined(this.lastSavedHeight)) {
                    this.elRef.nativeElement.style.height = this.lastSavedHeight + "px";
                }
                this.currentTemplateRef = this.placeholderTemplateRef;
            }
            this.cd.markForCheck();
            if (showContent) {
                this.heightScheduler.next();
            }
        });

        this.saveLastHeightSubscription = this.heightScheduler.pipe(
            debounceTime(250),
            filter(() => this.showContent)
        ).subscribe(() => {
            this.lastSavedHeight = this.elRef.nativeElement.getBoundingClientRect().height;
        });

    }

    ngOnDestroy(): void {
        if (this.showContentSubscription && !this.showContentSubscription.closed) {
            this.showContentSubscription.unsubscribe();
        }
        if (this.saveLastHeightSubscription && !this.saveLastHeightSubscription.closed) {
            this.saveLastHeightSubscription.unsubscribe();
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
