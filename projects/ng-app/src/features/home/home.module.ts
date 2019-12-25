import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DocsPageModule } from "../shared";
import { HomePageComponent } from "./containers";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { MatRippleModule } from "@angular/material/core";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "home",
            component: HomePageComponent
        }]),

        DocsPageModule,
        MatIconModule,
        MatDividerModule,
        MatCardModule,
        MatRippleModule
    ],
    declarations: [
        HomePageComponent
    ]
})
export class HomeModule {
}
