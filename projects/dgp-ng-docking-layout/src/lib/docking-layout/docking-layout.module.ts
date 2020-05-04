import { CommonModule } from "@angular/common";
import { FactoryProvider, InjectionToken, NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { ItemContainerComponent } from "../custom-goldenlayout/components/item-container/item-container.component";
import { RowOrColumnComponent } from "../custom-goldenlayout/components/row-or-column/row-or-column.component";
import { StackComponent } from "../custom-goldenlayout/components/stack/stack.component";
import { DockingLayoutService } from "../custom-goldenlayout/docking-layout.service";
import { ComponentRegistry } from "../custom-goldenlayout/services/component-registry";
import { DockingLayoutContainerComponent } from "./components/docking-layout-container.component";
import { DockingLayoutItemComponent } from "./components/docking-layout-item.component";
import { DockingLayoutComponent } from "./components/docking-layout.component";
import { dockingLayoutEntityStore } from "./store";
import { StoreModule } from "@ngrx/store";
import { dockingLayoutStoreFeature } from "./models";
import { EffectsModule } from "@ngrx/effects";
import { DockingLayoutEffects } from "./effects";

export const DOCKING_LAYOUT_REDUCER = new InjectionToken<typeof dockingLayoutEntityStore.reducers>(
    "DockingLayoutReducer"
);

export function dockingLayoutReducerFactory() {
    return dockingLayoutEntityStore.reducers;
}

export const dockingLayoutReducerProvider: FactoryProvider = {
    provide: DOCKING_LAYOUT_REDUCER,
    useFactory: dockingLayoutReducerFactory
};

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        StoreModule.forFeature(dockingLayoutStoreFeature, DOCKING_LAYOUT_REDUCER),
        EffectsModule.forFeature([
            DockingLayoutEffects
        ])
    ],
    declarations: [
        DockingLayoutContainerComponent,
        DockingLayoutItemComponent,
        DockingLayoutComponent,
        RowOrColumnComponent,
        StackComponent,
        ItemContainerComponent
    ],
    exports: [
        DockingLayoutContainerComponent,
        DockingLayoutItemComponent,
        DockingLayoutComponent,
        RowOrColumnComponent,
        StackComponent,
        ItemContainerComponent
    ],
    providers: [
        DockingLayoutService,
        ComponentRegistry,
        dockingLayoutReducerProvider
    ]
})
export class DgpDockingLayoutModule {
}
