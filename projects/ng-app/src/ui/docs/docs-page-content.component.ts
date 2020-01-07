import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-docs-page-content",
    template: `
        <ng-content></ng-content>`,
    styles: [`
        :host {
            max-width: 960px;
            width: 100%;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            height: 100%;
            padding: 16px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsPageContentComponent {

}
