import { BoxGroup, FillPattern, Shape } from "dgp-ng-charts";

export const testBoxGroups: ReadonlyArray<BoxGroup> = [{
    value: "first",
    boxGroupId: "first",
    boxes: [{
        boxId: "first01",
        boxGroupId: "first",
        quantiles: {
            min: 1,
            lower: 2.25,
            median: 5.5,
            upper: 6.75,
            max: 10
        },
        outliers: [
            17, 18
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
        outlierLabels: [
            "Test 01",
            "Test 02",
            "Test 03"
        ],
        colorHex: "#309000",
        outlierShape: Shape.Circle
    }],
    label: "Default"
}, {
    value: "second",
    boxGroupId: "second",
    boxes: [{
        boxId: "second01",
        boxGroupId: "second",
        quantiles: {
            min: 1,
            lower: 2.25,
            median: 5.5,
            upper: 6.75,
            max: 10
        },
        outliers: [
            17, 18
        ],
        colorHex: "#3000f0",
        fillPattern: FillPattern.Checkerboard,
        outlierShape: Shape.Rectangle
    }, {
        boxId: "second02",
        boxGroupId: "second",
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
        fillPattern: FillPattern.DiagonalCheckerboard,
        outlierShape: Shape.Rhombus
    }],
    label: "Checkerboard"
}, {
    value: "third",
    boxGroupId: "third",
    boxes: [{
        boxId: "third01",
        boxGroupId: "third",
        quantiles: {
            min: 1,
            lower: 2.25,
            median: 5.5,
            upper: 6.75,
            max: 10
        },
        outliers: [
            17, 18
        ],
        colorHex: "#3000f0",
        fillPattern: FillPattern.Grid,
        outlierShape: Shape.Star
    }, {
        boxId: "third02",
        boxGroupId: "third",
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
        fillPattern: FillPattern.DiagonalGrid,
        outlierShape: Shape.Triangle
    }],
    label: "Grid"
}, {
    value: "fourth",
    boxGroupId: "fourth",
    boxes: [{
        boxId: "fourth01",
        boxGroupId: "fourth",
        quantiles: {
            min: 1,
            lower: 2.25,
            median: 5.5,
            upper: 6.75,
            max: 10
        },
        outliers: [
            17, 18
        ],
        colorHex: "#3000f0",
        fillPattern: FillPattern.HorizontalLines,
        outlierShape: Shape.TriangleDown
    }, {
        boxId: "fourth02",
        boxGroupId: "fourth",
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
        fillPattern: FillPattern.VerticalLines,
        outlierShape: Shape.TriangleLeft
    }],
    label: "Straight lines"
}, {
    value: "fifth",
    boxGroupId: "fifth",
    boxes: [{
        boxId: "fifth01",
        boxGroupId: "fifth",
        quantiles: {
            min: 1,
            lower: 2.25,
            median: 5.5,
            upper: 6.75,
            max: 10
        },
        outliers: [
            17, 18
        ],
        colorHex: "#3000f0",
        fillPattern: FillPattern.LinesFromLeftTopToRightBottom,
        outlierShape: Shape.TriangleRight
    }, {
        boxId: "fifth02",
        boxGroupId: "fifth",
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
        fillPattern: FillPattern.LinesFromLeftBottomToRightTop
    }],
    label: "Diagonal lines"
}];
