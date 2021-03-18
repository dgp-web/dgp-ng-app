import { ChangeDetectionStrategy, Component, ContentChildren, Input, Output, QueryList, EventEmitter } from "@angular/core";
import { DockingLayoutContainerComponent } from "./docking-layout-container.component";
import {
    ColumnConfiguration,
    ItemConfiguration,
    RowConfiguration,
    StackConfiguration
} from "../../custom-goldenlayout/types";
import { createGuid } from "dgp-ng-app";

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
export class DockingLayoutItemComponent {

    @ContentChildren(DockingLayoutItemComponent) items: QueryList<DockingLayoutItemComponent>;
    @ContentChildren(DockingLayoutContainerComponent) containers: QueryList<DockingLayoutContainerComponent>;

    @Input() type: "row" | "column" | "stack";

    @Input() id = createGuid();
    @Input() width: number;
    @Input() height: number;
    @Input() selectedItemIndex = 0;

    @Output()
    readonly selectedItemIndexChange = new EventEmitter<number>();

    @Output()
    readonly selectedItemIdChange = new EventEmitter<string>();

    get configuration(): RowConfiguration | ColumnConfiguration | StackConfiguration {

        const items = this.items.toArray()
            .filter(x => x !== this)
            .map(x => x.configuration);

        const containers = this.containers.toArray()
            .map(x => x.configuration);

        const content = [
            ...items,
            ...containers
        ];

        if (this.type === "stack") {

            return {
                type: "stack",
                id: this.id,
                content,
                activeItemIndex: this.selectedItemIndex,
                selectedItemChange: (id, index) => {
                    this.selectedItemIdChange.emit(id);
                    this.selectedItemIndexChange.emit(index);
                },
            };

        } else if (this.type === "row") {

            return {
                type: "row",
                id: this.id,
                content,
                height: this.height,
                width: this.width
            };

        } else {

            return {
                type: "column",
                id: this.id,
                content,
                height: this.height,
                width: this.width
            };

        }
    }

}
