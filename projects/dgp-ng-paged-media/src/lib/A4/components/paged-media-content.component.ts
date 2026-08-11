import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-paged-media-content",
    template: `
        <ng-content></ng-content>
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DgpPagedMediaContentComponent {

}
