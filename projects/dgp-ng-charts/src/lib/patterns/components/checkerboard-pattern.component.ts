import { Component } from "@angular/core";

@Component({
    selector: "dgp-checkerboard-pattern",
    template: `
        <svg:pattern id="checkerboard-pattern"
                     x="0"
                     y="0"
                     width="15"
                     height="15"
                     patternUnits="userSpaceOnUse">
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
export class DgpCheckerboardPatternComponent {

}
