import { ChangeDetectionStrategy, Component } from "@angular/core";
import { interval } from "rxjs";
import { map } from "rxjs/operators";
import { AttributeMetadata } from "data-modeling";

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
                                             [selectedItemId]="selectedItemId$ | async"
                                             (selectedItemIdChange)="selectedItem($event)">
                        <dgp-docking-layout-container label="Main tab"
                                                      id="Main tab">
                            <ng-template>
                                <dgp-inspector>
                                    <dgp-inspector-metadata-item
                                        [metadata]="metadata"></dgp-inspector-metadata-item>
                                </dgp-inspector>
                            </ng-template>
                        </dgp-docking-layout-container>
                        <dgp-docking-layout-container label="Secondary tab"
                                                      id="Secondary tab">
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

    readonly metadata: AttributeMetadata<string> = {
        label: "Label",
        icon: "info",
        description: `This is a description that is displayed below the item.`
    };

    readonly selectedItemId$ = interval(1000).pipe(
        map(x => {
            if (x % 2 === 0) {
                return "Main tab";
            } else {
                return "Secondary tab";
            }
        })
    );

    selectedItem(itemId: string) {
        console.log(itemId);
    }
}
