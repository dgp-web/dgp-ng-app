import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ImageConfig } from "../../../../../../dgp-ng-image-editor/src/lib/models";
import { DgpModelEditorComponentBase } from "dgp-ng-app";

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
                            <dgp-image-editor [src]="src"
                                              [stretch]="model.stretch"></dgp-image-editor>
                        </ng-template>
                    </dgp-docking-layout-container>
                </dgp-docking-layout-item>

                <dgp-docking-layout-item type="column"
                                         [width]="20">
                    <dgp-docking-layout-container label="Settings">
                        <ng-template>
                            <dgp-image-config [model]="model"
                                              (modelChange)="setModel($event)"></dgp-image-config>
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
export class ImageEditorLabsComponent extends DgpModelEditorComponentBase<ImageConfig> {
    src = "/assets/github-logo.png";

    model = {} as ImageConfig;

}
