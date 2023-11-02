import { Component } from "@angular/core";

@Component({
    selector: "dgp-current-list-file-viewer",
    template: `
        <dgp-list-details-page>
            <dgp-current-file-item-list dgp-list-details-page-menu></dgp-current-file-item-list>
            <dgp-current-file-viewer></dgp-current-file-viewer>
        </dgp-list-details-page>
    `
})
export class CurrentListFileViewerComponent {
}
