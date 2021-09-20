import { Component } from "@angular/core";

@Component({
    selector: "dgp-grid-mask",
    template: `
        <svg:mask id="grid-mask">
            <svg:rect x="0"
                      y="0"
                      width="100%"
                      height="100%"
                      fill="url(#horizontal-lines-pattern)"/>
            <svg:rect x="0"
                      y="0"
                      width="100%"
                      height="100%"
                      fill="url(#vertical-lines-pattern)"/>
        </svg:mask>
    `
})
export class DgpGridMaskComponent {

}
