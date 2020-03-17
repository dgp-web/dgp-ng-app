import { ChangeDetectionStrategy, Component,  } from "@angular/core";

@Component({
    selector: "dgp-file-manager",
    template: `

    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-grow: 1;
            width: 100%;
            height: 100%;
        }
   `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileManagerComponent {

}
