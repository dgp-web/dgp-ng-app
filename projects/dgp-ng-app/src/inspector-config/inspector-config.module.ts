import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { DgpInspectorModule } from "../inspector/inspector.module";
import { AsyncPipe, NgIf } from "@angular/common";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { containers } from "./containers/containers";
import { MatSliderModule } from "@angular/material/slider";
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
