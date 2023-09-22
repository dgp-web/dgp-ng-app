import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "dgp-blind-table",
    template: `
        <table class="test">
            <tr>
                <th>Column 01</th>
                <th>Column 02</th>
                <th>Column 03</th>
                <th>Column 04</th>
                <th>Column 05</th>
                <th>Column 07</th>
                <th>Column 08</th>
                <th>Column 09</th>
                <th>Column 10</th>
                <th>Column 11</th>
                <th>Column 12</th>
                <th>Column 13</th>
                <th>Column 14</th>
                <th>Column 15</th>
            </tr>
            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>
            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>
            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>
            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>
            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>
            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>
            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>
            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>
            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>
            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>
            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>
            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>
            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>
            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>
            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>
            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>
            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>
            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>
            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>
            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>
            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>
            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>
            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>
            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>
            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>

            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>

            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>

            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>

            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>

            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>

            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>

            <tr>
                <td>Value 01</td>
                <td>Value 02</td>
                <td>Value 03</td>
                <td>Value 04</td>
                <td>Value 05</td>
                <td>Value 07</td>
                <td>Value 08</td>
                <td>Value 09</td>
                <td>Value 10</td>
                <td>Value 11</td>
                <td>Value 12</td>
                <td>Value 13</td>
                <td>Value 14</td>
                <td>Value 15</td>
            </tr>

        </table>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlindTableComponent {
}
