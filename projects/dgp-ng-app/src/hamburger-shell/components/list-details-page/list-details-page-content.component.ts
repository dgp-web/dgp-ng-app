import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-list-details-page-content",
    template: `<ng-content></ng-content>`,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            max-width: 800px;
            width: 100%;
            padding: 32px;
            justify-self: center;
            margin-right: auto;
            margin-left: auto;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})export class ListDetailsPageContentComponent {

}
