import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DocsPageModule } from "../shared";
import { HamburgerShellDocsPageComponent } from "./containers";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "hamburger-shell",
            component: HamburgerShellDocsPageComponent
        }]),
        DocsPageModule
    ],
    declarations: [
        HamburgerShellDocsPageComponent
    ]
})
export class HamburgerShellDocsModule {
}
