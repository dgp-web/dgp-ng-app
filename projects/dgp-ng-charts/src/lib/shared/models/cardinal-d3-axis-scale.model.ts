import { ScaleLinear, ScaleLogarithmic } from "d3";

export type CardinalD3AxisScale = ScaleLinear<number, number> | ScaleLogarithmic<number, number>;
