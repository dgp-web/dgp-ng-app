import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmptyStateComponent } from "./components/empty-state.component";
import { EmptyStateContentComponent } from "./components/empty-state-content.component";
import { EmptyStateIconComponent } from "./components/empty-state-icon.component";
import { EmptyStateTitleComponent } from "./components/empty-state-title.component";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
    imports: [
        CommonModule,
        MatIconModule
    ],
    declarations: [
        EmptyStateComponent,
        EmptyStateContentComponent,
        EmptyStateIconComponent,
        EmptyStateTitleComponent
    ],
    exports: [
        EmptyStateComponent
    ]
})
export class DgpEmptyStateModule {
}
