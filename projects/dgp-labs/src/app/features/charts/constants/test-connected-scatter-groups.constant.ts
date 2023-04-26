import { ConnectedScatterGroup, Shape, Stroke } from "dgp-ng-charts";

export const testConnectedScatterGroups: ReadonlyArray<ConnectedScatterGroup> = [{
    connectedScatterGroupId: "group01",
    colorHex: "#ffab40",
    shape: Shape.Cross,
    series: [{
        label: "Series 01",
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
    colorHex: "#ffab40",
    shape: Shape.Rectangle,
    series: [{
        label: "Series 03",
        connectedScatterSeriesId: "series03",
        stroke: Stroke.DashDotted,

        dots: [
            {x: 0.01, y: 5},
            {x: 541, y: 2},
            {x: 678, y: 4},
            {x: 712, y: 3},
        ]
    }]
}];
