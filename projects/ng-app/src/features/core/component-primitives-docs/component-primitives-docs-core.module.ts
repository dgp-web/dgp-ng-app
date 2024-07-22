import { NgModule } from "@angular/core";
import { containers } from "./containers/containers";
import { DgpHamburgerMenuToggleModule, DgpPageHeaderModule, DgpSpacerModule } from "dgp-ng-app";
import { MatLegacyButtonModule } from "@angular/material/legacy-button";
import { DocsModule } from "dgp-ng-docs";
import { components } from "./components/components";

@NgModule({
    imports: [
        DgpHamburgerMenuToggleModule,
        DgpPageHeaderModule,
        DgpSpacerModule,
        MatLegacyButtonModule,
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
