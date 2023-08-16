import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { RoutingOverlayComponent } from "./components/routing-overlay.component";
import { RoutingOverlayEffects } from "./effects";
import { MatLegacyProgressBarModule as MatProgressBarModule } from "@angular/material/legacy-progress-bar";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from "@angular/material/legacy-progress-spinner";

@NgModule({
    imports: [
        MatDialogModule,
        MatProgressBarModule,
        EffectsModule.forFeature([
            RoutingOverlayEffects
        ]),
        MatProgressSpinnerModule
    ],
    declarations: [
        RoutingOverlayComponent
    ]
})
export class DgpRoutingOverlayModule {
}
