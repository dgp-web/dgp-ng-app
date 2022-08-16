import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { AttributeMetadata, validateAttribute } from "data-modeling";
import { observeAttribute$ } from "../../utils/observe-input";
import { combineLatest } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { ModelValidationResult } from "data-modeling/src/lib/models";
import { notNullOrUndefined } from "../../utils/null-checking.functions";
import { DgpView } from "../../utils/view";

@Component({
    selector: "dgp-input-info",
    template: `
        <ng-container *ngIf="showInfo$ | async"
                      class="input-info">
            <div *ngIf="hasErrors$ | async"
                 class="error-message">

                <mat-icon color="warn"
                          class="error-indicator">warning
                </mat-icon>

                {{firstErrorMessage$ | async}}
            </div>

            <dgp-spacer></dgp-spacer>

            <div *ngIf="hasMax$ | async"
                 class="limits">
                {{model?.length || 0}}/{{metadata.max}}
            </div>
        </ng-container>
    `,
    styles: [`
        :host {
            display: flex;
        }

        .limits {
            font-size: smaller;
            opacity: 0.7;
            margin-left: 8px;
        }

        dgp-input-field {
            flex-grow: 1;
        }

        .error-message {
            display: inline-flex;
            font-size: smaller;
            opacity: 0.7;
        }

        .error-indicator {
            font-size: 18px;
            width: 20px;
            height: 20px;
            margin-top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 4px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpInputInfoComponent extends DgpView<any> {

    @Input()
    metadata: AttributeMetadata<any>;
    readonly metadata$ = observeAttribute$(this as DgpInputInfoComponent, "metadata");

    readonly validationResult$ = combineLatest([
        this.model$,
        this.metadata$
    ]).pipe(
        map(combination => {

            const model = combination[0];
            const metadata = combination[1];

            if (!metadata) return {isValid: true} as ModelValidationResult;

            return validateAttribute({
                attributeMetadata: metadata,
                value: model,
                attributePath: metadata.label,
                modelId: "",
                modelType: ""
            });
        }),
        shareReplay(1)
    );

    readonly hasErrors$ = this.validationResult$.pipe(map(x => !x.isValid));
    readonly firstErrorMessage$ = this.validationResult$.pipe(map(x => x.errors?.length > 0 ? x.errors[0].message : null));

    readonly hasMax$ = this.metadata$.pipe(map(x => x && notNullOrUndefined(x.max)));

    readonly showInfo$ = combineLatest([
        this.hasErrors$,
        this.hasMax$
    ]).pipe(map(x => x[0] || x[1]));

}

