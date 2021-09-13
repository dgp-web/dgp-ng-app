import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { FillPattern } from "../models";
import { BehaviorSubject } from "rxjs";
import * as _ from "lodash";

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
                    <svg style="width: 24px;height: 24px; margin-right: 8px;">
                        <defs>
                            <dgp-horizontal-lines-pattern></dgp-horizontal-lines-pattern>
                            <dgp-horizontal-lines-mask></dgp-horizontal-lines-mask>
                        </defs>
                        <g>
                            <rect x="0"
                                  y="0"
                                  width="24px"
                                  height="24px"
                                  mask="url(#horizontal-lines-mask)"
                                  fill="black"
                                  stroke="black"
                                  stroke-width="2"></rect>
                        </g>
                    </svg>
                    Horizontal lines
                </mat-option>
                <mat-option [value]="fillPatternEnum.VerticalLines">
                    Vertical lines
                </mat-option>
                <mat-option [value]="fillPatternEnum.Grid">
                    Grid
                </mat-option>
                <mat-option [value]="fillPatternEnum.DiagonalGrid">
                    Diagonal grid
                </mat-option>
                <mat-option [value]="fillPatternEnum.LinesFromLeftTopToRightBottom">
                    Lines from left top to right bottom
                </mat-option>
                <mat-option [value]="fillPatternEnum.LinesFromLeftBottomToRightTop">
                    Lines from left bottom to right top
                </mat-option>
                <mat-option [value]="fillPatternEnum.Checkerboard">
                    Checkerboard
                </mat-option>
                <mat-option [value]="fillPatternEnum.DiagonalCheckerboard">
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
