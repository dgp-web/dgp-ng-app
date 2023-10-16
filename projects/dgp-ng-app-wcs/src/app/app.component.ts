import { Component, Injector } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import {
    DarkModeToggleComponent,
    EmptyState,
    EmptyStateComponent,
    HamburgerMenuEntriesComponent,
    HamburgerMenuEntryComponent,
    HamburgerMenuHeaderComponent,
    HamburgerShellComponent,
    PageHeaderComponent
} from "dgp-ng-app";

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
        // TODO: No theme-switcher directive
        this.registerDarkModeToggle();
        this.registerEmptyState();
        // TODO: No router-link
        // TODO: No regular content-projection but slots requiring shadow DOM
        this.registerHamburgerShell();
        this.registerPageHeader();
    }

    private registerDarkModeToggle() {
        const DarkModeToggleElement = createCustomElement(DarkModeToggleComponent, {
            injector: this.injector
        });
        customElements.define("dgpw-dark-mode-toggle", DarkModeToggleElement);
    }

    private registerEmptyState() {
        const EmptyStateElement = createCustomElement<EmptyState>(EmptyStateComponent, {
            injector: this.injector
        });
        customElements.define("dgpw-empty-state", EmptyStateElement);
    }

    private registerHamburgerShell() {
        const HamburgerMenuEntryElement = createCustomElement(HamburgerMenuEntryComponent, {
            injector: this.injector
        });
        customElements.define("dgpw-hamburger-menu-entry", HamburgerMenuEntryElement);

        const HamburgerMenuEntriesElement = createCustomElement(HamburgerMenuEntriesComponent, {
            injector: this.injector
        });
        customElements.define("dgpw-hamburger-menu-entries", HamburgerMenuEntriesElement);

        const HamburgerMenuShellElement = createCustomElement(HamburgerShellComponent, {
            injector: this.injector
        });
        customElements.define("dgpw-hamburger-menu-shell", HamburgerMenuShellElement);

        const HamburgerMenuHeaderElement = createCustomElement(HamburgerMenuHeaderComponent, {
            injector: this.injector
        });
        customElements.define("dgpw-hamburger-menu-header", HamburgerMenuHeaderElement);
    }

    private registerPageHeader() {
        const PageHeaderElement = createCustomElement(PageHeaderComponent, {
            injector: this.injector
        });
        customElements.define("dgpw-page-header", PageHeaderElement);
    }

}
