import { Action } from "@ngrx/store";

export type BroadcastInitialStateActionRule<TAppState> = (state: TAppState) => Action;
