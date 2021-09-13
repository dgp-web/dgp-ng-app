import { Component } from "@angular/core";

@Component({
    selector: "dgp-lines-from-left-bottom-to-right-top-mask",
    template: `
        <svg:mask id="lines-from-left-bottom-to-right-top-mask">
            <svg:rect x="0"
                      y="0"
                      width="100%"
                      height="100%"
                      fill="url(#lines-from-left-bottom-to-right-top-pattern)"/>
        </svg:mask>
    `
})
export class DgpLinesFromLeftBottomToRightTopMaskComponent {

}
