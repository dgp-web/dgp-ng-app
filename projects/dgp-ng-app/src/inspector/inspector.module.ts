import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { DgpSpacerModule } from "../spacer/spacer.module";
import { InspectorItemComponent } from "./components/inspector-item.component";
import { InspectorSectionComponent } from "./components/inspector-section.component";
import { InspectorComponent } from "./components/inspector.component";
import { DgpExpansionToggleModule } from "../expansion-toggle/expansion-toggle.module";

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
        DgpExpansionToggleModule
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
