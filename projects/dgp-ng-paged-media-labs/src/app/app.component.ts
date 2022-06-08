import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "dgp-ng-paged-media-labs",
    template: `
        <div class="dgp-page-A4">

            <header class="dgp-page-header">
                First section header
            </header>

            <main class="dgp-page-content">
                First section content
                <dgp-blind-text></dgp-blind-text>
            </main>

            <footer class="dgp-page-footer">
                First section footer
            </footer>

        </div>

        <div class="dgp-page-A4">

            <header class="dgp-page-header dgp-page-header-02">
                Second section header
            </header>

            <main class="dgp-page-content">
                Second section content
            </main>

            <footer class="dgp-page-footer dgp-page-footer-last">
                Second section footer
            </footer>
        </div>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow: auto;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
}
