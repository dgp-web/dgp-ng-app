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

                    <dgp-docking-layout-item type="stack">
                        <dgp-docking-layout-container label="Main tab"
                                                      id="Main tab">
                            <ng-template>
                                <dgp-inspector class="--compact">
                                    <dgp-inspector-item [metadata]="metadata"
                                                        [responsive]="true">
                                        This is the content of this item.
                                    </dgp-inspector-item>
                                    <dgp-inspector-item label="Direct label"
                                                        matIconName="label"
                                                        description="Everything can be!"
                                                        [responsive]="true">
                                        <input [value]="'The input has a very long value.'"
                                               style="width:100%;">
                                    </dgp-inspector-item>
                                </dgp-inspector>

                                <dgp-input-field class="--compact"
                                                 [metadata]="metadata"
                                                 [responsive]="true">
                                    Test
                                </dgp-input-field>

                                <dgp-input-field class="--compact"
                                                 [metadata]="metadata"
                                                 [model]="model"
                                                 [responsive]="true">
                                    <input [(ngModel)]="model"
                                           dgpInputMetadata
                                           [metadata]="metadata">
                                </dgp-input-field>

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
                            test
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
        description: `This is a description that is displayed below the item.`,
        hint: "Test",
        type: "string",
        min: 4,
        max: 16
    };

    model = "model value";

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
