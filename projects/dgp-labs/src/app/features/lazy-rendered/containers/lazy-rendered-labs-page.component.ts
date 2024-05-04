import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-lazy-rendered-labs-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Lazy rendered
        </dgp-page-header>

        <div class="content">

            <dgp-lazy-rendered></dgp-lazy-rendered>

        </div>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            height: 100%;
            overflow: auto;
        }

        .content {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            overflow: auto;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyRenderedLabsPageComponent {

}
