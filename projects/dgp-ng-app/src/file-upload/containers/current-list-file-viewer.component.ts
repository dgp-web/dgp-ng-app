import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-current-list-file-viewer",
    template: `
        <dgp-file-manager-drawer-layout>
            <dgp-current-file-item-list dgp-file-manager-file-menu></dgp-current-file-item-list>
            <dgp-current-file-viewer></dgp-current-file-viewer>
        </dgp-file-manager-drawer-layout>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            overflow: auto;
        }
    `],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CurrentListFileViewerComponent {

}
