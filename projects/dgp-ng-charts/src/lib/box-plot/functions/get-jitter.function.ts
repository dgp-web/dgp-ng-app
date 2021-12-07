import { defaultBoxPlotConfig } from "../constants/default-box-plot-config.constant";
import * as seedrandom from "seedrandom";

export function getJitter(seed: string, config = defaultBoxPlotConfig): number {

    const jitterWidth = config.jitterWidth;

    const rdm = seedrandom.alea(seed);
    return -jitterWidth / 2 + rdm() * jitterWidth;

}
