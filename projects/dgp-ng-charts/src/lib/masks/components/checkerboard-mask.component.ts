import { Component } from "@angular/core";

@Component({
    selector: "dgp-checkerboard-mask",
    template: `
        <svg:mask id="checkerboard-mask">
            <svg:rect x="0"
                      y="0"
                      width="100%"
                      height="100%"
                      fill="url(#checkerboard-pattern)"/>
        </svg:mask>
    `
})
export class DgpCheckerboardMaskComponent {

}
