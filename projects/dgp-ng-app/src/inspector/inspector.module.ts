import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { DgpSpacerModule } from "../spacer/spacer.module";
import { InspectorItemComponent } from "./components/inspector-item.component";
import { InspectorSectionComponent } from "./components/inspector-section.component";
import { InspectorComponent } from "./components/inspector.component";
import { DgpExpansionToggleModule } from "../expansion-toggle/expansion-toggle.module";
import { MatLegacyListModule as MatListModule } from "@angular/material/legacy-list";
import { MatLegacyTooltipModule as MatTooltipModule } from "@angular/material/legacy-tooltip";
import { DgpNegatePipeModule } from "../negate/negate-pipe.module";
import { InspectorConfig } from "./models";
import { provideDefaultInspectorConfig } from "./functions";

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

    static forRoot(payload: Partial<InspectorConfig>): ModuleWithProviders<DgpInspectorModule> {
        return {
            ngModule: DgpInspectorModule,
            providers: [
                provideDefaultInspectorConfig(payload)
            ]
        };
    }

}
