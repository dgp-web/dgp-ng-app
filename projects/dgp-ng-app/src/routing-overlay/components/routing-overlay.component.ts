import { Component } from "@angular/core";

@Component({
    selector: "dgp-routing-overlay",
    template: `
        <mat-progress-spinner mode='indeterminate'
                              diameter='48'
                              color="accent"
                              strokeWidth="3"></mat-progress-spinner>
    `,
    styles: [`
        :host {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-grow: 1;
            height: 100%;
        }

        mat-progress-spinner {
            opacity: 0.67;
        }
    `]
})
export class RoutingOverlayComponent {
}
