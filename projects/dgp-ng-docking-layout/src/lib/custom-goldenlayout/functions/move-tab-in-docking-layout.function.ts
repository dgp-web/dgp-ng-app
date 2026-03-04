import { ItemConfiguration, LayoutConfiguration, StackConfiguration } from "../types";
import { AddTabToDockingLayoutEvent, RemoveTabFromDockingLayoutEvent } from "../models/stack/move-tab-in-docking-layout-event.model";
import { notNullOrUndefined } from "dgp-ng-app";
import { DropSegment } from "../models/drop-segment.model";

export function tryRemoveTabFromDockingLayoutItem(payload: {
    readonly item: ItemConfiguration;
    readonly event: RemoveTabFromDockingLayoutEvent;
}): ItemConfiguration {

    const item = payload.item;
    const event = payload.event;

    if (item.id === event.removedTab.id) return null;

    if (!item.content) return item;

    item.content = item.content.map(x => {
        return tryRemoveTabFromDockingLayoutItem({item: x, event});
    }).filter(notNullOrUndefined);

    return item;

}

export function removeTabFromDockingLayout(payload: {
    readonly layout: LayoutConfiguration;
    readonly event: RemoveTabFromDockingLayoutEvent;
}): LayoutConfiguration {

    let layout = payload.layout;

    layout.content = layout.content.map(x => {
        return tryRemoveTabFromDockingLayoutItem({item: x, event: payload.event});
    }).filter(notNullOrUndefined);

    layout = cleanupDockingLayout(layout);

    return layout;

}

export function tryAddTabToDockingLayoutItem(payload: {
    readonly item: ItemConfiguration;
    readonly event: AddTabToDockingLayoutEvent;
}): ItemConfiguration {

    const item = payload.item;
    const event = payload.event;

    if (item.id === event.targetStackConfig.id) {
        let stackConfig = item as StackConfiguration;
        const targetTabDropSegment = event.targetTabDropSegment;
        let targetTabHeaderDropIndex = event.targetTabHeaderDropIndex;
        const addedTab = event.addedTab;

        if (targetTabDropSegment === DropSegment.Header) {
            if (stackConfig.content === undefined) stackConfig = {...stackConfig, content: []};
            if (targetTabHeaderDropIndex === undefined) targetTabHeaderDropIndex = stackConfig.content.length;

            // TODO: Use toSpliced
            stackConfig.content.splice(targetTabHeaderDropIndex, 0, addedTab);
            stackConfig = {
                ...stackConfig,
                content: [...stackConfig.content],
                activeItemId: addedTab.id,
                activeItemIndex: targetTabHeaderDropIndex
            };

            return stackConfig;
        } else {
            // TODO: Add depending on other drop segments. See handleComponentDroppedOnStack in DL Service

        }


        return item;
    }

    if (!item.content) return item;

    return {
        ...item,
        content: item.content.map(x => {
            return tryAddTabToDockingLayoutItem({item: x, event});
        }).filter(notNullOrUndefined)
    };

}


export function addTabToDockingLayout(payload: {
    readonly layout: LayoutConfiguration;
    readonly event: AddTabToDockingLayoutEvent;
}): LayoutConfiguration {

    let layout = payload.layout;
    const event = payload.event;

    layout.content = layout.content.map(x => {
        return tryAddTabToDockingLayoutItem({item: x, event});
    }).filter(notNullOrUndefined);

    layout = cleanupDockingLayout(layout);

    return layout;
}

export function cleanupDockingLayout(layout: LayoutConfiguration): LayoutConfiguration {

    // TODO: remove empty stacks
    // TODO: remove rows or columns

    // TODO: wrap stacks in rows or columns

    return layout;
}
