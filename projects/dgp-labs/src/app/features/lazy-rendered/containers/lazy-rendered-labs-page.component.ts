import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-lazy-rendered-labs-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Lazy rendered
        </dgp-page-header>

        <div class="content">

            <dgp-lazy-rendered>

                <ng-template dgpLazyRenderedPlaceholder>
                    <dgp-empty-state title="Not loaded"
                                     matIconName="info"></dgp-empty-state>
                </ng-template>

                <ng-template dgpLazyRenderedContent>
                    Content is rendered
                </ng-template>


            </dgp-lazy-rendered>

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
