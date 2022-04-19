import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "dgp-plot-container",
    template: `
        <ng-content></ng-content>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            width: auto;
            height: auto;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DgpPlotContainerComponent {

}
