import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-docs-page",
    template: `
        <div class="mat-typography content-container">
            <ng-content></ng-content>
        </div>`,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            overflow: auto;
            flex-grow: 1;
            justify-content: center;
            align-items: center;
        }

        .content-container {
            margin: 16px;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            height: 100%;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsPageComponent {

}
