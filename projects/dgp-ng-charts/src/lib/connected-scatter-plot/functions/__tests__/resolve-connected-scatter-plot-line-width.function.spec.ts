import { resolveConnectedScatterPlotLineWidth } from "../resolve-connected-scatter-plot-line-width.function";
import { connectedScatterPlotMetadata } from "../../constants/connected-scatter-plot-metadata.constant";

describe(resolveConnectedScatterPlotLineWidth.name, () => {

    it(`should return the passed value if it's set and greater than 0`, () => {
        const result = resolveConnectedScatterPlotLineWidth(2);
        expect(result).toBe(2);
    });

    it(`should return the default value if nothing is passed`, () => {
        const result = resolveConnectedScatterPlotLineWidth();
        expect(result).toBe(connectedScatterPlotMetadata.attributes.lineWidth.defaultValue);
    });

    it(`should return the default value if a negative value is passed`, () => {
        const result = resolveConnectedScatterPlotLineWidth(-1);
        expect(result).toBe(connectedScatterPlotMetadata.attributes.lineWidth.defaultValue);
    });

});
