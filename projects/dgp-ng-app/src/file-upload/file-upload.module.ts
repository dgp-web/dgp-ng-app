import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DragFileListenerDirective } from "./directive/drag-file-listener.directive";
import { EffectsModule } from "@ngrx/effects";
import { FileUploadEffects } from "./effects";
import { FileManagerComponent } from "./containers/file-manager.component";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        EffectsModule.forFeature([
            FileUploadEffects
        ])
    ],
    declarations: [
        DragFileListenerDirective,
        FileManagerComponent
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
