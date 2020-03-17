import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DragFileListenerDirective } from "./directive/drag-file-listener.directive";
import { EffectsModule } from "@ngrx/effects";
import { FileUploadEffects } from "./effects";
import { FileManagerComponent } from "./containers/file-manager.component";
import { MatDialogModule } from "@angular/material/dialog";
import { DgpPageHeaderModule } from "../hamburger-shell/components/page-header/page-header.module";
import { DgpListDetailsPageModule } from "../hamburger-shell/components/list-details-page/list-details-page.module";
import { SafePipe } from "./safe.pipe";

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        EffectsModule.forFeature([
            FileUploadEffects
        ]),
        DgpPageHeaderModule,
        DgpListDetailsPageModule
    ],
    declarations: [
        DragFileListenerDirective,
        FileManagerComponent,
        SafePipe
    ],
    exports: [
        DragFileListenerDirective,
        FileManagerComponent
    ],
    entryComponents: [
        FileManagerComponent
    ],
    providers: []
})
export class DgpFileUploadModule {
}
