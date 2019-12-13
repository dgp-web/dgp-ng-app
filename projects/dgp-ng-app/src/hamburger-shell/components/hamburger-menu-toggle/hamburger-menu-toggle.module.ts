import {NgModule} from "@angular/core";
import {HamburgerMenuToggleComponent} from "./hamburger-menu-toggle.component";
import {CommonModule} from "@angular/common";
import {MatButtonModule, MatIconModule} from "@angular/material";

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule
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
