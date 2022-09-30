import { HeatmapDomainOverrides } from "./heatmap-domain-overrides.model";

export type DomainComputer<TModel> = (model: TModel, overrides?: HeatmapDomainOverrides) => ReadonlyArray<number>;
