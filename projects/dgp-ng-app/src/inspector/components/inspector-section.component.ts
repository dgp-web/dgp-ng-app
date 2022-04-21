import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
    selector: "dgp-inspector-section",
    template: `
        <h3 class="label-item"
            mat-subheader>
            {{ label }}
            <mat-icon style="margin-left: 8px;"
                      class="mat-icon--small">{{matIconName}}</mat-icon>
            <dgp-spacer></dgp-spacer>
            <ng-content select="[actions]"></ng-content>
            <dgp-expansion-toggle></dgp-expansion-toggle>
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
