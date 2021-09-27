import { BarGroup, FillPattern } from "dgp-ng-charts";

export const testBarGroups: ReadonlyArray<BarGroup> = [{
    barGroupKey: "01",
    label: "Group 01",
    bars: [{
        barKey: "01",
        label: "Bar 01",
        value: 7,
        colorHex: "#ffff00"
    }, {
        barKey: "02",
        label: "Bar 02",
        value: 3,
        colorHex: "#00ffff"
    }]
}, {
    barGroupKey: "02",
    label: "Group 02",
    bars: [{
        barKey: "03",
        label: "Bar 03",
        value: 5,
        colorHex: "#00ffff",
        fillPattern: FillPattern.Grid
    }, {
        barKey: "04",
        label: "Bar 04",
        value: 9,
        colorHex: "#00ffff",
        fillPattern: FillPattern.DiagonalGrid
    }]
}, {
    barGroupKey: "03",
    label: "Group 03",
    bars: [{
        barKey: "05",
        label: "Bar 05",
        value: 5,
        colorHex: "#00ffff",
        fillPattern: FillPattern.HorizontalLines
    }, {
        barKey: "06",
        label: "Bar 06",
        value: 9,
        colorHex: "#00ffff",
        fillPattern: FillPattern.VerticalLines
    }]
}, {
    barGroupKey: "04",
    label: "Group 04",
    bars: [{
        barKey: "07",
        label: "Bar 07",
        value: 5,
        colorHex: "#00ffff",
        fillPattern: FillPattern.LinesFromLeftTopToRightBottom
    }, {
        barKey: "08",
        label: "Bar 08",
        value: 9,
        colorHex: "#00ffff",
        fillPattern: FillPattern.LinesFromLeftBottomToRightTop
    }]
}, {
    barGroupKey: "05",
    label: "Group 05",
    bars: [{
        barKey: "09",
        label: "Bar 09",
        value: 5,
        colorHex: "#00ffff",
        fillPattern: FillPattern.Checkerboard
    }, {
        barKey: "10",
        label: "Bar 10",
        value: 9,
        colorHex: "#00ffff",
        fillPattern: FillPattern.DiagonalCheckerboard
    }]
}];
