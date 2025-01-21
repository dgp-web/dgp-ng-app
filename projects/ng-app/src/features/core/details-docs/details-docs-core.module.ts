import { NgModule } from "@angular/core";
import { containers } from "./containers/containers";
import { DgpDetailsModule, DgpHamburgerMenuToggleModule, DgpPageHeaderModule, SafePipeModule } from "dgp-ng-app";
import { DocsModule } from "dgp-ng-docs";
import { MatTabsModule } from "@angular/material/tabs";
import { components } from "./components/components";
import { NgForOf, NgIf } from "@angular/common";

@NgModule({
    imports: [
        DgpHamburgerMenuToggleModule,
        DgpPageHeaderModule,
        DocsModule,
        DgpDetailsModule,
        MatTabsModule,
        SafePipeModule,
        NgForOf,
        NgIf
    ],
    declarations: [
        ...components,
        ...containers
    ],
    exports: [
        ...components,
        ...containers
    ],
    providers: []
})
export class DetailsDocsCoreModule {
}
