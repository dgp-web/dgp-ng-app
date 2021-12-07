import { NgModule } from "@angular/core";
import { LogDocsPageComponent } from "./containers";
import { RouterModule } from "@angular/router";
import { DocsPageModule } from "../../shared";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "log",
            component: LogDocsPageComponent
        }]),
        DocsPageModule
    ],
    declarations: [
        LogDocsPageComponent
    ]
})
export class LogDocsModule {
}
