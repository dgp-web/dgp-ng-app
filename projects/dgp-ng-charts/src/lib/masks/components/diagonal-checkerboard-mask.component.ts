import { Component } from "@angular/core";

@Component({
    selector: "dgp-diagonal-checkerboard-mask",
    template: `
        <svg:mask id="diagonal-checkerboard-mask">
            <svg:rect x="0"
                      y="0"
                      width="100%"
                      height="100%"
                      fill="url(#diagonal-checkerboard-pattern)"/>
        </svg:mask>
    `
})
export class DgpDiagonalCheckerboardMaskComponent {

}
