import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { AttributeMetadata } from "data-modeling";
import { observeAttribute$ } from "../../utils/observe-input";

@Component({
    selector: "dgp-inspector-section",
    template: `
        <details #details
                 (toggle)="onToggle($event)">
            <summary (click)="$event.preventDefault()"
                     tabindex="-1">
                <ng-container *ngIf="togglePosition === 'start'">
                    <dgp-expansion-toggle *ngIf="expandable"
                                          [model]="expanded"
                                          (modelChange)="updateExpanded($event)"></dgp-expansion-toggle>
                </ng-container>
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
                <ng-container *ngIf="togglePosition === 'end'">
                    <dgp-expansion-toggle *ngIf="expandable"
                                          [model]="expanded"
                                          (modelChange)="updateExpanded($event)"></dgp-expansion-toggle>
                </ng-container>
            </summary>
            <div class="details-content">
                <ng-content></ng-content>
            </div>
        </details>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
        }

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

        .details-content {

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
    togglePosition: "start" | "end" = "start";

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
