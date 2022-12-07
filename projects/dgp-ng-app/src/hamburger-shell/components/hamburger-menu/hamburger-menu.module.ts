import { NgModule } from "@angular/core";
import { HamburgerMenuComponent } from "./hamburger-menu.component";
import { HamburgerMenuHeaderComponent } from "./hamburger-menu-header.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HamburgerMenuEntriesComponent } from "./hamburger-menu-entries.component";
import { HamburgerMenuEntryComponent } from "./hamburger-menu-entry.component";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { MatListModule } from "@angular/material/list";

@NgModule({
    imports: [
        MatToolbarModule,
        MatListModule,
        RouterModule,
        MatIconModule,
        CommonModule
    ],
    declarations: [
        HamburgerMenuComponent,
        HamburgerMenuHeaderComponent,
        HamburgerMenuEntriesComponent,
        HamburgerMenuEntryComponent
    ],
    exports: [
        HamburgerMenuComponent,
        HamburgerMenuHeaderComponent,
        HamburgerMenuEntriesComponent,
        HamburgerMenuEntryComponent
    ]
})
export class DgpHamburgerMenuModule {
}
