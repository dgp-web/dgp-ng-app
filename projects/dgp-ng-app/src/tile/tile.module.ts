import { NgModule } from "@angular/core";
import { TileComponent } from "./tile.component";
import { RouterModule } from "@angular/router";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";

@NgModule({
    imports: [
        RouterModule,
        MatCardModule,
        MatRippleModule,
        MatIconModule,
        MatDividerModule,
        CommonModule
    ],
    declarations: [
        TileComponent
    ],
    exports: [
        TileComponent
    ]
})
export class DgpTileModule {
}
