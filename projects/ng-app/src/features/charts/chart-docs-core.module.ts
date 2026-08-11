import { NgModule } from "@angular/core";
import { DocsPageModule } from "../shared";
import { MatError, MatFormField, MatHint, MatInput } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { IntegerOnlyDirective } from "../shared/integer-only.directive";
import { JsonPipe, NgIf } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { MatTooltip } from "@angular/material/tooltip";
import { components } from "./components/components";
import { DgpDetailsModule, DgpHamburgerMenuToggleModule, DgpInspectorModule, DgpPageHeaderModule, DgpInputFieldModule } from "dgp-ng-app";
import { DgpHeatmapModule } from "dgp-ng-charts";

@NgModule({
    imports: [
        DgpPageHeaderModule,
        DgpHamburgerMenuToggleModule,
        DocsPageModule,
        DgpHeatmapModule,
        DgpDetailsModule,
        MatFormField,
        MatInput,
        FormsModule,
        DgpInspectorModule,
        MatRadioGroup,
        MatRadioButton,
        IntegerOnlyDirective,
        MatError,
        NgIf,
        JsonPipe,
        MatIcon,
        MatTooltip,
        MatHint,
        DgpInputFieldModule
    ],
    declarations: [
        ...components
    ],
    exports: [...components]
})
export class ChartDocsCoreModule {

}
