import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FillPattern } from "../../fill-pattern-icon/models";
import { DgpModelEditorComponentBase } from "dgp-ng-app";
import { fillPatternMap, fillPatterns } from "../../fill-pattern-icon/constants";

@Component({
    selector: "dgp-fill-pattern-select",
    template: `
        <mat-form-field>
            <mat-select [ngModel]="model"
                        (ngModelChange)="setModel($event)"
                        [disabled]="disabled">
                <mat-option [value]="fillPatternEnum.All">
                    All
                </mat-option>

                <mat-option *ngFor="let fillPattern of fillPatterns"
                            [value]="fillPattern">
                    <dgp-fill-pattern-icon [model]="fillPattern"></dgp-fill-pattern-icon>
                    {{fillPatternMap.get(fillPattern).label}}
                </mat-option>
            </mat-select>
        </mat-form-field>
    `,
    styles: [`
        :host {
            width: auto;
            height: auto;
        }

        mat-form-field {
            width: 100%;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DgpFillPatternSelectComponent extends DgpModelEditorComponentBase<FillPattern> {

    readonly fillPatternMap = fillPatternMap;
    readonly fillPatternEnum = FillPattern;
    readonly fillPatterns = fillPatterns;

}
