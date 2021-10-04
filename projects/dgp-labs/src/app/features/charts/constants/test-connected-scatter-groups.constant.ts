import { ConnectedScatterGroup, Shape } from "dgp-ng-charts";

export const testConnectedScatterGroups: ReadonlyArray<ConnectedScatterGroup> = [{
    connectedScatterGroupId: "group01",
    colorHex: "#00ff00",
    shape: Shape.Star,
    series: [{
        connectedScatterSeriesId: "series01",
        dots: [
            {x: 1, y: 2},
            {x: 3, y: 7},
            {x: 4, y: 5},
            {x: 9, y: 4},
        ]
    }]
}, {
    connectedScatterGroupId: "group02",
    colorHex: "#ff00ff",
    shape: Shape.Rectangle,
    series: [{
        connectedScatterSeriesId: "series03",
        dots: [
            {x: -2, y: 5},
            {x: 4, y: 2},
            {x: 6, y: 4},
            {x: 7, y: 3},
        ]
    }]
}];
