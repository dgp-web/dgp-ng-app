import { ComponentDefinition, ContainerDefinition } from "../utilities/models";

export type ComponentConstructor = <T = any>(
    container: ContainerDefinition,
    component: ComponentDefinition<T>
) => void;
