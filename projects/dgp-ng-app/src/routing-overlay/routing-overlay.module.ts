import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { RoutingOverlayComponent } from "./components/routing-overlay.component";
import { RoutingOverlayEffects } from "./effects/routing-overlay.effects";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
    imports: [
        MatDialogModule,
        MatProgressBarModule,
        EffectsModule.forFeature([
            RoutingOverlayEffects
        ]),
        MatProgressBarModule
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
