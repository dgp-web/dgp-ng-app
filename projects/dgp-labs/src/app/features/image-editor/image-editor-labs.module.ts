import { NgModule } from "@angular/core";
import { containers } from "./containers/containers";
import { RouterModule } from "@angular/router";
import { ImageEditorLabsComponent } from "./containers/image-editor-labs.component";
import { DgpHamburgerMenuToggleModule, DgpPageHeaderModule } from "dgp-ng-app";
import { DgpDockingLayoutModule } from "dgp-ng-docking-layout";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "image-editor",
            component: ImageEditorLabsComponent
        }]),
        DgpPageHeaderModule,
        DgpHamburgerMenuToggleModule,
        DgpDockingLayoutModule
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
