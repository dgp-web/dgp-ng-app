import { Component } from "@angular/core";

@Component({
    selector: "dgp-lines-from-left-top-to-right-bottom-pattern",
    template: `
        <svg:pattern id="lines-from-left-top-to-right-bottom-pattern"
                     x="0"
                     y="0"
                     width="4"
                     height="4"
                     patternUnits="userSpaceOnUse"
                     patternTransform="rotate(135 0 0)">
            <svg:rect x="0"
                      y="0"
                      width="1"
                      height="4"
                      stroke="white"
                      stroke-width="1"/>
        </svg:pattern>
    `
})
export class DgpLinesFromLeftTopToRightBottomComponent {

}
