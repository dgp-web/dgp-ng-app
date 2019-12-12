import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-empty-state-content",
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyStateContentComponent {
}
