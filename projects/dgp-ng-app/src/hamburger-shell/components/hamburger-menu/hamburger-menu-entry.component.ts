import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

@Component({
    selector: "dgp-hamburger-menu-entry",
    template: `
        <a mat-list-item
           [routerLink]="route"
           [routerLinkActive]="'dgp-list-item--selected'">
            <mat-icon>{{ matIconName }}</mat-icon>
            {{ label }}
        </a>
    `,
    styles: [`
        mat-icon {
            margin-right: 16px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HamburgerMenuEntryComponent {

    @Input()
    matIconName: string;

    @Input()
    label: string;

    @Input()
    route: any;

}
