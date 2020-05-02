import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-hamburger-menu",
    template: `<ng-content></ng-content>`,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            height: 100%;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HamburgerMenuComponent {
}
