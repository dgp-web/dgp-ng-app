import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { AttributeMetadata } from "data-modeling";
import { InspectorService } from "./inspector.component";
import { combineLatest } from "rxjs";
import { observeAttribute$ } from "../../utils/observe-input";
import { map } from "rxjs/operators";
import { notNullOrUndefined } from "../../utils/null-checking.functions";
import { ThemePalette } from "@angular/material/core";

export function toOwnOrParentSettings<T>(payload: [T, T]) {
    const ownSettings = payload[0];
    const otherSettings = payload[1];

    if (notNullOrUndefined(ownSettings)) return ownSettings;
    return otherSettings;
}

@Component({
    selector: "dgp-inspector-item",
    template: `
        <mat-list-item [class.--responsive]="responsive$ | async">
            <div class="info"
                 [matTooltip]="description || metadata?.description"
                 matTooltipPosition="above"
                 [matTooltipDisabled]="hasHoverDescription$ | async | negate">
                <mat-icon *ngIf="showIcon$ | async"
                          class="mat-icon--small"
                          [color]="labelThemeColor$ | async">
                    {{matIconName || metadata?.icon}}
                </mat-icon>
                <div class="label"
                     [class.dgp-cl--primary]="(labelThemeColor$ | async) === 'primary'"
                     [class.dgp-cl--accent]="(labelThemeColor$ | async) === 'accent'"
                     [class.dgp-cl--warn]="(labelThemeColor$ | async) === 'warn'">
                    {{ label || metadata?.label }}
                    <span *ngIf="required || metadata?.isRequired"
                          class="dgp-cl--accent">*</span>
                </div>
            </div>
            <dgp-spacer></dgp-spacer>
            <div class="content"
                 [class.content-icon-margin]="showIcon$ | async"
                 [style.max-width]="maxContentWidth$ | async">
                <ng-content></ng-content>
            </div>
        </mat-list-item>

        <p *ngIf="hasPermanentDescription$ | async"
           class="description"
           [class.description-icon-margin]="showIcon$ | async">
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
    maxContentWidth = "240px";

    @Input()
    metadata: AttributeMetadata<any>;
    readonly metadata$ = observeAttribute$(this as InspectorItemComponent, "metadata");

    @Input()
    label: string;

    @Input()
    description: string;
    readonly description$ = observeAttribute$(this as InspectorItemComponent, "description");
    readonly metadataDescription$ = this.metadata$.pipe(map(x => x?.description));

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
    ]).pipe(map(toOwnOrParentSettings));

    readonly showDescription$ = combineLatest([
        observeAttribute$(this as InspectorItemComponent, "showDescription"),
        this.service.showFieldDescriptions$
    ]).pipe(map(toOwnOrParentSettings));

    readonly showIcon$ = combineLatest([
        observeAttribute$(this as InspectorItemComponent, "showIcon"),
        this.service.showFieldIcons$
    ]).pipe(map(toOwnOrParentSettings));

    readonly hasHoverDescription$ = combineLatest([
        this.description$,
        this.metadataDescription$,
        this.showDescription$
    ]).pipe(
        map(combination => {
            const description = combination[0];
            const metadataDescription = combination[1];
            const showDescription = combination[2];

            return (description || metadataDescription) && showDescription && showDescription === "onHover";
        })
    );

    readonly hasPermanentDescription$ = combineLatest([
        this.description$,
        this.metadataDescription$,
        this.showDescription$
    ]).pipe(
        map(combination => {
            const description = combination[0];
            const metadataDescription = combination[1];
            const showDescription = combination[2];

            return (description || metadataDescription) && showDescription && showDescription !== "onHover";
        })
    );

    readonly maxContentWidth$ = combineLatest([
        observeAttribute$(this as InspectorItemComponent, "maxContentWidth"),
        this.service.maxContentWidth$
    ]).pipe(map(toOwnOrParentSettings));

    readonly labelThemeColor$ = combineLatest([
        observeAttribute$(this as InspectorItemComponent, "labelThemeColor"),
        this.service.fieldLabelThemeColor$
    ]).pipe(map(toOwnOrParentSettings));


    constructor(
        private readonly service: InspectorService
    ) {
    }

}
