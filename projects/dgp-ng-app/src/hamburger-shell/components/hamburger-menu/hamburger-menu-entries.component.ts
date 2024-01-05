import { Component } from "@angular/core";

@Component({
    selector: "dgp-hamburger-menu-entries",
    template: `
        <mat-nav-list>
            <ng-content></ng-content>
        </mat-nav-list>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            overflow: auto;
            flex-grow: 1;
        }

        mat-nav-list {
            flex-grow: 1;
        }
    `]
})
export class HamburgerMenuEntriesComponent {

}
