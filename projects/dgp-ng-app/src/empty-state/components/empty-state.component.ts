import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
    selector: "dgp-empty-state",
    template: `
        <dgp-empty-state-icon *ngIf="matIconName">
            {{ matIconName }}
        </dgp-empty-state-icon>
        <dgp-empty-state-title>
            {{ title }}
        </dgp-empty-state-title>

        <dgp-empty-state-content>
            <ng-content></ng-content>
        </dgp-empty-state-content>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            max-height: 640px;
            height: 100%;
            justify-content: center;
            align-items: center;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class EmptyStateComponent {

    @Input()
    matIconName: string;

    @Input()
    title: string;

}
