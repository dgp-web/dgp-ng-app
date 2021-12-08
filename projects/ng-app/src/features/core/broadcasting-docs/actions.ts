import { createAction, props } from "@ngrx/store";
import { User } from "../../../store";

export const updateUser = createAction("[DocsApp] UpdateUser", props<{ readonly user: User }>());

