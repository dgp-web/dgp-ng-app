import { ChangeDetectionStrategy, Component } from "@angular/core";
import { isDarkModeActive, DgpHybridComponentBase, ThemeSwitcherState } from "dgp-ng-app";
import { shapeMap } from "../../shapes/constants";
import { Shape, shapes } from "../../shapes/models";
import { idPrefixProvider } from "../../shared/id-prefix-provider.constant";
import { map } from "rxjs/operators";

@Component({
    selector: "dgp-shape-select",
    template: `
        <mat-form-field>
            <mat-select [ngModel]="model"
                        (ngModelChange)="setModel($event)"
                        [disabled]="disabled">
                <mat-option *ngFor="let shape of shapes"
                            [value]="shape">
                    <dgp-svg-shape [model]="shape"
                                   [fillColor]="fillColor$ | async"></dgp-svg-shape>
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
    providers: [
        idPrefixProvider
    ]
})
export class DgpShapeSelectComponent extends DgpHybridComponentBase<Shape, ThemeSwitcherState> {

    readonly fillColor$ = this.select(isDarkModeActive).pipe(
        map(active => {
            return active ? "#fff" : "#000";
        })
    );

    readonly shapeMap = shapeMap;
    readonly shapes = shapes;

}
