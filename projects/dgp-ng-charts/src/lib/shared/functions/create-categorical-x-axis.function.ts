import { CategoricalD3AxisScale, CategoricalXAxis } from "../models";
import * as d3 from "d3";
import { Axis } from "d3";
import { axisTickFormattingService } from "../../bar-chart/functions/axis-tick-formatting.service";
import { notNullOrUndefined } from "dgp-ng-app";

export function createCategoricalXAxis(payload: {
    readonly containerWidth: number;
    readonly xAxisModel: CategoricalXAxis;
    readonly xAxisScale: CategoricalD3AxisScale;
}): Axis<string> {

    const containerWidth = payload.containerWidth;
    const xAxisModel = payload.xAxisModel;
    const xAxisScale = payload.xAxisScale;

    const xAxisTickValues = axisTickFormattingService.trimCategoricalXAxisTicks({
        currentXAxisValues: xAxisScale.domain(),
        containerWidth
    });

    let xAxis = d3.axisBottom(xAxisScale).tickValues(xAxisTickValues as any);

    if (notNullOrUndefined(xAxisModel.xAxisTickFormat)) {
        xAxis = xAxis.tickFormat(xAxisModel.xAxisTickFormat as any);
    }

    return xAxis;
}

