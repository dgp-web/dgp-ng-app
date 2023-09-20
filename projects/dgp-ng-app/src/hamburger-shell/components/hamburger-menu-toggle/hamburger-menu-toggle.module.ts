import {NgModule} from "@angular/core";
import {HamburgerMenuToggleComponent} from "./hamburger-menu-toggle.component";
import {CommonModule} from "@angular/common";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatIconModule } from "@angular/material/icon";
import { DgpShortcutModule } from "../../../shortcuts/shortcuts.module";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        DgpShortcutModule,
        MatTooltipModule
    ],
    declarations: [
        HamburgerMenuToggleComponent
    ],
    exports: [
        HamburgerMenuToggleComponent
    ]
})
export class DgpHamburgerMenuToggleModule {
}
