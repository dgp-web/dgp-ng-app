import { ConnectedScatterGroup } from "../../../../../../dgp-ng-charts/src/lib/connected-scatter-plot/models";

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
        colorHex: "#00ffff"
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
        colorHex: "#ffff00"
    }, {
        connectedScatterSeriesId: "series04",
        dots: [
            {x: 0, y: 3},
            {x: 2, y: 1},
            {x: 3, y: 7},
            {x: 8, y: 8},
        ],
        colorHex: "#ff00ff"
    }]
}];
