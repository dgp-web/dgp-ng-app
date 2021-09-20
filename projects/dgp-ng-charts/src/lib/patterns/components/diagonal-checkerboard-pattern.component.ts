import { Component } from "@angular/core";

@Component({
    selector: "dgp-diagonal-checkerboard-pattern",
    template: `
        <svg:pattern id="diagonal-checkerboard-pattern"
                     x="0"
                     y="0"
                     width="15"
                     height="15"
                     patternUnits="userSpaceOnUse"
                     patternTransform="rotate(45)">
            <svg:rect x="0"
                      width="7"
                      height="7"
                      y="0"
                      fill="white"/>
            <svg:rect x="7"
                      width="7"
                      height="7"
                      y="7"
                      fill="white"/>
        </svg:pattern>
    `
})
export class DgpDiagonalCheckerboardPatternComponent {

}
