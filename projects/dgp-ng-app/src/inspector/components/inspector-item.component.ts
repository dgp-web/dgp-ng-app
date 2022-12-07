import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { AttributeMetadata } from "data-modeling";
import { InspectorService } from "./inspector.component";
import { combineLatest } from "rxjs";
import { observeAttribute$ } from "../../utils/observe-input";
import { map } from "rxjs/operators";
import { notNullOrUndefined } from "../../utils/null-checking.functions";
import { ThemePalette } from "@angular/material/core";


@Component({
    selector: "dgp-inspector-item",
    template: `
        <mat-list-item [class.--responsive]="responsive$ | async">
            <div class="info"
                 [matTooltip]="description || metadata?.description"
                 matTooltipPosition="above"
                 [matTooltipDisabled]="description || metadata?.description && showDescription && showDescription === 'onHover' | negate">
                <mat-icon *ngIf="showIcon"
                          class="mat-icon--small"
                          [color]="labelThemeColor">
                    {{matIconName || metadata?.icon}}
                </mat-icon>
                <div class="label"
                     [class.dgp-cl--primary]="labelThemeColor === 'primary'"
                     [class.dgp-cl--accent]="labelThemeColor === 'accent'"
                     [class.dgp-cl--warn]="labelThemeColor === 'warn'">
                    {{ label || metadata?.label }}
                    <span *ngIf="required || metadata?.isRequired"
                          class="dgp-cl--accent">*</span>
                </div>
            </div>
            <dgp-spacer></dgp-spacer>
            <div class="content"
                 [class.content-icon-margin]="showIcon"
                 [style.max-width]="maxWidth">
                <ng-content></ng-content>
            </div>
        </mat-list-item>

        <p *ngIf="description || metadata?.description && showDescription && showDescription !== 'onHover'"
           class="description"
           [class.description-icon-margin]="showIcon">
            {{description || metadata?.description}}
        </p>
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
            padding-left: 8px !important;
            padding-right: 8px !important;
        }

        .info {
            display: flex;
            height: 32px;
            align-items: center;
            min-width: 96px;
        }

        mat-icon {
            margin-right: 8px;
            opacity: 0.7;
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

        .content-icon-margin {
            margin-left: 28px;
        }

        .description {
            margin-right: 8px;
            margin-top: 0;
            margin-bottom: 0;
            font-size: smaller;
            opacity: 0.7;
            margin-left: 8px;
        }

        .description-icon-margin {
            margin-left: 36px;
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
    required: boolean;

    @Input()
    responsive: boolean;

    @Input()
    labelThemeColor: ThemePalette = undefined;

    @Input()
    showIcon = true;

    @Input()
    showDescription: boolean | "onHover" = true;

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
