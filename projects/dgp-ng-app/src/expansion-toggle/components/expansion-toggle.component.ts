import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpModelEditorComponentBase } from "../../utils/model-editor.component-base";

@Component({
    selector: "dgp-expansion-toggle",
    template: `
        <button mat-icon-button
                (click)="setModel(!model)">
            <mat-icon class="mat-icon--small">
                <ng-container *ngIf="model">expand_less</ng-container>
                <ng-container *ngIf="!model">expand_more</ng-container>
            </mat-icon>
        </button>
    `,
    styles: [`
        :host {
            display: flex;
            height: 48px;
            width: 48px;
            justify-content: center;
            align-items: center;
        }

        button {
            display: flex;
            height: 48px;
            width: 48px;
            line-height: 48px;
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
