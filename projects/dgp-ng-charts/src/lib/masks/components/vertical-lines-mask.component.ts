import { Component } from "@angular/core";

@Component({
    selector: "dgp-vertical-lines-mask",
    template: `
        <svg:mask id="vertical-lines-mask">
            <svg:rect x="0"
                      y="0"
                      width="100%"
                      height="100%"
                      fill="url(#vertical-lines-pattern)"/>
        </svg:mask>
    `
})
export class DgpVerticalLinesMaskComponent {

}
