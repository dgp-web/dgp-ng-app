import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { normalPlotOptimizationReducer } from "./reducers/normal-plot-optimization.reducer";
import { normalPlotOptimizationStoreFeature } from "./constants/normal-plot-optimization-store-feature.constant";

@NgModule({
    imports: [
        StoreModule.forFeature(normalPlotOptimizationStoreFeature, normalPlotOptimizationReducer)
    ]
})
export class DgpNormalPlotOptimizationModule {
}
