import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import * as _ from "lodash";
import { FillPattern } from "../../fill-pattern-icon/models";

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
                <mat-option [value]="fillPatternEnum.HorizontalLines">
                    <dgp-fill-pattern-icon [model]="fillPatternEnum.HorizontalLines"></dgp-fill-pattern-icon>
                    Horizontal lines
                </mat-option>
                <mat-option [value]="fillPatternEnum.VerticalLines">
                    <dgp-fill-pattern-icon [model]="fillPatternEnum.VerticalLines"></dgp-fill-pattern-icon>
                    Vertical lines
                </mat-option>
                <mat-option [value]="fillPatternEnum.Grid">
                    <dgp-fill-pattern-icon [model]="fillPatternEnum.Grid"></dgp-fill-pattern-icon>
                    Grid
                </mat-option>
                <mat-option [value]="fillPatternEnum.DiagonalGrid">
                    <dgp-fill-pattern-icon [model]="fillPatternEnum.DiagonalGrid"></dgp-fill-pattern-icon>
                    Diagonal grid
                </mat-option>
                <mat-option [value]="fillPatternEnum.LinesFromLeftTopToRightBottom">
                    <dgp-fill-pattern-icon
                        [model]="fillPatternEnum.LinesFromLeftTopToRightBottom"></dgp-fill-pattern-icon>
                    Lines from left top to right bottom
                </mat-option>
                <mat-option [value]="fillPatternEnum.LinesFromLeftBottomToRightTop">
                    <dgp-fill-pattern-icon
                        [model]="fillPatternEnum.LinesFromLeftBottomToRightTop"></dgp-fill-pattern-icon>
                    Lines from left bottom to right top
                </mat-option>
                <mat-option [value]="fillPatternEnum.Checkerboard">
                    <dgp-fill-pattern-icon [model]="fillPatternEnum.Checkerboard"></dgp-fill-pattern-icon>
                    Checkerboard
                </mat-option>
                <mat-option [value]="fillPatternEnum.DiagonalCheckerboard">
                    <dgp-fill-pattern-icon [model]="fillPatternEnum.DiagonalCheckerboard"></dgp-fill-pattern-icon>
                    Diagonal checkerboard
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
export class DgpFillPatternSelectComponent {
    readonly fillPatternEnum = FillPattern;
    @Input()
    disabled: boolean;


    protected modelValue: FillPattern = null;
    readonly model$ = new BehaviorSubject<FillPattern>(this.modelValue);

    @Input()
    get model(): FillPattern {
        return this.modelValue;
    }

    set model(value: FillPattern) {

        if (_.isEqual(value, this.modelValue)) {
            return;
        }

        this.modelValue = value;
        this.model$.next(value);
    }

    @Output()
    readonly modelChange = new EventEmitter<FillPattern>();

    setModel(value: FillPattern) {
        this.model = value;
        this.modelChange.emit(this.model);
    }

}
