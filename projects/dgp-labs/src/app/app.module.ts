import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DgpSplitPanelModule, DgpDockingLayoutModule } from "dgp-ng-docking-layout";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        DgpDockingLayoutModule,
        DgpSplitPanelModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
