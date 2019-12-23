import { Component, ChangeDetectionStrategy, HostBinding } from "@angular/core";

@Component({
    selector: "dgp-docs-section-title",
    template: `
        <ng-content></ng-content>`,
    styles: [`
        :host {
            display: block;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsSectionTitleComponent {

    @HostBinding("class.mat-h2")
    readonly hostBindings = true;

}
