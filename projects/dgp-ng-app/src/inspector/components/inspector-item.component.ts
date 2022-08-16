import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { AttributeMetadata } from "data-modeling";

@Component({
    selector: "dgp-inspector-item",
    template: `
        <mat-list-item>
            <mat-icon>{{matIconName || metadata?.icon}}</mat-icon>
            <div class="label">
                {{ label || metadata?.label }}
                <span *ngIf="metadata?.isRequired"
                      class="dgp-cl--accent">*</span>
            </div>
            <dgp-spacer></dgp-spacer>
            <ng-content></ng-content>
        </mat-list-item>

        <p *ngIf="description || metadata?.description"
           class="description">{{description || metadata?.description}}</p>
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
            margin-top: 6px;
        }

        .label {
            font-size: smaller;
            margin-top: 8px;
            flex-shrink: 0;
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
    metadata: AttributeMetadata<any>;

    @Input()
    label: string;

    @Input()
    description: string;

    @Input()
    matIconName: string;

}
