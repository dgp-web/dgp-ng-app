import { NgModule } from "@angular/core";
import { ListDetailsPageComponent } from "./list-details-page.component";
import { CommonModule } from "@angular/common";
import { MatButtonModule, MatIconModule, MatSidenavModule } from "@angular/material";
import { ListDetailsPageContentComponent } from "./list-details-page-content.component";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatTooltipModule
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
