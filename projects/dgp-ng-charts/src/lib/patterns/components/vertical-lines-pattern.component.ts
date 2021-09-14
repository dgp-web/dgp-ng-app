import { Component } from "@angular/core";

@Component({
    selector: "dgp-vertical-lines-pattern",
    template: `
        <svg:pattern id="vertical-lines-pattern"
                     x="0"
                     y="0"
                     width="4"
                     height="4"
                     patternUnits="userSpaceOnUse">
            <svg:rect x="0"
                      y="0"
                      width="1"
                      height="4"
                      stroke="white"
                      stroke-width="1"/>
        </svg:pattern>
    `
})
export class DgpVerticalLinesPatternComponent {

}
