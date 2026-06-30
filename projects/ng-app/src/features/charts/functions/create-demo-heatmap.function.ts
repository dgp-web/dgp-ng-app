import { HeatmapDemoConfig } from "../models/heatmap/heatmap-demo-config.model";
import { Heatmap, HeatmapTile, defaultDgpHeatmapConfig } from "dgp-ng-charts";

export function createDemoHeatmap(payload: HeatmapDemoConfig): Heatmap {
    const heatmapTiles = new Array<HeatmapTile>();

    for (let i = 0; i < payload.rows; i++) {
        for (let j = 0; j < payload.columns; j++) {

            let value = Math.random() * (i + j);

            if (payload.useNullValues) {

                const useNullValue = (i + j) % 2;
                value = useNullValue ? null : value;
            }

            heatmapTiles.push({
                x: j,
                y: i,
                value
            });
        }
    }

    return {
        model: heatmapTiles,
        config: {
            ...defaultDgpHeatmapConfig,
            maxTileExtent: {
                height: 100,
                width: 100
            }
        },
        exportConfig: {
            rightLegend: document.createElement("span")
        },
        chartTitle: "Chart title",
        xAxisTitle: "x axis",
        yAxisTitle: "y axis",
    };
}
