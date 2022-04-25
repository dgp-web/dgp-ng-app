import { CommonModule } from "@angular/common";
import { FactoryProvider, InjectionToken, NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { ItemContainerComponent } from "../custom-goldenlayout/components/item-container.component";
import { RowOrColumnComponent } from "../custom-goldenlayout/components/row-or-column.component";
import { StackComponent } from "../custom-goldenlayout/components/stack.component";
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
import { ColumnComponent } from "../custom-goldenlayout/components/column.component";
import { RowComponent } from "../custom-goldenlayout/components/row.component";
import { RootComponent } from "../custom-goldenlayout/components/root.component";
import { GlComponent } from "../custom-goldenlayout/components/component.component";
import { DropTargetIndicatorComponent } from "../custom-goldenlayout/components/drop-target-indicator.component";
import { TabDropPlaceholderComponent } from "../custom-goldenlayout/components/tab-drop-placeholder.component";
import { DgpResizeSensorModule } from "dgp-ng-app";
import { TabComponent } from "../custom-goldenlayout/components/tab.component";
import { HeaderComponent } from "../custom-goldenlayout/components/header.component";
import { HeaderButtonComponent } from "../custom-goldenlayout/components/header-button.component";

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
        ]),
        DgpResizeSensorModule
    ],
    declarations: [
        DockingLayoutContainerComponent,
        DockingLayoutItemComponent,
        DockingLayoutComponent,
        RowOrColumnComponent,
        StackComponent,
        ItemContainerComponent,
        ColumnComponent,
        HeaderComponent,
        RowComponent,
        RootComponent,
        GlComponent,
        DropTargetIndicatorComponent,
        TabDropPlaceholderComponent,
        TabComponent,
        HeaderButtonComponent
    ],
    exports: [
        DockingLayoutContainerComponent,
        DockingLayoutItemComponent,
        DockingLayoutComponent,
        RowOrColumnComponent,
        HeaderComponent,
        StackComponent,
        ItemContainerComponent,
        ColumnComponent,
        RowComponent,
        RootComponent,
        GlComponent,
        DropTargetIndicatorComponent,
        TabDropPlaceholderComponent,
        TabComponent,
        HeaderButtonComponent
    ],
    providers: [
        DockingLayoutService,
        ComponentRegistry,
        dockingLayoutReducerProvider
    ]
})
export class DgpDockingLayoutModule {
}
