import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "dgp-ng-paged-media-labs",
    template: `
        <div class="dgp-document-A4">

            <div class="dgp-section-A4">

                <header class="dgp-page-header">
                    First section header
                </header>

                <footer class="dgp-page-footer">
                    First section footer
                </footer>

            </div>

            <div class="dgp-section-A4">

                <header class="dgp-page-header">
                    Second section header
                </header>

                <footer class="dgp-page-footer">
                    Second section footer
                </footer>

            </div>
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
