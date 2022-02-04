import { CardinalAxisTickFormat } from "../models/cardinal-axis-tick-format.model";

export const defaultCardinalYAxisTickFormat: CardinalAxisTickFormat = x => x.valueOf().toPrecision(3);
