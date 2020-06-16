import { createAction, props } from "@ngrx/store";
import { DockingLayoutConfig } from "./models";

export const createDockingLayout = createAction("[DockingLayout] Create",
    props<{ readonly config: DockingLayoutConfig; }>()
);
