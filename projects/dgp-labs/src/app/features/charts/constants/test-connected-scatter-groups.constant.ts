import { ConnectedScatterGroup, getMedianRank, Shape, Stroke } from "dgp-ng-charts";

export const n = 5;
export const n2 = 4;

export const testConnectedScatterGroups: ReadonlyArray<ConnectedScatterGroup> = [{
    connectedScatterGroupId: "group01",
    colorHex: "#00ff00",
    shape: Shape.Cross,
    series: [{
        label: "Series 01",
        connectedScatterSeriesId: "series01",
        dots: [
            {x: 10, y: getMedianRank({n, i: 1}) * 100},
            {x: 123, y: getMedianRank({n, i: 2}) * 100},
            {x: 413, y: getMedianRank({n, i: 3}) * 100},
            {x: 685, y: getMedianRank({n, i: 4}) * 100},
            {x: 1005, y: getMedianRank({n, i: 5}) * 100},
        ]
    }]
}, {
    connectedScatterGroupId: "group02",
    colorHex: "#ff00ff",
    shape: Shape.Rectangle,
    series: [{
        label: "Series 03",
        connectedScatterSeriesId: "series03",
        stroke: Stroke.DashDotted,

        dots: [
            {x: 0.01, y: getMedianRank({n: n2, i: 1}) * 100},
            {x: 541, y: getMedianRank({n: n2, i: 2}) * 100},
            {x: 678, y: getMedianRank({n: n2, i: 3}) * 100},
            {x: 712, y: getMedianRank({n: n2, i: 4}) * 100},
        ]
    }]
}];
