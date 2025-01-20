import { NgModule } from "@angular/core";
import { containers } from "./containers/containers";
import { DgpDetailsModule, DgpHamburgerMenuToggleModule, DgpPageHeaderModule } from "dgp-ng-app";
import { DocsModule } from "dgp-ng-docs";

@NgModule({
    imports: [
        DgpHamburgerMenuToggleModule,
        DgpPageHeaderModule,
        DocsModule,
        DgpDetailsModule
    ],
    declarations: [
        ...containers
    ],
    exports: [
        ...containers
    ],
    providers: []
})
export class DetailsDocsCoreModule {
}
