import { Component, ChangeDetectionStrategy, HostBinding } from "@angular/core";

@Component({
    selector: "dgp-docs-chapter-title",
    template: `<ng-content></ng-content>`,
    styles: [`
        :host {
            display: block;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsChapterTitleComponent {

    @HostBinding("class.mat-h1")
    readonly hostBindings = true;

}
