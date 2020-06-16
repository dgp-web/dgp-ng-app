import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "labs-split-panel-labs-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Split panel
        </dgp-page-header>

        <dgp-split-panel orientation="horizontal">
            <dgp-split-panel-content size="20">
                <ng-template>
                    <div class="panel-content">
                        A
                        <dgp-dark-mode-toggle></dgp-dark-mode-toggle>
                    </div>
                </ng-template>
            </dgp-split-panel-content>

            <dgp-split-panel-content size="30">
                <ng-template>
                    B
                </ng-template>
            </dgp-split-panel-content>

            <dgp-split-panel-content size="50">
                <ng-template>

                    <dgp-split-panel orientation="vertical">
                        <dgp-split-panel-content size="50">
                            <ng-template>
                                C
                            </ng-template>
                        </dgp-split-panel-content>

                        <dgp-split-panel-content size="50">
                            <ng-template>
                                D
                            </ng-template>
                        </dgp-split-panel-content>
                    </dgp-split-panel>

                </ng-template>
            </dgp-split-panel-content>
        </dgp-split-panel>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            height: 100%;
            overflow: auto;
        }

        .panel-content {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            overflow: auto;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitPanelLabsPageComponent {

}
