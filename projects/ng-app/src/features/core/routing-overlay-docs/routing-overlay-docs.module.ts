import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import * as containers from "./containers";
import { DocsPageModule } from "../../shared";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { DgpEmptyStateModule } from "dgp-ng-app";
import { RoutingOverlayResolver } from "./resolver";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "routing-overlay",
            component: containers.RoutingOverlayDocsPageComponent
        }, {
            path: "routing-overlay/route01",
            component: containers.RoutingOverlayDocsPageComponent,
            resolve: {
                waitForTwoSeconds: RoutingOverlayResolver
            }
        }, {
            path: "routing-overlay/route02",
            component: containers.RoutingOverlayDocsPageComponent,
            resolve: {
                waitForTwoSeconds: RoutingOverlayResolver
            }
        }]),

        DocsPageModule,
        CommonModule,
        MatButtonModule,
        MatIconModule,
        DgpEmptyStateModule,
        MatListModule
    ],
    declarations: [
        containers.RoutingOverlayDocsPageComponent
    ]
})
export class RoutingOverlayDocsModule {
}
