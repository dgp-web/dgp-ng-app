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
            <div class="content"
                 [style.max-width]="maxWidth">
                <ng-content></ng-content>
            </div>
        </mat-list-item>

        <p *ngIf="description || metadata?.description"
           class="description">{{description || metadata?.description}}</p>
    `,
    styles: [`
        :host {
            margin-bottom: 8px;
            display: flex;
        }

        mat-list-item {
            height: auto !important;
            min-height: 32px;
            display: flex !important;
            align-items: center;
        }

        .info {
            display: flex;
            height: 32px;
            align-items: center;
            min-width: 96px;
            margin-right: 16px;
        }

        mat-icon {
            margin-right: 16px;
            color: gray;
        }

        .label {
            font-size: smaller;
            flex-shrink: 0;
        }

        .content {
            display: flex;
            flex-grow: 1;
            justify-content: flex-end;
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
    maxWidth = "240px";

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
