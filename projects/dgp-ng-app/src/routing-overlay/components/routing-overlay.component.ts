import { Component } from "@angular/core";

@Component({
    selector: "dgp-routing-overlay",
    template: "<mat-progress-bar mode='indeterminate' style='height: 16px;'></mat-progress-bar>",
    styles: [`
        :host {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-grow: 1;
            height: 100%;
        }
    `]
})
export class RoutingOverlayComponent {
}
