import { ConnectedScatterGroup } from "../../../../../../dgp-ng-charts/src/lib/connected-scatter-plot/models";
import { Shape } from "../../../../../../dgp-ng-charts/src/lib/symbols/models";

export const testLogConnectedScatterGroups: ReadonlyArray<ConnectedScatterGroup> = [{
    connectedScatterGroupId: "group01",
    series: [{
        connectedScatterSeriesId: "series01",
        dots: [
            {x: 1, y: 0.001},
            {x: 3, y: 1},
            {x: 4, y: 0.01},
            {x: 9, y: 10},
            {x: 9, y: 1000},
            {x: 9, y: 10},
            {x: 9, y: 10000000},
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
}];
