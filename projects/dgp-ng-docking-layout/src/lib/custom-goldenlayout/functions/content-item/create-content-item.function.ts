import { ItemConfiguration } from "../../types";
import { AbstractContentItemComponent } from "../../components/abstract-content-item.component";
import { shouldWrapInStack } from "../should-wrap-in-stack.function";
import { wrapInStack } from "../wrap-in-stack.function";
import { typeToComponentMap } from "../../constants/type-to-component-map.constant";

export function createContentItem(itemConfig: ItemConfiguration, parentItem: AbstractContentItemComponent): AbstractContentItemComponent {

    if (shouldWrapInStack({itemConfig, parentItem})) itemConfig = wrapInStack(itemConfig);

    // TODO: Replace this with component factory
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.typeToComponentMap[config.type]);
    // const foo = this.componentFactoryResolver.resolveComponentFactory();


    return new typeToComponentMap[itemConfig.type](this, itemConfig, parentItem);
}
