import { Component, HostBinding } from "@angular/core";

@Component({
    selector: "app-root",
    template: `
        <mat-card class="container">

            <div class="menu">
                <dgpw-hamburger-menu-header>
                    DGP NG APP WCS
                </dgpw-hamburger-menu-header>
                <dgpw-hamburger-menu-entries>
                    <dgpw-hamburger-menu-entry label="Overview"
                                               mat-icon-name="home"></dgpw-hamburger-menu-entry>
                </dgpw-hamburger-menu-entries>
            </div>

            <div class="page">

                <dgpw-page-header>
                    Overview
                </dgpw-page-header>

                <dgpw-empty-state mat-icon-name="info"
                                  title="Web Component">
                    Content
                </dgpw-empty-state>
            </div>
        </mat-card>

    `,
    styles: [`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .container {
        padding: 0;
        border-radius: 0;
        display: flex;
        height: 100%;
      }

      .page {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
      }

      dgpw-hamburger-menu-entries {
        width: 240px;
        flex-grow: 1;
        border-right: 1px solid gray;
      }

      dgpw-empty-state {
        max-height: unset;
      }

      .menu {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
    `]
})
export class AppComponent {

    @HostBinding("class.dark-theme")
    readonly bindings = true;
}
