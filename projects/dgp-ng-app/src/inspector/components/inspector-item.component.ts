import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
    selector: "dgp-inspector-item",
    template: `
        <mat-list-item>
            <mat-icon>{{matIconName}}</mat-icon>
            <div class="label">
                {{ label }}
            </div>
            <dgp-spacer></dgp-spacer>
            <ng-content></ng-content>
        </mat-list-item>
    `,
    styles: [`

        mat-list-item {
            height: auto !important;
        }

        mat-icon {
            margin-right: 16px;
            color: gray;
        }

        .label {
            font-size: smaller;
        }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectorItemComponent {

    @Input()
    label: string;

    @Input()
    matIconName: string;

}
