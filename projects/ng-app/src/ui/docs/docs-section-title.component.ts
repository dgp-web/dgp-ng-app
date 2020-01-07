import { Component, ChangeDetectionStrategy, HostBinding } from "@angular/core";

@Component({
    selector: "dgp-docs-section-title",
    template: `
        <ng-content></ng-content>`,
    styles: [`
        :host {
            display: block;
            width: 100%;
            font-size: larger;
            margin-top: 16px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsSectionTitleComponent {
}
