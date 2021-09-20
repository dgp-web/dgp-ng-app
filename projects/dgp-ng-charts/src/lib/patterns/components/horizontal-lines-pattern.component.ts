import { Component } from "@angular/core";

@Component({
    selector: "dgp-horizontal-lines-pattern",
    template: `
        <svg:pattern id="horizontal-lines-pattern"
                     x="0"
                     y="0"
                     width="4"
                     height="4"
                     patternUnits="userSpaceOnUse">
            <svg:rect x="0"
                      y="0"
                      width="4"
                      height="1"
                      stroke="white"
                      stroke-width="1"/>
        </svg:pattern>
    `
})
export class DgpHorizontalLinesPatternComponent {

}
