import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-spacer",
    template: ``,
    styles: [`
        :host {
            flex-grow: 1;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpacerComponent {

}
