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
            padding: 0;
            overflow: auto;
        }

        mat-list {
            padding: 0;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectorComponent {

}
