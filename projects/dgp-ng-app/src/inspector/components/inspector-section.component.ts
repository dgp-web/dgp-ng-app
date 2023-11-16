import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { AttributeMetadata } from "data-modeling";
import { ExpansionTogglePosition } from "../../details/models";

@Component({
    selector: "dgp-inspector-section",
    template: `
        <dgp-details [expandable]="expandable"
                     [expanded]="expanded"
                     (expandedChange)="updateExpanded($event)"
                     togglePosition="end"
                     [indent]="indent">

            <ng-container summary>
                  <span class="label">
                    {{ label || metadata?.label }}
                    </span>
                <mat-icon style="margin-left: 8px;"
                          class="section-icon mat-icon--small">
                    {{matIconName || metadata?.icon}}
                </mat-icon>
                <dgp-spacer></dgp-spacer>
                <ng-content select="[actions]"></ng-content>
            </ng-container>

            <ng-content></ng-content>
        </dgp-details>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
        }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectorSectionComponent {

    @Input()
    matIconName: string;

    @Input()
    label: string;

    @Input()
    expanded = true;

    @Input()
    expandable = true;

    @Input()
    togglePosition: ExpansionTogglePosition = "start";

    @Input()
    metadata: AttributeMetadata<any>;

    @Input()
    indent = false;

    @Output()
    readonly expandedChange = new EventEmitter<boolean>();

    updateExpanded(expanded: boolean) {
        if (expanded === this.expanded) return;

        this.expanded = expanded;
        this.expandedChange.emit(this.expanded);
    }

}
