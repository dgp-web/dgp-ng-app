import { ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from "@angular/core";
import { SplitPanelContentComponent } from "./split-panel-content.component";
import { ColumnConfiguration, RowConfiguration } from "../custom-goldenlayout/types";
import { createGuid } from "dgp-ng-app";

@Component({
    selector: "dgp-split-panel-item",
    template: " <ng-content></ng-content>",
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            height: 100%;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitPanelItemComponent {

    @ContentChildren(SplitPanelItemComponent) items: QueryList<SplitPanelItemComponent>;
    @ContentChildren(SplitPanelContentComponent) containers: QueryList<SplitPanelContentComponent>;

    @Input()
    orientation: "horizontal" | "vertical" = "vertical";

    get configuration(): RowConfiguration | ColumnConfiguration {


        console.log("Collecting stuff");


        const items = this.items.toArray()
            .filter(x => x !== this)
            .map(x => x.configuration);

        const containers = this.containers.toArray()
            .map(x => x.configuration);

        const content = [
            ...items,
            ...containers
        ];

        if (this.orientation === "horizontal") {

            return {
                type: "row",
                id: createGuid(),
                content
            };

        } else {

            return {
                type: "column",
                id: createGuid(),
                content
            };

        }
    }

}
