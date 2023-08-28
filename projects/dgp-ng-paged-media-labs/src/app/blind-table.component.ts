import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "dgp-blind-table",
    template: `
        <table class="test">
            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>
            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>
            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>
            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>
            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>
            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>
            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>
            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>
            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>
            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>
            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>
            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>
            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>
            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>
            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>
            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>
            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>
            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>
            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>
            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>
            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>
            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>
            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>
            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>
            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>
            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>

            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>

            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>

            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>

            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>

            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>

            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
            </tr>

            <tr>
                <td>Column 01</td>
                <td>Column 02</td>
                <td>Column 03</td>
                <td>Column 04</td>
                <td>Column 05</td>
                <td>Column 07</td>
                <td>Column 08</td>
                <td>Column 09</td>
                <td>Column 10</td>
                <td>Column 11</td>
                <td>Column 12</td>
                <td>Column 13</td>
                <td>Column 14</td>
                <td>Column 15</td>
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
