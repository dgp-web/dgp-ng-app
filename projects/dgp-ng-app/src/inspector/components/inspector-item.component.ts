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

        <p *ngIf="description"
           class="description">{{description}}</p>
    `,
    styles: [`

        mat-list-item {
            height: auto !important;
            min-height: 48px;
            display: flex !important;
            align-items: center;
        }

        mat-icon {
            margin-right: 16px;
            color: gray;
        }

        .label {
            font-size: smaller;
        }

        .description {
            margin-left: 58px;
            margin-right: 58px;
            font-size: smaller;
            opacity: 0.7;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectorItemComponent {

    @Input()
    label: string;

    @Input()
    description: string;

    @Input()
    matIconName: string;

}
