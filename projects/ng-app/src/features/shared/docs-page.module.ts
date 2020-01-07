import { NgModule } from "@angular/core";
import * as dgp from "dgp-ng-app";
import { DocsModule } from "../../ui/docs";

@NgModule({
    imports: [
        dgp.DgpPageHeaderModule,
        dgp.DgpHamburgerMenuToggleModule,
        DocsModule
    ],
    exports: [
        dgp.DgpPageHeaderModule,
        dgp.DgpHamburgerMenuToggleModule,
        DocsModule
    ]
})
export class DocsPageModule {}
