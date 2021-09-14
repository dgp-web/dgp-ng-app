import { Component } from "@angular/core";

@Component({
    selector: "dgp-horizontal-lines-mask",
    template: `
        <svg:mask id="horizontal-lines-mask">
            <svg:rect x="0"
                      y="0"
                      width="100%"
                      height="100%"
                      fill="url(#horizontal-lines-pattern)"/>
        </svg:mask>
    `
})
export class DgpHorizontalLinesMaskComponent {

}
