import { Component } from "@angular/core";

@Component({
    selector: "dgp-diagonal-grid-mask",
    template: `
        <svg:mask id="diagonal-grid-mask">
            <svg:rect x="0"
                      y="0"
                      width="100%"
                      height="100%"
                      stroke-width="1"
                      fill="url(#lines-from-left-bottom-to-right-top-pattern)"/>
            <svg:rect x="0"
                      y="0"
                      width="100%"
                      height="100%"
                      fill="url(#lines-from-left-top-to-right-bottom-pattern)"/>
        </svg:mask>
    `
})
export class DgpDiagonalGridMaskComponent {

}
