import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { observeAttribute$ } from "../../utils/observe-input";
import { ExpansionTogglePosition } from "../models";
import { Details } from "../models/details.model";

@Component({
    selector: "dgp-details",
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
                    {{ summary }}
                    <ng-content select="[summary]"></ng-content>
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
export class DgpDetailsComponent implements AfterViewInit, Details {

    readonly expanded$ = observeAttribute$(this as DgpDetailsComponent, "expanded");

    @ViewChild("details")
    detailsElementRef: ElementRef<HTMLDetailsElement>;

    @Input()
    summary: string;

    @Input()
    expanded = true;

    @Input()
    expandable = true;

    @Input()
    togglePosition: ExpansionTogglePosition = "start";

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

