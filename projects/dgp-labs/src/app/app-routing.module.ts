import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [{
    path: "",
    pathMatch: "full",
    redirectTo: "/docking-layout"
}, {
    path: "**",
    redirectTo: "/docking-layout"
}];

@NgModule({
  imports: [RouterModule.forRoot([{
      path: "",
      pathMatch: "full",
      redirectTo: "/docking-layout"
  }, {
      path: "**",
      redirectTo: "/docking-layout"
  }])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
