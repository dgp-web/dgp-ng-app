import { Component, ChangeDetectionStrategy } from "@angular/core";
import { SymbolBaseComponent } from "./symbol.base-component";

@Component({
    selector: "dgp-triangle-left-symbol",
    template: `
        <svg xmlns="http://www.w3.org/2000/svg"
             [style.width.px]="width"
             [style.height.px]="height">
            <polygon dgpTriangleLeft
                     [style.fill]="fillColor"
                     [style.stroke]="fillColor"
                     [width]="width"
                     [height]="height"/>
        </svg>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TriangleLeftSymbolComponent extends SymbolBaseComponent {

}
