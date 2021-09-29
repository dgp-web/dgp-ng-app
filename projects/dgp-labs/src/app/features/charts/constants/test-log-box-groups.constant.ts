import { BoxGroup, Shape } from "dgp-ng-charts";

export const testLogBoxGroups: ReadonlyArray<BoxGroup> = [{
    value: "first",
    boxGroupId: "first",
    boxes: [{
        boxId: "first01",
        boxGroupId: "first",
        quantiles: {
            min: 0.1,
            lower: 1,
            median: 10,
            upper: 100,
            max: 1000
        },
        outliers: [
            0.001, 0.01, 10000, 100000
        ],
        colorHex: "#3000f0"
    }, {
        boxId: "first02",
        boxGroupId: "first",
        quantiles: {
            min: 2,
            lower: 3.25,
            median: 5,
            upper: 6,
            max: 9
        },
        outliers: [
            -2, -1, 14
        ],
        colorHex: "#309000",
        outlierShape: Shape.Circle
    }],
    label: "Default"
}];
