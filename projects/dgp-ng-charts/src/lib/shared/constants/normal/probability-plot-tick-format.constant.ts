import { CardinalAxisTickFormat } from "../../models/cardinal-axis-tick-format.model";
import * as d3 from "d3";

export const probabilityPlotTickFormat: CardinalAxisTickFormat = (x: number) => {
    if (x >= 1 && x <= 99) return d3.format("d")(x);
    if (x < 1) return x.toPrecision(1);
    /**
     * x > 99
     *
     * This replaces issues like 99.999000001
     */
    return x.toString().replace(/(0+1+)+/, "");
};
