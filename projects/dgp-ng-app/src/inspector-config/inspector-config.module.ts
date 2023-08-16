import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { DgpInspectorModule } from "../inspector/inspector.module";
import { AsyncPipe, NgIf } from "@angular/common";
import { MatLegacySlideToggleModule as MatSlideToggleModule } from "@angular/material/legacy-slide-toggle";
import { FormsModule } from "@angular/forms";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatLegacySelectModule as MatSelectModule } from "@angular/material/legacy-select";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { containers } from "./containers/containers";
import { MatLegacySliderModule as MatSliderModule } from "@angular/material/legacy-slider";
import { DgpSpacerModule } from "../spacer/spacer.module";

@NgModule({
    imports: [
        DgpInspectorModule,
        NgIf,
        MatSlideToggleModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        AsyncPipe,
        MatInputModule,
        MatSliderModule,
        DgpSpacerModule
    ],
    declarations: [
        ...components,
        ...containers
    ],
    exports: [
        ...components,
        ...containers
    ]
})
export class DgpInspectorConfigModule {
}
