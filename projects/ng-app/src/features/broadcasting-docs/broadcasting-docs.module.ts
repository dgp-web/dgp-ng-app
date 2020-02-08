import { NgModule } from "@angular/core";
import { BroadcastingDocsPageComponent } from "./containers";
import { RouterModule } from "@angular/router";
import { DocsPageModule } from "../shared";
import * as dgp from "dgp-ng-app";
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from "@angular/material";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "broadcasting",
            component: BroadcastingDocsPageComponent
        }]),

        DocsPageModule,
        dgp.DgpEmptyStateModule,
        MatFormFieldModule,
        CommonModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        FormsModule
    ],
    declarations: [
        BroadcastingDocsPageComponent
    ]
})
export class BroadcastingDocsModule {
}
