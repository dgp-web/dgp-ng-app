import { CardinalD3AxisScale, CardinalYAxis, ScaleType, SharedChartConfig } from "../models";
import * as _ from "lodash";
import { toReferenceTickLength } from "./to-reference-tick-length.function";

export function tryResolveMarginLeft(payload: {
    readonly yAxisModel: CardinalYAxis;
    readonly yAxisScale: CardinalD3AxisScale;
    readonly yMin: number;
    readonly yMax: number;
    readonly config: SharedChartConfig;
    readonly refTickCharWidth: number;
}) {
    const yAxisModel = payload.yAxisModel;
    const yAxisScale = payload.yAxisScale;
    const yMin = payload.yMin;
    const yMax = payload.yMax;
    let marginLeft = payload.config.margin.left;
    const refTickCharWidth = payload.refTickCharWidth;

    if (yAxisModel.yAxisScaleType !== ScaleType.Logarithmic) {
        /**
         * We retrieve the configured formatter or the implicit default
         * used by d3 which is scale.tickFormat()
         */
        const yAxisTickFormat = yAxisModel.yAxisTickFormat || yAxisScale.tickFormat();

        /**
         * Note: If this doesn't produce good results, then we can try to
         * add additional values between the extrema to estimate this length
         */
        const referenceYDomainLabelLength = _.max(
            [yMin, yMax].map(x => yAxisTickFormat(x)).map(toReferenceTickLength())
        );

        const estimatedNeededMaxYTickWidthPx = referenceYDomainLabelLength * refTickCharWidth;

        marginLeft = marginLeft >= estimatedNeededMaxYTickWidthPx
            ? marginLeft
            : estimatedNeededMaxYTickWidthPx;
    }

    return marginLeft;
}
