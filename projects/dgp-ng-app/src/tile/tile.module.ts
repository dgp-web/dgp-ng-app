import { NgModule } from "@angular/core";
import { TileComponent } from "./tile.component";
import { RouterModule } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";

@NgModule({
    imports: [
        RouterModule,
        MatCardModule,
        MatRippleModule,
        MatIconModule,
        MatDividerModule
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
