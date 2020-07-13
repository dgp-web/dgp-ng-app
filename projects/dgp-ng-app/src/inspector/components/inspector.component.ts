import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-inspector",
    template: `
        <ng-content></ng-content>
    `,
    styles: [`
        :host {
            padding: 8px;
        }
   `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectorComponent {

}
