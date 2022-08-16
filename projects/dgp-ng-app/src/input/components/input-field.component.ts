import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { AttributeMetadata } from "data-modeling";
import { DgpModelEditorComponentBase } from "../../utils/model-editor.component-base";

@Component({
    selector: "dgp-input-field",
    template: `
        <ng-container *ngIf="metadata">
            <ng-container [ngSwitch]="metadata.type">
                <ng-container *ngSwitchCase="'string'">

                    <input [minLength]="metadata.min"
                           [maxLength]="metadata.max"
                           [disabled]="disabled"
                           [required]="metadata.isRequired"
                           [placeholder]="metadata.placeholder || ''"

                           [ngModel]="model"
                           (ngModelChange)="setModel($event)">

                </ng-container>
                <ng-container *ngSwitchCase="'number'">

                    <input [min]="metadata.min"
                           [max]="metadata.max"
                           [step]="metadata.step"
                           [disabled]="disabled"
                           [required]="metadata.isRequired"
                           [placeholder]="metadata.placeholder || ''"
                           type="number"

                           [ngModel]="model"
                           (ngModelChange)="setModel($event)">

                </ng-container>
                <ng-container *ngSwitchCase="'boolean'">

                    <div class="boolean-container">
                        <dgp-spacer></dgp-spacer>
                        <mat-slide-toggle [disabled]="disabled"
                                          [required]="metadata.isRequired"
                                          type="checkbox"

                                          [ngModel]="model"
                                          (ngModelChange)="setModel($event)"></mat-slide-toggle>

                    </div>

                </ng-container>
            </ng-container>
        </ng-container>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
        }

        input {
            display: flex;
            flex-grow: 1;
        }

        .boolean-container {
            display: flex;
            flex-grow: 1;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpInputFieldComponent extends DgpModelEditorComponentBase<any> {
    @Input()
    metadata: AttributeMetadata<any>;
}
