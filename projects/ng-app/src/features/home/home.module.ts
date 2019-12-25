import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DocsPageModule } from "../shared";
import { HomePageComponent } from "./containers";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "home",
            component: HomePageComponent
        }]),

        DocsPageModule
    ],
    declarations: [
        HomePageComponent
    ]
})
export class HomeModule {
}
