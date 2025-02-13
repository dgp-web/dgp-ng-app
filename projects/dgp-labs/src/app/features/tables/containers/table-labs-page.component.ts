import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-table-labs-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle/>
            Editable table
        </dgp-page-header>
    `,
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
export class TableLabsPageComponent {

}
