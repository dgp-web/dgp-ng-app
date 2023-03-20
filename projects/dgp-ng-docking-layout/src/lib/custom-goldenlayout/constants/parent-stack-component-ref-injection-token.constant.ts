import { InjectionToken } from "@angular/core";
import { StackComponent } from "../components/tabs/stack.component";

export const PARENT_STACK_COMPONENT_REF = new InjectionToken<StackComponent>("parentStackComponentRef");
