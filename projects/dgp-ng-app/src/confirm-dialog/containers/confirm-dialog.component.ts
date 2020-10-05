import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ThemePalette } from "@angular/material/core";

export interface RemovalDialogButtonConfig {
    readonly label: string;
    readonly matIconName: string;
    readonly color?: ThemePalette;
    readonly returnValue: boolean | null;
}

export const cancelButtonConfig: RemovalDialogButtonConfig = {
    label: "Cancel",
    returnValue: null,
    matIconName: "close"
};

export const confirmButtonConfig: RemovalDialogButtonConfig = {
    label: "Confirm",
    returnValue: true,
    matIconName: "delete",
    color: "primary"
};

@Component({
    selector: "dgp-confirm-dialog",
    template: `
        <h2 mat-dialog-title>
            {{ title }}
        </h2>

        <mat-dialog-content>
            <ng-content></ng-content>
        </mat-dialog-content>

        <button [mat-dialog-close]="cancelButtonConfig.returnValue"
                [color]="cancelButtonConfig.color"
                mat-raised-button>
            <mat-icon>{{cancelButtonConfig.matIconName}}</mat-icon>
            {{ cancelButtonConfig.label }}
        </button>

        <button [mat-dialog-close]="confirmButtonConfig.returnValue"
                mat-raised-button
                [color]="confirmButtonConfig.color">
            <mat-icon>{{confirmButtonConfig.matIconName}}</mat-icon>
            {{confirmButtonConfig.label}}
        </button>
    `,
    styles: [`
        :host {
            display: block;
            width: 360px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DgpConfirmDialogComponent {

    @Input()
    title: string;

    @Input()
    confirmButtonConfig = confirmButtonConfig;

    @Input()
    cancelButtonConfig = cancelButtonConfig;

}
