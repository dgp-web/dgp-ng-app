import { ChangeDetectionStrategy, Component } from "@angular/core";
import { SymbolBaseComponent } from "./symbol.base-component";

@Component({
    selector: "dgp-circle-symbol",
    template: `
        <svg xmlns="http://www.w3.org/2000/svg"
             [style.width.px]="width"
             [style.height.px]="height">
            <circle dgpCircle
                    [attr.fill]="fillColor"
                    [width]="width"
                    [height]="height"/>
        </svg>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CircleSymbolComponent extends SymbolBaseComponent {

}
