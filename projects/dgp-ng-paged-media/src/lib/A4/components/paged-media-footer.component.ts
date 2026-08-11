import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-paged-media-footer",
    template: `
        <ng-content></ng-content>
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DgpPagedMediaFooterComponent {

}
