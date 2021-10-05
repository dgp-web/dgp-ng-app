import { ChangeDetectionStrategy, Component } from "@angular/core";
import { SymbolBaseComponent } from "./symbol.base-component";

@Component({
    selector: "dgp-rhombus-symbol",
    template: `
        <svg xmlns="http://www.w3.org/2000/svg"
             [style.width.px]="width"
             [style.height.px]="height">
            <polygon dgpRhombus
                     [style.fill]="fillColor"
                     [style.stroke]="fillColor"
                     [width]="width"
                     [height]="height"/>
        </svg>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RhombusSymbolComponent extends SymbolBaseComponent {

}
