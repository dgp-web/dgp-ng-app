import { Component, Injector } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { EmptyState, EmptyStateComponent, HamburgerMenuEntryComponent } from "dgp-ng-app";

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
        this.registerHamburgerShell();
    }

    private registerEmptyState() {
        const EmptyStateElement = createCustomElement<EmptyState>(EmptyStateComponent, {
            injector: this.injector
        });
        customElements.define("dgpw-empty-state", EmptyStateElement);
    }

    private registerHamburgerShell() {
        const HamburgerMenuEntryElement = createCustomElement<EmptyState>(HamburgerMenuEntryComponent, {
            injector: this.injector
        });
        customElements.define("dgpw-hamburger-menu-entry", HamburgerMenuEntryElement);
    }
}
