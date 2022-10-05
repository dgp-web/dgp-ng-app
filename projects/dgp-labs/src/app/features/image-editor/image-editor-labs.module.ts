import { NgModule } from "@angular/core";
import { containers } from "./containers/containers";
import { RouterModule } from "@angular/router";
import { ImageEditorLabsComponent } from "./containers/image-editor-labs.component";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "image-editor",
            component: ImageEditorLabsComponent
        }])
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
