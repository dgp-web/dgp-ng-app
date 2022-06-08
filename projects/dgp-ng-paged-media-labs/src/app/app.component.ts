import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "dgp-ng-paged-media-labs",
    template: `
        <div class="dgp-paged-media-page-A4">

            <header class="dgp-paged-media-header">
                First section header
            </header>

            <main class="dgp-paged-media-content">
                First section content
            </main>

            <footer class="dgp-paged-media-footer">
                First section footer
            </footer>
        </div>

        <div class="dgp-paged-media-page-A4">

            <header class="dgp-paged-media-header">
                Second section header
            </header>

            <main class="dgp-paged-media-content">
                Second section content
                <dgp-blind-text></dgp-blind-text>
            </main>

            <footer class="dgp-paged-media-footer">
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
