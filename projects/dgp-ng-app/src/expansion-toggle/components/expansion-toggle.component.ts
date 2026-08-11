import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpModelEditorComponentBase } from "../../utils/model-editor.component-base";

@Component({
    selector: "dgp-expansion-toggle",
    template: `
        <button mat-icon-button
          (click)="setModel(!model)">
          <mat-icon>
            @if (model) {
              expand_more
            }
            @if (!model) {
              navigate_next
            }
          </mat-icon>
        </button>
        `,
    styles: [`
        :host {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        mat-icon {
            line-height: initial !important;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DgpExpansionToggleComponent extends DgpModelEditorComponentBase<boolean> {

}
