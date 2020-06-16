import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-hamburger-menu-header",
    template: `
        <mat-toolbar color="primary"
                     class="hamburger-menu__header">
            <ng-content></ng-content>
        </mat-toolbar>
    `,
    styles: [`
    
   `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HamburgerMenuHeaderComponent {

}
