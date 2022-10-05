import { NgModule } from "@angular/core";
import { containers } from "./containers/containers";
import { RouterModule } from "@angular/router";
import { ImageEditorLabsComponent } from "./containers/image-editor-labs.component";
import { DgpHamburgerMenuToggleModule, DgpPageHeaderModule } from "dgp-ng-app";
import { DgpDockingLayoutModule } from "dgp-ng-docking-layout";
import { DgpImageEditorModule } from "../../../../../dgp-ng-image-editor/src/lib/image-editor/image-editor.module";
import { DgpImageConfigModule } from "../../../../../dgp-ng-image-editor/src/lib/image-config/image-config.module";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "image-editor",
            component: ImageEditorLabsComponent
        }]),
        DgpPageHeaderModule,
        DgpHamburgerMenuToggleModule,
        DgpDockingLayoutModule,
        DgpImageEditorModule,
        DgpImageConfigModule
    ],
    declarations: [
        ...containers
    ],
    exports: [
        ...containers
    ]
})
export class ImageEditorLabsModule {
}
