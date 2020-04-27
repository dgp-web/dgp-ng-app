import { Component, ChangeDetectionStrategy, Input, ContentChildren, QueryList } from "@angular/core";
import { ColumnConfiguration, RowConfiguration } from "@dgp/ng-bootstrap-ui";
import { guid } from "@dgp/ngrx-entity-store";
import { DockingLayoutContainerComponent } from "./docking-layout-container.component";

@Component({
    selector: "gl-item",
    template: "<ng-content></ng-content>",
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DockingLayoutItemComponent {

    @ContentChildren(DockingLayoutItemComponent) items: QueryList<DockingLayoutItemComponent>;
    @ContentChildren(DockingLayoutContainerComponent) containers: QueryList<DockingLayoutContainerComponent>;

    @Input() type: "row" | "column";

    @Input() width: number;
    @Input() height: number;

    get configuration(): RowConfiguration | ColumnConfiguration {

        const items = this.items.toArray()
            .filter(x => x !== this)
            .map(x => x.configuration);

        const containers = this.containers.toArray()
            .map(x => x.configuration);

        const content = [
            ...items,
            ...containers
        ];

        if (this.type === "row") {

            const rowConfiguration: RowConfiguration = {
                type: "row",
                id: guid(),
                content: content,
                height: this.height,
                width: this.width
            };

            return rowConfiguration;

        } else {

            const columnConfiguration: ColumnConfiguration = {
                type: "column",
                id: guid(),
                content: content,
                height: this.height,
                width: this.width
            };

            return columnConfiguration;

        }
    }

}
