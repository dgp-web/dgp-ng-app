import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-hamburger-menu-entries",
    template: `
        <ng-content></ng-content>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            overflow: auto;
            flex-grow: 1;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HamburgerMenuEntriesComponent {

}
