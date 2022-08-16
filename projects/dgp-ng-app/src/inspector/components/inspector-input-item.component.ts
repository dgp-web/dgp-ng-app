import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { AttributeMetadata, validateAttribute } from "data-modeling";
import { DgpModelEditorComponentBase } from "../../utils/model-editor.component-base";
import { notNullOrUndefined } from "../../utils/null-checking.functions";
import { observeAttribute$ } from "../../utils/observe-input";
import { combineLatest } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { ModelValidationResult } from "data-modeling/src/lib/models";

@Component({
    selector: "dgp-inspector-input-item",
    template: `
        <dgp-inspector-item [metadata]="metadata"
                            [matIconName]="matIconName"
                            [label]="label"
                            [description]="description">

            <div class="form-field">
                <dgp-input [metadata]="metadata"
                           [disabled]="disabled"
                           [model]="model"
                           (modelChange)="setModel($event)"></dgp-input>

                <div *ngIf="hasMax()"
                     class="input-info">
                    <div *ngIf="hasErrors$ | async"
                         class="error-message">

                        <mat-icon color="warn"
                                  class="error-indicator">warning
                        </mat-icon>

                        {{firstErrorMessage$ | async}}
                    </div>

                    <dgp-spacer></dgp-spacer>

                    <div class="limits">
                        {{model?.length || 0}}/{{metadata.max}}
                    </div>
                </div>
            </div>

        </dgp-inspector-item>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            padding-top: 8px;
        }

        .form-field {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            position: relative;
            margin-left: 16px;
            max-width: 320px;
            width: 100%;
        }


        .input-info {
            display: flex;
        }

        .limits {
            font-size: smaller;
            opacity: 0.7;
            margin-left: 8px;
        }

        dgp-input {
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
export class DgpInspectorInputItemComponent extends DgpModelEditorComponentBase<any> {

    @Input()
    metadata: AttributeMetadata<any>;
    readonly metadata$ = observeAttribute$(this as DgpInspectorInputItemComponent, "metadata");

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

    @Input()
    label: string;

    @Input()
    description: string;

    @Input()
    matIconName: string;

    hasMax() {
        return notNullOrUndefined(this.metadata) && notNullOrUndefined(this.metadata.max);
    }

}
