import { CommonModule } from "@angular/common";
import { FactoryProvider, InjectionToken, NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { ItemContainerComponent } from "../custom-goldenlayout/components/grid/item-container.component";
import { RowOrColumnComponent } from "../custom-goldenlayout/components/grid/row-or-column.component";
import { StackComponent } from "../custom-goldenlayout/components/tabs/stack.component";
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
import { RootComponent } from "../custom-goldenlayout/components/root.component";
import { GlComponent } from "../custom-goldenlayout/components/component.component";
import { DropTargetIndicatorComponent } from "../custom-goldenlayout/components/drag-and-drop/drop-target-indicator.component";
import { TabDropPlaceholderComponent } from "../custom-goldenlayout/components/tabs/tab-drop-placeholder.component";
import { DgpResizeSensorModule } from "dgp-ng-app";
import { TabComponent } from "../custom-goldenlayout/components/tabs/tab.component";
import { DragListenerDirective } from "../custom-goldenlayout/components/drag-and-drop/drag-listener.directive";
import { SplitterComponent } from "../custom-goldenlayout/components/resize/splitter.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";

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
        DgpResizeSensorModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule
    ],
    declarations: [
        DockingLayoutContainerComponent,
        DockingLayoutItemComponent,
        DockingLayoutComponent,
        RowOrColumnComponent,
        StackComponent,
        ItemContainerComponent,
        RootComponent,
        GlComponent,
        TabComponent,
        DropTargetIndicatorComponent,
        TabDropPlaceholderComponent,
        DragListenerDirective,
        SplitterComponent
    ],
    exports: [
        DockingLayoutContainerComponent,
        DockingLayoutItemComponent,
        DockingLayoutComponent,
        RowOrColumnComponent,
        StackComponent,
        ItemContainerComponent,
        RootComponent,
        GlComponent,
        TabComponent,
        DropTargetIndicatorComponent,
        TabDropPlaceholderComponent,
        DragListenerDirective,
        SplitterComponent
    ],
    providers: [
        DockingLayoutService,
        ComponentRegistry,
        dockingLayoutReducerProvider
    ]
})
export class DgpDockingLayoutModule {
}
