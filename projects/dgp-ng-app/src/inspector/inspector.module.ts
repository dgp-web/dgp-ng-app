import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { DgpSpacerModule } from "../spacer/spacer.module";
import { InspectorItemComponent } from "./components/inspector-item.component";
import { InspectorSectionComponent } from "./components/inspector-section.component";
import { InspectorComponent } from "./components/inspector.component";
import { DgpExpansionToggleModule } from "../expansion-toggle/expansion-toggle.module";
import { MatListModule } from "@angular/material/list";
import { MatTooltipModule } from "@angular/material/tooltip";
import { DgpNegatePipeModule } from "../negate/negate-pipe.module";

const components = [
    InspectorComponent,
    InspectorItemComponent,
    InspectorSectionComponent
];

@NgModule({
    imports: [
        CommonModule,
        MatListModule,
        DgpSpacerModule,
        MatIconModule,
        DgpExpansionToggleModule,
        MatTooltipModule,
        DgpNegatePipeModule
    ],
    declarations: [
        ...components
    ],
    exports: [
        ...components
    ]
})
export class DgpInspectorModule {
}
