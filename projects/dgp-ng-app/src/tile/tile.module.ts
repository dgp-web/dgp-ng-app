import { NgModule } from "@angular/core";
import { TileComponent } from "./tile.component";
import { RouterModule } from "@angular/router";
import { MatLegacyCardModule as MatCardModule } from "@angular/material/legacy-card";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { CommonModule } from "@angular/common";

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
