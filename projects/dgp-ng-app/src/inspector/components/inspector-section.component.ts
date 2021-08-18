import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
    selector: "dgp-inspector-section",
    template: `
        <h3 class="label-item"
            mat-subheader>
            {{ label }}
            <dgp-spacer></dgp-spacer>
            <mat-icon>{{matIconName}}</mat-icon>
        </h3>
        <ng-content></ng-content>
    `,
    styles: [`
        .label-item {
            border-bottom-width: 1px;
            border-bottom-style: solid;
            border-bottom-color: gray;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectorSectionComponent {

    @Input()
    matIconName: string;

    @Input()
    label: string;

}
