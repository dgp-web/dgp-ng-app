import {NgModule} from "@angular/core";
import {ListDetailsPageComponent} from "./list-details-page.component";
import {CommonModule} from "@angular/common";
import {MatButtonModule, MatIconModule, MatSidenavModule} from "@angular/material";
import {ListDetailsPageContentComponent} from "./content";

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
