import { Component, Injector } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { EmptyState, EmptyStateComponent } from "dgp-ng-app";

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
        this.registerEmptyState();
    }

    private registerEmptyState() {
        const EmptyStateElement = createCustomElement<EmptyState>(EmptyStateComponent, {
            injector: this.injector
        });
        customElements.define("dgpw-empty-state", EmptyStateElement);
    }
}
