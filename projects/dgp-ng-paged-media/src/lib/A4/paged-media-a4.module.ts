import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SafePipeModule } from "dgp-ng-app";
import { DgpPagedMediaContentViewComponent } from "./components/paged-media-content-view.component";
import { DgpPagedMediaContentComponent } from "./components/paged-media-content.component";
import { DgpPagedMediaFooterComponent } from "./components/paged-media-footer.component";
import { DgpPagedMediaHeaderComponent } from "./components/paged-media-header.component";
import { DgpPagedMediaPageA4Component } from "./components/paged-media-page-a4.component";
import { DgpPagedMediaSectionA4Component } from "./components/paged-media-section-a4.component";


@NgModule({
    imports: [
        CommonModule,
        SafePipeModule
    ],
    declarations: [
        DgpPagedMediaContentViewComponent,
        DgpPagedMediaContentComponent,
        DgpPagedMediaFooterComponent,
        DgpPagedMediaHeaderComponent,
        DgpPagedMediaPageA4Component,
        DgpPagedMediaSectionA4Component
    ],
    exports: [
        DgpPagedMediaContentViewComponent,
        DgpPagedMediaContentComponent,
        DgpPagedMediaFooterComponent,
        DgpPagedMediaHeaderComponent,
        DgpPagedMediaPageA4Component,
        DgpPagedMediaSectionA4Component
    ]
})
export class DgpPagedMediaA4Module {
}
