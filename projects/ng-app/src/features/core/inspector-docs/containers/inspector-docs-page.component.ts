import { ChangeDetectionStrategy, Component } from "@angular/core";
import { InspectorConfig, inspectorDefaultConfig } from "dgp-ng-app";

@Component({
    selector: "dgp-inspector-docs-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Inspector
        </dgp-page-header>

        <dgp-docs-page>
            <dgp-docs-page-content>

                <dgp-docs-chapter-title>Inspector</dgp-docs-chapter-title>

                <p>
                    Compact, elegant detail menus.
                </p>

                <dgp-docs-section-title>Demo</dgp-docs-section-title>

                <dgp-inspector-config [model]="inspectorConfig"
                                      (modelChange)="updateInspectorConfig($event)"></dgp-inspector-config>

                <dgp-inspector>
                    <dgp-inspector-section matIconName="color_lens"
                                           label="Colors">

                        <dgp-inspector-item matIconName="brush"
                                            label="Primary color">
                            <mat-form-field>
                                <input matInput>
                            </mat-form-field>
                        </dgp-inspector-item>

                        <dgp-inspector-item matIconName="colorize"
                                            label="Secondary color">
                            <mat-form-field>
                                <mat-select>
                                    <mat-option>Option 1</mat-option>
                                    <mat-option>Option 2</mat-option>
                                </mat-select>
                            </mat-form-field>
                        </dgp-inspector-item>

                    </dgp-inspector-section>
                </dgp-inspector>

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectorDocsPageComponent {

    inspectorConfig = inspectorDefaultConfig;

    updateInspectorConfig(payload: InspectorConfig) {
        this.inspectorConfig = payload;
    }
}
