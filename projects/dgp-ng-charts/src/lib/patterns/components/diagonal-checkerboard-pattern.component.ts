import { Component } from "@angular/core";

@Component({
    selector: "dgp-diagonal-checkerboard-pattern",
    template: `
        <pattern id="diagonal-checkerboard-pattern"
                 x="0"
                 y="0"
                 width="15"
                 height="15"
                 patternUnits="userSpaceOnUse"
                 patternTransform="rotate(45)">
            <rect x="0"
                  width="7"
                  height="7"
                  y="0"
                  fill="white"></rect>
            <rect x="7"
                  width="7"
                  height="7"
                  y="7"
                  fill="white"></rect>
        </pattern>
    `
})
export class DgpDiagonalCheckerboardPatternComponent {

}
