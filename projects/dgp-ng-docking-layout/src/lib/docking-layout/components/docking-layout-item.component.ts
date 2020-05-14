import { ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from "@angular/core";
import { DockingLayoutContainerComponent } from "./docking-layout-container.component";
import { ColumnConfiguration, RowConfiguration } from "../../custom-goldenlayout/types";
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

            return {
                type: "row",
                id: createGuid(),
                content,
                height: this.height,
                width: this.width
            };

        } else {

            return {
                type: "column",
                id: createGuid(),
                content,
                height: this.height,
                width: this.width
            };

        }
    }

}
