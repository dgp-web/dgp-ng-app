import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "dgp-blind-table",
    template: `
        <table class="test dgp-overflow-table-rows">
            <tr>
                <th>Position</th>
                <th>Label</th>
                <th>Description</th>
                <th>Additional information</th>
                <th>Still more details</th>
                <th>Still more and more and more and more details</th>
                <th>Still more and more and more and more details</th>
                <th>Still more and more and more and more details</th>
            </tr>

            <tr>
                <td>01</td>
                <td>Label of the first item</td>
                <td>This table demonstrates breaks</td>
                <td>Let's see how this works</td>
                <td>There is still a lot more to try out</td>
                <td>There is still a lot more to try out. Yeah yeah yeah yeah yeah yeah yeah yeah yeah.</td>
                <td>There is still a lot more to try out</td>
                <td>There is still a lot more to try out</td>
            </tr>

        </table>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
        }

       /* th {
            min-width: 160px;
        }

        td {
          min-width: 160px;
        }*/
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlindTableComponent {
}
