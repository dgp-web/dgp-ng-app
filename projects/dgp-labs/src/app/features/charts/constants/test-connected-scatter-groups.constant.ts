import { ConnectedScatterGroup, Shape } from "dgp-ng-charts";

export const testConnectedScatterGroups: ReadonlyArray<ConnectedScatterGroup> = [{
    connectedScatterGroupId: "group01",
    colorHex: "#00ff00",
    shape: Shape.Star,
    showEdges: false,
    series: [{
        connectedScatterSeriesId: "series01",
        dots: [
            {x: 10, y: 2},
            {x: 123, y: 3},
            {x: 413, y: 7},
            {x: 685, y: 5},
            {x: 1005, y: 4},
        ]
    }]
}, {
    connectedScatterGroupId: "group02",
    colorHex: "#ff00ff",
    shape: Shape.Rectangle,
    showVertices: false,
    series: [{
        connectedScatterSeriesId: "series03",
        dots: [
            {x: -2, y: 5},
            {x: 541, y: 2},
            {x: 678, y: 4},
            {x: 712, y: 3},
        ]
    }]
}];
