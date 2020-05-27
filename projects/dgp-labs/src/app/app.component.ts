import { Component } from "@angular/core";
import { DgpContainer, getAuthenticatedUserSelector } from "dgp-ng-app";

@Component({
    selector: "app-root",
    template: `
        <dgp-docking-layout dgpThemeHost>
            <dgp-docking-layout-item type="column">
                <dgp-docking-layout-container [label]="'e'">
                    <ng-template>
                        A

                        <dgp-dark-mode-toggle></dgp-dark-mode-toggle>

                    </ng-template>
                </dgp-docking-layout-container>
                <dgp-docking-layout-container [label]="'e'">
                    <ng-template>
                        B
                    </ng-template>
                </dgp-docking-layout-container>
            </dgp-docking-layout-item>
        </dgp-docking-layout>
        <!--<dgp-split-panel orientation="horizontal"
                         dgpThemeHost>
            <dgp-split-panel-content size="20">
                <ng-template>
                    A
                    <dgp-dark-mode-toggle></dgp-dark-mode-toggle>
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
        </dgp-split-panel>-->
    `,
    styleUrls: [
        "./app.component.scss"
    ]
})
export class AppComponent extends DgpContainer {

    readonly authenticatedUser$ = this.select(getAuthenticatedUserSelector);


}
