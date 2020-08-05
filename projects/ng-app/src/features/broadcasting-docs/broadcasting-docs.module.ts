import { NgModule } from "@angular/core";
import { BroadcastingDocsPageComponent } from "./containers";
import { RouterModule } from "@angular/router";
import { DocsPageModule } from "../shared";
import * as dgp from "dgp-ng-app";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { BroadcastDocsEffects } from "./effects";
import { DgpSpacerModule } from "dgp-ng-app";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "broadcasting",
            component: BroadcastingDocsPageComponent
        }]),

        EffectsModule.forFeature([
            BroadcastDocsEffects
        ]),

        DocsPageModule,
        dgp.DgpEmptyStateModule,
        MatFormFieldModule,
        CommonModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        DgpSpacerModule
    ],
    declarations: [
        BroadcastingDocsPageComponent
    ]
})
export class BroadcastingDocsModule {
}
