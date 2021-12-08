import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ThemeSwitcherDocsPageComponent } from "./containers";
import { DocsPageModule } from "../../shared";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "theme-switcher",
            component: ThemeSwitcherDocsPageComponent
        }]),
        DocsPageModule
    ],
    declarations: [
        ThemeSwitcherDocsPageComponent
    ]
})
export class ThemeSwitcherDocsModule {
}
