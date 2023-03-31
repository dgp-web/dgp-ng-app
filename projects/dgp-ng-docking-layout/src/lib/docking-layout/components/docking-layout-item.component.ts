import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, Output, QueryList } from "@angular/core";
import { DockingLayoutContainerComponent } from "./docking-layout-container.component";
import {
    ColumnConfiguration,
    ComponentConfiguration,
    RowConfiguration,
    SelectedItemChange,
    StackConfiguration
} from "../../custom-goldenlayout/types";
import { createGuid } from "dgp-ng-app";
import { Subject } from "rxjs";

@Component({
    selector: "dgp-docking-layout-item",
    template: "<ng-content></ng-content>",
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            height: 100%;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockingLayoutItemComponent implements AfterViewInit {

    @ContentChildren(DockingLayoutItemComponent) items: QueryList<DockingLayoutItemComponent>;
    @ContentChildren(DockingLayoutContainerComponent) containers: QueryList<DockingLayoutContainerComponent>;

    @Input() type: "row" | "column" | "stack";

    @Input() id = createGuid();
    @Input() width: number;
    @Input() height: number;
    @Input() selectedItemIndex = 0;

    private selectedItemIdValue: string;

    @Input()
    get selectedItemId(): string {
        return this.selectedItemIdValue;
    }

    /**
     * For setting changes from outside
     */
    set selectedItemId(value: string) {
        if (value === this.selectedItemIdValue) return;

        this.selectedItemIdValue = value;

        if (this.configuration && (this.configuration as StackConfiguration).publishSelectedItemChange$) {
            (this.configuration as StackConfiguration).publishSelectedItemChange$.next({id: value});
        }
    }


    @Output()
    readonly selectedItemIdChange = new EventEmitter<string>();

    configuration: RowConfiguration | ColumnConfiguration | StackConfiguration;

    /**
     * For setting this from within
     */
    setSelectedItemId(selectedItemIdValue: string) {
        if (this.selectedItemIdValue === selectedItemIdValue) return;

        this.selectedItemIdValue = selectedItemIdValue;
        this.selectedItemIdChange.emit(selectedItemIdValue);
    }

    ngAfterViewInit(): void {

        const items = this.items.toArray()
            .filter(x => x !== this)
            .map(x => x.configuration);

        const containers = this.containers.toArray()
            .map(x => x.configuration);

        const content = [
            ...items,
            ...containers
        ] as ComponentConfiguration[];

        if (this.type === "stack") {

            this.configuration = {
                type: "stack",
                id: this.id,
                content,
                activeItemIndex: this.selectedItemIndex,
                activeItemId: this.selectedItemId,
                onSelectedItemChange: id => this.setSelectedItemId(id),
                publishSelectedItemChange$: new Subject<SelectedItemChange>()
            };


        } else if (this.type === "row") {

            this.configuration = {
                type: "row",
                id: this.id,
                content,
                height: this.height,
                width: this.width
            };

        } else {

            this.configuration = {
                type: "column",
                id: this.id,
                content,
                height: this.height,
                width: this.width
            };

        }


    }

}
