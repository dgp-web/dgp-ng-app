import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";
import { AttributeMetadata } from "data-modeling";

@Component({
    selector: "dgp-inspector-item",
    template: `
        <mat-list-item>
            <div class="info">
                <mat-icon>{{matIconName || metadata?.icon}}</mat-icon>
                <div class="label">
                    {{ label || metadata?.label }}
                    <span *ngIf="metadata?.isRequired"
                          class="dgp-cl--accent">*</span>
                </div>
            </div>
            <dgp-spacer></dgp-spacer>
            <div class="content">
                <ng-content></ng-content>
            </div>
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

        .info {
            display: flex;
            height: 48px;
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

        .content {
            margin-left: 40px;
            display: flex;
            flex-grow: 1;
            max-width: 240px;
            width: 100%;
        }

        .description {
            margin-left: 58px;
            margin-right: 16px;
            margin-top: 8px;
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

    @HostBinding("class.--responsive")
    @Input()
    responsive: boolean;

}
