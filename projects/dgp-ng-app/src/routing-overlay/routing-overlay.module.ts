import { NgModule } from "@angular/core";
import * as mat from "@angular/material";
import { EffectsModule } from "@ngrx/effects";
import { RoutingOverlayComponent } from "./components/routing-overlay.component";
import { RoutingOverlayEffects } from "./effects/routing-overlay.effects";

@NgModule({
    imports: [
        mat.MatDialogModule,
        mat.MatProgressBarModule,
        EffectsModule.forFeature([
            RoutingOverlayEffects
        ])
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
