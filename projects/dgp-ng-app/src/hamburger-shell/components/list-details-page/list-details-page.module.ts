import { NgModule } from "@angular/core";
import { ListDetailsPageComponent } from "./list-details-page.component";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { ListDetailsPageContentComponent } from "./list-details-page-content.component";

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule
    ],
    declarations: [
        ListDetailsPageContentComponent,
        ListDetailsPageComponent
    ],
    exports: [
        ListDetailsPageContentComponent,
        ListDetailsPageComponent
    ]
})
export class DgpListDetailsPageModule {
}
