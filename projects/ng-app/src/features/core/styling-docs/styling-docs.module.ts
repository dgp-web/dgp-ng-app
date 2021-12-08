import { NgModule } from "@angular/core";
import { StylingDocsPageComponent } from "./containers";
import { RouterModule } from "@angular/router";
import { DocsPageModule } from "../../shared";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "styling",
            component: StylingDocsPageComponent
        }]),
        DocsPageModule
    ],
    declarations: [
        StylingDocsPageComponent
    ]
})
export class StylingDocsModule {
}
