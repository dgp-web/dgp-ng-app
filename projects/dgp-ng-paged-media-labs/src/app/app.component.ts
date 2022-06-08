import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "dgp-ng-paged-media-labs",
    template: `
        <dgp-paged-media-page-A4>

            <dgp-paged-media-header>
                First section header
            </dgp-paged-media-header>

            <dgp-paged-media-content>
                First section content
            </dgp-paged-media-content>

            <dgp-paged-media-footer>
                First section footer
            </dgp-paged-media-footer>
        </dgp-paged-media-page-A4>

        <dgp-paged-media-page-A4>

            <dgp-paged-media-header>
                Second section header
            </dgp-paged-media-header>

            <dgp-paged-media-content>
                Second section content
                <dgp-blind-text></dgp-blind-text>
            </dgp-paged-media-content>

            <dgp-paged-media-footer>
                Second section footer
            </dgp-paged-media-footer>
        </dgp-paged-media-page-A4>
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
