import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { AttributeMetadata } from "data-modeling";
import { observeAttribute$ } from "../../utils/observe-input";

// TODO: old theme back and as default
// TODO: allow overriding with plain theme

@Component({
    selector: "dgp-inspector-section",
    template: `
        <details #details
                 (toggle)="onToggle($event)">
            <summary (click)="$event.preventDefault()"
                     tabindex="-1">
                <div class="summary-content">
                    <span class="label">
                    {{ label || metadata?.label }}
                    </span>
                    <mat-icon style="margin-left: 8px;"
                              class="section-icon mat-icon--small">
                        {{matIconName || metadata?.icon}}
                    </mat-icon>
                    <dgp-spacer></dgp-spacer>
                    <ng-content select="[actions]"></ng-content>
                </div>
                <dgp-expansion-toggle *ngIf="expandable"
                                      [model]="expanded"
                                      (modelChange)="updateExpanded($event)"></dgp-expansion-toggle>
            </summary>
            <ng-content></ng-content>
        </details>


        <!--  <h3 class="label-item"
              mat-subheader>
              <span class="label">
              {{ label || metadata?.label }}
              </span>
              <mat-icon style="margin-left: 8px;"
                        class="section-icon mat-icon&#45;&#45;small">
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
          </ng-container>-->
    `,
    styles: [`
        details > summary {
            list-style: none;
            display: flex;
        }

        summary::marker {
            display: none;
        }

        .summary-content {
            display: flex;
            align-items: center;
            flex-grow: 1;
        }

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
export class InspectorSectionComponent implements AfterViewInit {

    readonly expanded$ = observeAttribute$(this as InspectorSectionComponent, "expanded");

    @ViewChild("details")
    detailsElementRef: ElementRef<HTMLDetailsElement>;

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

    ngAfterViewInit(): void {
        this.expanded$.subscribe(expanded => {
            this.detailsElementRef.nativeElement.open = expanded;
        });
    }

    updateExpanded(expanded: boolean) {
        if (expanded === this.expanded) return;

        this.expanded = expanded;
        this.expandedChange.emit(this.expanded);
    }

    // noinspection JSUnusedLocalSymbols
    onToggle($event: Event) {
        const isExpanded = this.detailsElementRef.nativeElement.open;
        this.updateExpanded(isExpanded);
    }
}
