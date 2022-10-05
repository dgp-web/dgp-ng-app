import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "dgp-image-editor-labs",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Image editor
        </dgp-page-header>

        <dgp-docking-layout>
            <dgp-docking-layout-item type="row">
                <dgp-docking-layout-item type="column"
                                         [width]="80">
                    <dgp-docking-layout-container label="Image">
                        <ng-template>
                            <dgp-image-editor [model]="src"></dgp-image-editor>
                        </ng-template>
                    </dgp-docking-layout-container>
                </dgp-docking-layout-item>

                <dgp-docking-layout-item type="column"
                                         [width]="20">
                    <dgp-docking-layout-container label="Settings">
                        <ng-template>

                        </ng-template>
                    </dgp-docking-layout-container>
                </dgp-docking-layout-item>
            </dgp-docking-layout-item>
        </dgp-docking-layout>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageEditorLabsComponent {
    src = "/assets/github-logo.png";
}
