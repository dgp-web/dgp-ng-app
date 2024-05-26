import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-lazy-rendered-labs-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Lazy rendered
        </dgp-page-header>

        <div class="content">

            <dgp-lazy-rendered *ngFor="let item of items">

                <ng-template dgpLazyRenderedPlaceholder>
                    <div style="display: block; width: 100%; height: 240px; background: blue; flex-shrink: 0;">
                        Placeholder is rendered
                    </div>
                </ng-template>

                <ng-template dgpLazyRenderedContent>
                    <div style="display: block; width: 100%; height: 400px; background: red; flex-shrink: 0;">
                        Content is rendered
                    </div>
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
    items = new Array(100);
}
