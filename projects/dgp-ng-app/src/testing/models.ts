import { Action } from "@ngrx/store";

export type ActionSpy<T extends string = string> = jasmine.Spy<(action: Action<T>) => void>;
