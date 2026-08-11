import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-paged-media-header",
    template: `
        <ng-content></ng-content>
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DgpPagedMediaHeaderComponent {

}
