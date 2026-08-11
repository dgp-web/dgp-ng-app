import { Component, ChangeDetectionStrategy } from "@angular/core";
import { of } from "rxjs";
import { chartFeatures } from "../constants/charts/chart-features.constant";
import { coreFeatures } from "../constants/core-features.constant";

@Component({
    selector: "app-root",
    template: `
        <dgp-hamburger-shell dgpThemeHost
          class="mat-typography">
        
          <dgp-hamburger-menu dgp-hamburger-menu>
        
            <dgp-hamburger-menu-header>
              DGP NG APP (v20)
            </dgp-hamburger-menu-header>
        
            <dgp-hamburger-menu-entries>
              <dgp-hamburger-menu-entry route="/home"
                label="Home"
              matIconName="home"></dgp-hamburger-menu-entry>
        
              <dgp-inspector-section label="Core">
                @for (feature of coreFeatures$ | async; track feature) {
                  <dgp-hamburger-menu-entry
                    [route]="feature.route"
                    [label]="feature.label"
                  [matIconName]="feature.matIconName"></dgp-hamburger-menu-entry>
                }
              </dgp-inspector-section>
        
              <dgp-inspector-section label="Charts">
        
                @for (feature of chartFeatures$ | async; track feature) {
                  <dgp-hamburger-menu-entry
                    [route]="feature.route"
                    [label]="feature.label"
                  [matIconName]="feature.matIconName"></dgp-hamburger-menu-entry>
                }
              </dgp-inspector-section>
            </dgp-hamburger-menu-entries>
        
            <dgp-dark-mode-toggle></dgp-dark-mode-toggle>
        
            <mat-nav-list>
              <dgp-hamburger-menu-entry route="/logEntries"
                label="Log"
              matIconName="error"></dgp-hamburger-menu-entry>
            </mat-nav-list>
          </dgp-hamburger-menu>
        
          <router-outlet></router-outlet>
        </dgp-hamburger-shell>
        `,
    styles: [`
        :host {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
        }
    `],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AppComponent {
    readonly coreFeatures$ = of(coreFeatures);
    readonly chartFeatures$ = of(chartFeatures);
}
