import { DotTooltipFormat } from "./dot-tooltip-format.model";

export interface DotConfig {
    /**
     * Indicates the size of dots
     */
    readonly dotSize?: number;
    /**
     * Whether tooltips are shown
     */
    readonly showDotTooltips?: boolean;
    /**
     * How to format tooltips
     *
     * If this is not set then a default logic is used.
     */
    readonly dotTooltipFormat?: DotTooltipFormat;
}

