import { Component, Injector } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { EmptyStateComponent } from "dgp-ng-app";

@Component({
    selector: "dgp-ng-app-wcs",
    template: ``,
    styles: [`
        :host {
        }
    `]
})
export class AppComponent {

    constructor(
        private readonly injector: Injector
    ) {
        // Convert `PopupComponent` to a custom element.
        const PopupElement = createCustomElement(EmptyStateComponent, {injector});
        // Register the custom element with the browser.
        customElements.define("dgpw-empty-state", PopupElement);

    }
}
