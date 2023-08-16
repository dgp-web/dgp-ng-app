import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { AttributeMetadata } from "data-modeling";

@Component({
    selector: "dgp-inspector-section",
    template: `
        <h3 class="label-item"
            mat-subheader>
            <span class="label">
            {{ label || metadata?.label }}
            </span>
            <mat-icon style="margin-left: 8px;"
                      class="section-icon mat-icon--small">
                {{matIconName || metadata?.icon}}
            </mat-icon>
            <dgp-spacer></dgp-spacer>
            <ng-content select="[actions]"></ng-content>
            <dgp-expansion-toggle *ngIf="expandable"
                                  [model]="expanded"
                                  (modelChange)="updateExpanded($event)"></dgp-expansion-toggle>
        </h3>
        <ng-container *ngIf="expanded">
            <ng-content></ng-content>
        </ng-container>
    `,
    styles: [`
        .label-item {
            border-bottom-width: 1px;
            border-bottom-style: solid;
            border-bottom-color: gray;
        }

        h3[mat-subheader] {
            height: 32px;
            display: flex;
            align-items: center;
            font-size: smaller;
            margin: 0;
            padding-left: 12px;
        }

        dgp-expansion-toggle, .section-icon, .label {
            opacity: 0.7;
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
    metadata: AttributeMetadata<any>;

    @Output()
    readonly expandedChange = new EventEmitter<boolean>();

    updateExpanded(expanded: boolean) {
        this.expanded = expanded;

        this.expandedChange.emit(this.expanded);
    }
}
