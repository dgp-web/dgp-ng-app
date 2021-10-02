import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "dgp-box-plot-labs",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Charts
        </dgp-page-header>

        <dgp-docs-page>

            <dgp-docs-page-content>

                <dgp-docs-chapter-title>
                    Box plot
                </dgp-docs-chapter-title>

            </dgp-docs-page-content>
        </dgp-docs-page>

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
export class BoxPlotLabsComponent {

}
