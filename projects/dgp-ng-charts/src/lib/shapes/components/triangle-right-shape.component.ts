import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ShapeBaseComponent } from "./shape.base-component";

@Component({
    selector: "dgp-triangle-right-shape",
    template: `
        <svg xmlns="http://www.w3.org/2000/svg"
             [style.width.px]="width"
             [style.height.px]="height">
            <polygon dgpTriangleRight
                     [style.fill]="fillColor"
                     [style.stroke]="fillColor"
                     [width]="width"
                     [height]="height"/>
        </svg>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TriangleRightShapeComponent extends ShapeBaseComponent {

}
