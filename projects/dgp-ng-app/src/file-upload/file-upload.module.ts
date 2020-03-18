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
import { StoreModule } from "@ngrx/store";
import { fileUploadStoreFeature } from "./models";
import { fileUploadReducer, fileUploadReducerProvider } from "./store";
import { MatListModule } from "@angular/material/list";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { DgpSpacerModule } from "../spacer/spacer.module";

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        StoreModule.forFeature(fileUploadStoreFeature, fileUploadReducer),
        EffectsModule.forFeature([
            FileUploadEffects
        ]),
        DgpPageHeaderModule,
        DgpListDetailsPageModule,
        MatListModule,
        RouterModule,
        MatIconModule,
        DgpSpacerModule
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
    providers: [
        fileUploadReducerProvider
    ]
})
export class DgpFileUploadModule {
}
