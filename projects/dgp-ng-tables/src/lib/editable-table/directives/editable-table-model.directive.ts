import { Directive, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { distinctUntilHashChanged, observeAttribute$ } from "dgp-ng-app";
import { Many } from "data-modeling";
import { map, tap } from "rxjs/operators";
import { EditableTable } from "../models";
import { DgpEditableTableComponent } from "../components/editable-table.component";

@Directive({
    selector: "[dgpEditableTableModel]"
})
export class DgpEditableTableModelDirective implements OnInit, OnDestroy {

    private readonly subscriptions = new Array<Subscription>();

    @Input()
    tableModel: EditableTable;

    private readonly tableModel$ = observeAttribute$(this as DgpEditableTableModelDirective, "tableModel");

    constructor(
        private readonly component: DgpEditableTableComponent
    ) {
    }

    ngOnInit(): void {
        this.spreadModelToInputs();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => {
            if (!x.closed) x.unsubscribe();
        });
    }

    private spreadModelToInputs() {

        const keys = [
            "model",
            /**
             * Display config
             */
            "sizingStrategy",
            /**
             * Edit config
             */
            "canEditCellFormatMasks",
            "canAddColumns",
            "canRemoveColumns",
            "canMoveColumns",
            "canResizeColumns",
            "canEditColumnFormatMasks",
            "canAddRows",
            "canRemoveRows",
            "canMoveRows",
            "canResizeRows",
            /**
             * Model
             */
            "model",
            /**
             * Structure
             */
            "cells",
            "rows",
            "columns"

        ] as Many<keyof EditableTable>;

        keys.forEach(key => {
            this.subscriptions.push(
                this.tableModel$.pipe(
                    map(x => x[key]),
                    distinctUntilHashChanged(),
                    tap(x => {
                        (this.component as any)[key] = x;
                    })
                ).subscribe()
            );
        });


    }

}
