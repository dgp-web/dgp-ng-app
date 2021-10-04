import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "dgp-inspector",
    template: `
        <mat-list>
            <ng-content></ng-content>
        </mat-list>
    `,
    styles: [`
        :host {
            padding: 8px;
            overflow: auto;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectorComponent {

}
