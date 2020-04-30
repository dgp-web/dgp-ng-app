import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
    selector: "dgp-hamburger-menu-entry",
    template: `
        <a mat-list-item
           [routerLink]="route"
           [routerLinkActive]="'dgp-list-item--selected'"
           [class.disabled]="disabled"
           [attr.tabindex]="disabled ? -1 : 0">
            <mat-icon>{{ matIconName }}</mat-icon>
            {{ label }}
        </a>
    `,
    styles: [`
        mat-icon {
            margin-right: 16px;
        }

        .disabled {
            pointer-events: none;
            color: gray !important;
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

    @Input()
    disabled: any;
}
