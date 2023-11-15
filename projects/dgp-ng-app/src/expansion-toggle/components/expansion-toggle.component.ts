import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpModelEditorComponentBase } from "../../utils/model-editor.component-base";

@Component({
    selector: "dgp-expansion-toggle",
    template: `
        <button mat-icon-button
                (click)="setModel(!model)">
            <mat-icon>
                <ng-container *ngIf="model">expand_more</ng-container>
                <ng-container *ngIf="!model">navigate_next</ng-container>
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DgpExpansionToggleComponent extends DgpModelEditorComponentBase<boolean> {

}
