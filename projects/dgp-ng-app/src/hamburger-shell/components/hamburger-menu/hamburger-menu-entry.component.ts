import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
    selector: "dgp-hamburger-menu-entry",
    template: `
        <a *ngIf="isNonEmptyRoute(); else emptyRoute"
           [routerLink]="route"
           [routerLinkActive]="'dgp-list-item--selected'"
           [class.disabled]="disabled"
           [attr.tabindex]="disabled ? -1 : 0">
            <mat-icon>{{ matIconName }}</mat-icon>
            {{ label }}
        </a>

        <ng-template #emptyRoute>
            <a class="disabled"
               tabindex="-1">
                <mat-icon>{{ matIconName }}</mat-icon>
                {{ label }}
            </a>
        </ng-template>
    `,
    styles: [`
        :host {
            display: flex;
            width: 100%;
            padding-left: 8px;
            padding-right: 8px;
        }

        a {
            text-decoration: none;
            color: inherit;
            display: flex;
            align-items: center;
            flex-grow: 1;
            padding-top: 4px;
            padding-bottom: 4px;
        }

        mat-icon {
            margin-left: 8px;
            margin-right: 8px;
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

    isNonEmptyRoute() {
        return this.route && this.route.length !== 0;
    }

}
