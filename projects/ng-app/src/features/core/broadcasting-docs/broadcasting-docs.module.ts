import { NgModule } from "@angular/core";
import { BroadcastingDocsPageComponent } from "./containers";
import { RouterModule } from "@angular/router";
import { DocsPageModule } from "../../shared";
import * as dgp from "dgp-ng-app";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
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
