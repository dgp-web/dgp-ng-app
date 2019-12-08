import { NgModule } from "@angular/core";
import * as mat from "@angular/material";
import { EffectsModule } from "@ngrx/effects";
import * as components from "./components";
import * as effects from "./effects";

@NgModule({
    imports: [
        mat.MatDialogModule,
        mat.MatProgressBarModule,
        EffectsModule.forFeature([
            effects.RoutingOverlayEffects
        ])
    ],
    declarations: [
        components.RoutingOverlayComponent
    ],
    entryComponents: [
        components.RoutingOverlayComponent
    ]
})
export class DgpRoutingOverlayModule {
}
