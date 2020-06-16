import { SplitPanelOrientation } from "./models";
import { createGuid } from "dgp-ng-app";
import {
    ColumnConfiguration,
    ComponentConfiguration,
    LayoutConfiguration, RowConfiguration
} from "../custom-goldenlayout/types";

export function createSplitPanelComponentTree(payload: {
    readonly orientation: SplitPanelOrientation;
    readonly content: ReadonlyArray<ComponentConfiguration>;
}) {
    let topContent: any;

    if (payload.orientation === "vertical") {

        topContent = {
            type: "column",
            id: createGuid(),
            content: []
        };

        payload.content.forEach(x => {

            topContent.content.push({
                type: "row",
                height: x.height,
                id: createGuid(),
                content: [{
                    type: "stack",
                    id: createGuid(),
                    content: [
                        x
                    ]
                }]
            });

        });

    } else {
        topContent = {
            type: "row",
            id: createGuid(),
            content: []
        };

        payload.content.forEach(x => {

            topContent.content.push({
                type: "column",
                width: x.width,
                id: createGuid(),
                content: [{
                    type: "stack",
                    id: createGuid(),
                    content: [
                        x
                    ]
                }]
            });

        });
    }
    return topContent;
}

export function createLayoutConfig(root: RowConfiguration | ColumnConfiguration, splitterSize: number): LayoutConfiguration {
    return {
        content: [root],
        settings: {
            hasHeaders: false
        },
        dimensions: {
            borderWidth: splitterSize,
            minItemHeight: 10,
            minItemWidth: 10
        }
    };
}
