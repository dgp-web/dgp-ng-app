import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { RoutingOverlayComponent } from "./components/routing-overlay.component";
import { RoutingOverlayEffects } from "./effects";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

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
    ],
    entryComponents: [
        RoutingOverlayComponent
    ]
})
export class DgpRoutingOverlayModule {
}
