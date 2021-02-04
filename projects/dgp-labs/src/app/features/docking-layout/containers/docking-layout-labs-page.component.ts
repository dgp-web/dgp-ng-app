import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "labs-docking-layout-labs-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Docking layout
        </dgp-page-header>

        <dgp-docking-layout>

            <dgp-docking-layout-item type="row">

                <dgp-docking-layout-item type="column"
                                         width="20">
                    <dgp-docking-layout-container label="Available items">
                        <ng-template>
                            <dgp-dark-mode-toggle></dgp-dark-mode-toggle>

                            <dgp-tile label="Test"
                                      externalLink="https://github.com/dgp-web/dgp-ng-app"></dgp-tile>

                        </ng-template>
                    </dgp-docking-layout-container>
                </dgp-docking-layout-item>

                <dgp-docking-layout-item type="column"
                                         width="60">

                    <dgp-docking-layout-item type="stack"
                                             selectedItemIndex="1">
                        <dgp-docking-layout-container label="Main tab">
                            <ng-template>
                                Main
                            </ng-template>
                        </dgp-docking-layout-container>
                        <dgp-docking-layout-container label="Secondary tab">
                            <ng-template>
                                Secondary
                            </ng-template>
                        </dgp-docking-layout-container>
                    </dgp-docking-layout-item>

                </dgp-docking-layout-item>

                <dgp-docking-layout-item type="column"
                                         width="20">
                    <dgp-docking-layout-container label="Details">
                        <ng-template>
                            Some content
                        </ng-template>
                    </dgp-docking-layout-container>

                    <dgp-docking-layout-container label="Some more info">
                        <ng-template>
                            Some more info
                        </ng-template>
                    </dgp-docking-layout-container>

                </dgp-docking-layout-item>

            </dgp-docking-layout-item>
        </dgp-docking-layout>
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
export class DockingLayoutLabsPageComponent {

}
