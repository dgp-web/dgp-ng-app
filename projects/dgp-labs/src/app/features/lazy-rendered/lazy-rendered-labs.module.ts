import { NgModule } from "@angular/core";
import { containers } from "./containers/containers";
import { RouterModule } from "@angular/router";
import { LazyRenderedLabsPageComponent } from "./containers/lazy-rendered-labs-page.component";
import { DgpHamburgerMenuToggleModule, DgpPageHeaderModule, DgpLazyRenderedModule, DgpEmptyStateModule } from "dgp-ng-app";

@NgModule({
    imports: [
        RouterModule.forRoot([{
            path: "lazy-rendered",
            component: LazyRenderedLabsPageComponent
        }]),
        DgpHamburgerMenuToggleModule,
        DgpPageHeaderModule,
        DgpLazyRenderedModule,
        DgpEmptyStateModule
    ],
    declarations: [
        ...containers
    ],
    exports: [
        ...containers
    ]
})
export class LazyRenderedLabsModule {
}
