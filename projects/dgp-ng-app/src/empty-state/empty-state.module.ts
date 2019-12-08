import { NgModule } from "@angular/core";
import * as mat from "@angular/material";
import * as components from "./components";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule,

        mat.MatIconModule
    ],
    declarations: [
        components.EmptyStateComponent,
        components.EmptyStateContentComponent,
        components.EmptyStateIconComponent,
        components.EmptyStateTitleComponent
    ],
    exports: [
        components.EmptyStateComponent
    ]
})
export class DgpEmptyStateModule {
}
