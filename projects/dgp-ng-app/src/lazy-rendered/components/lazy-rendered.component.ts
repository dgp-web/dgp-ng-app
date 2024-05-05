import { ChangeDetectionStrategy, Component, ContentChild, TemplateRef } from "@angular/core";
import { DgpLazyRenderedContentDirective } from "../directives/dgp-lazy-rendered-content.directive";
import { DgpLazyRenderedPlaceholderDirective } from "../directives/dgp-lazy-rendered-placeholder.directive";

@Component({
    selector: "dgp-lazy-rendered",
    template: `
        
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpLazyRenderedComponent {
    @ContentChild(DgpLazyRenderedContentDirective, {
        read: TemplateRef
    }) contentTemplateRef: TemplateRef<any>;

    @ContentChild(DgpLazyRenderedPlaceholderDirective, {
        read: TemplateRef
    }) placeholderTemplateRef: TemplateRef<any>;
}
