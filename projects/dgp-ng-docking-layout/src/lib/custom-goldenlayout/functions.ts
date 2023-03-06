import { AbstractContentItemComponent } from "./components/shared/abstract-content-item.component";
import { ItemContainerComponent } from "./components/grid/item-container.component";
import { StackComponent } from "./components/tabs/stack.component";

export function addChildContentItemsToContainer(container: ItemContainerComponent, node: AbstractContentItemComponent) {
    if (node.type === "stack") {
        node.contentItems.forEach(function(item) {
            container.addChild(item);
            node.removeChild(item, true);
        });
    } else {
        node.contentItems.forEach(x => this.addChildContentItemsToContainer(container, x));
    }
}

export function findAllStackContainers(rootNode: AbstractContentItemComponent) {
    const stackContainers = [];
    findAllStackContainersRecursive(stackContainers, rootNode);

    return stackContainers;
}

export function findAllStackContainersRecursive(stackContainers: Array<StackComponent>, node: AbstractContentItemComponent) {
    node.contentItems.forEach(x => {
        if (x.type === "stack") {
            stackContainers.push(x as StackComponent);
        } else if (!x.isComponent) {
            this.findAllStackContainersRecursive(stackContainers, x);
        }
    });
}
