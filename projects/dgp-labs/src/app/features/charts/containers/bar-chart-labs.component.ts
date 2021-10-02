import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "dgp-bar-chart-labs",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Bar chart
        </dgp-page-header>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            height: 100%;
            overflow: auto;
        }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartLabsComponent {

}
