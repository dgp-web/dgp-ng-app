import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "dgp-heatmap-labs",
    template: ``,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            height: 100%;
            overflow: auto;
        }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeatmapLabsComponent {

}
