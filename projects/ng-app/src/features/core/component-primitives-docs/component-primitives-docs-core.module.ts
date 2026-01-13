import { NgModule } from "@angular/core";
import { containers } from "./containers/containers";
import { DgpHamburgerMenuToggleModule, DgpPageHeaderModule, DgpSpacerModule } from "dgp-ng-app";
import { MatButtonModule } from "@angular/material/button";
import { DocsModule } from "dgp-ng-docs";
import { components } from "./components/components";

@NgModule({
    imports: [
        DgpHamburgerMenuToggleModule,
        DgpPageHeaderModule,
        DgpSpacerModule,
        MatButtonModule,
        DocsModule
    ],
    declarations: [
        ...components,
        ...containers
    ],
    exports: [
        ...components,
        ...containers
    ]
})
export class ComponentPrimitivesDocsCoreModule {
}
