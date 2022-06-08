import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { BlindTextComponent } from "./blind-text.component";
import { DgpPagedMediaA4Module } from "../../../dgp-ng-paged-media/src/lib/A4/paged-media-a4.module";
import { DgpBoxPlotModule, DgpConnectedScatterPlotModule } from "dgp-ng-charts";

@NgModule({
    declarations: [
        AppComponent,
        BlindTextComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([]),
        DgpPagedMediaA4Module,
        DgpBoxPlotModule,
        DgpConnectedScatterPlotModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
