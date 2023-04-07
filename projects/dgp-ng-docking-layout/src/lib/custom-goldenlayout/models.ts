import { LayoutConfiguration } from "./types";

export const defaultLayoutConfig: LayoutConfiguration = { // default config

    settings: {
        hasHeaders: true,
        constrainDragToContainer: true,
        reorderEnabled: true,
        selectionEnabled: false,
    },
    dimensions: {
        borderWidth: 5,
        borderGrabWidth: 15,
        minItemHeight: 10,
        minItemWidth: 10,
        headerHeight: 20,
        dragProxyWidth: 300,
        dragProxyHeight: 200
    }
};
