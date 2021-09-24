import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { DgpView } from "dgp-ng-app";
import { svgSymbolKeys } from "../constants/svg-symbol-keys.constant";

@Component({
    selector: "dgp-svg-symbol",
    template: `
        <ng-container [ngSwitch]="model">
            <dgp-circle-symbol *ngSwitchCase="svgSymbolKeys.circle"
                               [fillColor]="fillColor"></dgp-circle-symbol>
            <dgp-rectangle-symbol *ngSwitchCase="svgSymbolKeys.rectangle"
                                  [fillColor]="fillColor"></dgp-rectangle-symbol>
            <dgp-triangle-symbol *ngSwitchCase="svgSymbolKeys.triangle"
                                 [fillColor]="fillColor"></dgp-triangle-symbol>
            <dgp-triangle-down-symbol *ngSwitchCase="svgSymbolKeys.triangleDown"
                                      [fillColor]="fillColor"></dgp-triangle-down-symbol>
            <dgp-triangle-right-symbol
                *ngSwitchCase="svgSymbolKeys.triangleRight"
                [fillColor]="fillColor"></dgp-triangle-right-symbol>
            <dgp-triangle-left-symbol *ngSwitchCase="svgSymbolKeys.triangleLeft"
                                      [fillColor]="fillColor"></dgp-triangle-left-symbol>
            <dgp-star-symbol *ngSwitchCase="svgSymbolKeys.star"
                             [fillColor]="fillColor"></dgp-star-symbol>
            <dgp-rhombus-symbol *ngSwitchCase="svgSymbolKeys.rhombus"
                                [fillColor]="fillColor"></dgp-rhombus-symbol>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SVGSymbolComponent extends DgpView<string> {
    readonly svgSymbolKeys = svgSymbolKeys;
    @Input()
    fillColor: string;
}
