import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: `
        <dgp-hamburger-shell>

            <div dgp-hamburger-menu></div>

            <router-outlet></router-outlet>

        </dgp-hamburger-shell>
    `,
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    title = "content-block-editor-demo";
}
