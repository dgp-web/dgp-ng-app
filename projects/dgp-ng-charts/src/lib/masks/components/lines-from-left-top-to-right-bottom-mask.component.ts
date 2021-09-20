import { Component } from "@angular/core";

@Component({
    selector: "dgp-lines-from-left-top-to-right-bottom-mask",
    template: `
        <svg:mask id="lines-from-left-top-to-right-bottom-mask">
            <svg:rect x="0"
                      y="0"
                      width="100%"
                      height="100%"
                      fill="url(#lines-from-left-top-to-right-bottom-pattern)"/>
        </svg:mask>
    `
})
export class DgpLinesFromLeftTopToRightBottomMaskComponent {

}
