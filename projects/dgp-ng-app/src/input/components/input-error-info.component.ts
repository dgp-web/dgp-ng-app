import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { ModelValidationResult } from "data-modeling/src/lib/models";
import { AttributeMetadata, validateAttribute } from "data-modeling";
import { DgpView } from "../../utils/view";
import { observeAttribute$ } from "../../utils/observe-input";

@Component({
    selector: "dgp-input-error-info",
    template: `
        <div *ngIf="hasErrors$ | async"
             class="host">

            <mat-icon color="warn"
                      class="error-indicator">warning
            </mat-icon>

            {{firstErrorMessage$ | async}}
        </div>

    `,
    styles: [`
        .host {
            display: inline-flex;
            margin-left: 36px;
            margin-right: 8px;
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
            flex-shrink: 0;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpInputErrorInfoComponent extends DgpView<any> {

    @Input()
    metadata: AttributeMetadata<any>;
    readonly metadata$ = observeAttribute$(this as DgpInputErrorInfoComponent, "metadata");

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
        })
    );

    readonly hasErrors$ = this.validationResult$.pipe(map(x => !x.isValid));
    readonly firstErrorMessage$ = this.validationResult$.pipe(map(x => x.errors?.length > 0 ? x.errors[0].message : null));

}
