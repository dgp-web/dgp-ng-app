import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    EmbeddedViewRef,
    OnDestroy,
    TemplateRef,
    ViewContainerRef
} from "@angular/core";
import { DgpLazyRenderedContentDirective } from "../directives/dgp-lazy-rendered-content.directive";
import { DgpLazyRenderedPlaceholderDirective } from "../directives/dgp-lazy-rendered-placeholder.directive";
import { observeAttribute$ } from "../../utils/observe-input";
import { distinctUntilHashChanged } from "../../utils/distinct-until-hash-changed.function";
import { Subscription } from "rxjs";

@Component({
    selector: "dgp-lazy-rendered",
    template: `
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpLazyRenderedComponent implements AfterViewInit, OnDestroy {

    @ContentChild(DgpLazyRenderedContentDirective, {
        read: TemplateRef
    }) contentTemplateRef: TemplateRef<any>;

    @ContentChild(DgpLazyRenderedPlaceholderDirective, {
        read: TemplateRef
    }) placeholderTemplateRef: TemplateRef<any>;

    private showContentSubscription: Subscription;
    private embeddedViewRef: EmbeddedViewRef<any>;

    showContent = false;

    private readonly showContent$ = observeAttribute$(
        this as DgpLazyRenderedComponent, "showContent"
    );

    constructor(
        private readonly vcRef: ViewContainerRef
    ) {
    }

    ngAfterViewInit(): void {
        this.showContentSubscription = this.showContent$.pipe(
            distinctUntilHashChanged()
        ).subscribe(showContent => {
            if (this.embeddedViewRef) {
                this.embeddedViewRef.destroy();
            }
            this.embeddedViewRef = this.vcRef.createEmbeddedView(this.contentTemplateRef);
        });
    }

    ngOnDestroy(): void {
        if (this.showContentSubscription && !this.showContentSubscription.closed) {
            this.showContentSubscription.unsubscribe();
        }
    }

}
