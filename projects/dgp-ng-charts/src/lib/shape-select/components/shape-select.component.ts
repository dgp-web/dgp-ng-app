import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpModelEditorComponentBase } from "dgp-ng-app";
import { shapeMap } from "../../shapes/constants";
import { Shape, shapes } from "../../shapes/models";

@Component({
    selector: "dgp-shape-select",
    template: `
        <mat-form-field>
            <mat-select [ngModel]="model"
                        (ngModelChange)="setModel($event)"
                        [disabled]="disabled">
                <mat-option *ngFor="let shape of shapes"
                            [value]="shape">
                    <dgp-svg-shape [model]="shape"></dgp-svg-shape>
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

        dgp-svg-shape {
            margin-right: 8px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpShapeSelectComponent extends DgpModelEditorComponentBase<Shape> {

    readonly shapeMap = shapeMap;
    readonly shapes = shapes;

}
