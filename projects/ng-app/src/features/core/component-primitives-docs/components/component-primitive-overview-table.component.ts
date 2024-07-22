import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-component-primitive-overview-table",
    template: `
        <table>
            <tr>
                <th></th>
                <th>Has model Input</th>
                <th>Has disabled Input</th>
                <th>Has modelChange Output</th>
                <th>Uses Store</th>
            </tr>
            <tr>
                <th>View</th>
                <td>x</td>
                <td>x</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <th>Model editor</th>
                <td>x</td>
                <td>x</td>
                <td>x</td>
                <td></td>
            </tr>
            <tr>
                <th>Container</th>
                <td></td>
                <td></td>
                <td></td>
                <td>x</td>
            </tr>
            <tr>
                <th>Hybrid</th>
                <td>x</td>
                <td>x</td>
                <td>x</td>
                <td>x</td>
            </tr>
        </table>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
        }

        table {
            border-collapse: collapse;
            width: 100%;
        }

        td, th {
            border: 1px solid gray;
        }

        th {
            text-align: left;
        }

        td {
            text-align: center;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentPrimitiveOverviewTableComponent {

}
