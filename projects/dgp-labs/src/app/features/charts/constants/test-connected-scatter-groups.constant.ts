import { ConnectedScatterGroup } from "../../../../../../dgp-ng-charts/src/lib/connected-scatter-plot/models";
import { Shape } from "../../../../../../dgp-ng-charts/src/lib/symbols/models";

export const testConnectedScatterGroups: ReadonlyArray<ConnectedScatterGroup> = [{
    connectedScatterGroupId: "group01",
    series: [{
        connectedScatterSeriesId: "series01",
        dots: [
            {x: 1, y: 2},
            {x: 3, y: 7},
            {x: 4, y: 5},
            {x: 9, y: 4},
        ],
        colorHex: "#00ff00"
    }, {
        connectedScatterSeriesId: "series02",
        dots: [
            {x: 0, y: 4},
            {x: 3, y: 7},
            {x: 5, y: 9},
            {x: 6, y: 1},
        ],
        colorHex: "#00ffff",
        shape: Shape.Circle
    }]
}, {
    connectedScatterGroupId: "group02",
    series: [{
        connectedScatterSeriesId: "series03",
        dots: [
            {x: -2, y: 5},
            {x: 4, y: 2},
            {x: 6, y: 4},
            {x: 7, y: 3},
        ],
        colorHex: "#ffff00",
        shape: Shape.Rectangle
    }, {
        connectedScatterSeriesId: "series04",
        dots: [
            {x: 0, y: 3},
            {x: 2, y: 1},
            {x: 3, y: 7},
            {x: 8, y: 8},
        ],
        colorHex: "#ff00ff",
        shape: Shape.Rhombus
    }]
}, {
    connectedScatterGroupId: "group03",
    series: [{
        connectedScatterSeriesId: "series05",
        dots: [
            {x: -0.1, y: 3.4},
            {x: 4.2, y: 5.2},
            {x: 6.23, y: 1.3},
            {x: 6.7, y: 4.5},
        ],
        colorHex: "#999900",
        shape: Shape.Triangle
    }, {
        connectedScatterSeriesId: "series06",
        dots: [
            {x: 0.123, y: 3.651},
            {x: 2.412, y: 9.123},
            {x: 5.123, y: 12.251},
            {x: 8.7387, y: 5.5234},
        ],
        colorHex: "#990099",
        shape: Shape.TriangleDown
    }]
}, {
    connectedScatterGroupId: "group04",
    series: [{
        connectedScatterSeriesId: "series07",
        dots: [
            {x: 2, y: 4},
            {x: 4, y: 7},
            {x: 6, y: 8},
            {x: 8, y: 1},
        ],
        colorHex: "#999999",
        shape: Shape.TriangleRight
    }, {
        connectedScatterSeriesId: "series08",
        dots: [
            {x: 1, y: 3},
            {x: 3, y: 4},
            {x: 5, y: 3},
            {x: 7, y: 8},
        ],
        colorHex: "#009999",
        shape: Shape.TriangleLeft
    }]
}];
