import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { containers } from "./containers/containers";
import { DgpHamburgerMenuToggleModule, DgpPageHeaderModule, DgpSpacerModule } from "dgp-ng-app";
import { DocsModule } from "dgp-ng-docs";
import { PdfExportLabsComponent } from "./containers/pdf-export-labs.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "data-export/pdf",
            component: PdfExportLabsComponent
        }]),
        DgpPageHeaderModule,
        DgpHamburgerMenuToggleModule,
        DocsModule,
        DgpSpacerModule,
        MatButtonModule,
        MatIconModule
    ],
    declarations: [
        ...containers
    ],
    exports: [
        ...containers
    ]
})
export class DgpDataExportLabsModule {
}
