import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-empty-state-icon",
    template: `
        <mat-icon class="icon">
            <ng-content></ng-content>
        </mat-icon>
    `,
    styles: [`
        :host {
            margin-left: 16px;
            margin-right: 16px;
            display: inline-flex;
        }

        .icon {
            color: gray;
            font-size: 64px;
            width: 64px;
            height: 64px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateIconComponent {
}
