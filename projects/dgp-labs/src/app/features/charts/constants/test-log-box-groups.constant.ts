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
            median: 70,
            upper: 600,
            max: 5000
        },
        outliers: [
            0.002, 0.03, 40000, 200000
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
