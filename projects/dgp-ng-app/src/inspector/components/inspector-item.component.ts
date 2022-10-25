import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { AttributeMetadata } from "data-modeling";
import { InspectorService } from "./inspector.component";
import { combineLatest } from "rxjs";
import { observeAttribute$ } from "../../utils/observe-input";
import { map } from "rxjs/operators";
import { notNullOrUndefined } from "../../utils/null-checking.functions";

@Component({
    selector: "dgp-inspector-item",
    template: `
        <mat-list-item [class.--responsive]="responsive$ | async">
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
            flex-direction: column;
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

    @Input()
    responsive: boolean;

    readonly responsive$ = combineLatest([
        observeAttribute$(this as InspectorItemComponent, "responsive"),
        this.service.responsive$
    ]).pipe(
        map(combination => {

            const ownResponsiveSettings = combination[0];
            const parentResponsiveSettings = combination[1];

            if (notNullOrUndefined(ownResponsiveSettings)) return ownResponsiveSettings;
            return parentResponsiveSettings;

        })
    );

    constructor(
        private readonly service: InspectorService
    ) {
    }

}
