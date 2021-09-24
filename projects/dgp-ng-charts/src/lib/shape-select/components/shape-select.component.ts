import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpModelEditorComponentBase } from "dgp-ng-app";
import { shapeMap } from "../../symbols/constants";
import { Shape, shapes } from "../../symbols/models";

@Component({
    selector: "dgp-shape-select",
    template: `
        <mat-form-field>
            <mat-select [ngModel]="model"
                        (ngModelChange)="setModel($event)"
                        [disabled]="disabled">
                <mat-option *ngFor="let shape of shapes"
                            [value]="shape">
                    <dgp-svg-symbol [model]="shape"></dgp-svg-symbol>
                    {{shapeMap.get(shape).label}}
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

        dgp-svg-symbol {
            margin-right: 8px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpShapeSelectComponent extends DgpModelEditorComponentBase<Shape> {

    readonly shapeMap = shapeMap;
    readonly shapes = shapes;

}
