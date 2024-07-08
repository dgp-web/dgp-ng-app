import { EventEmitter } from "../utilities";
import { ObjectTree } from "../models/object-tree.model";

export class DockingLayoutEngineObject extends EventEmitter implements ObjectTree {

    contentItems = [];

    callLifecycleHookDownwards(functionName: string,
                               functionArguments?: any[]) {
        this[functionName].apply(this, functionArguments || []);

        for (let i = 0; i < this.contentItems.length; i++) {
            if (this.contentItems[i].callLifecycleHookDownwards) {
                this.contentItems[i].callLifecycleHookDownwards(functionName, functionArguments);
            }
        }
    }

    callLifecycleHookUpwards(functionName: string,
                             functionArguments?: any[],) {

        for (let i = 0; i < this.contentItems.length; i++) {
            if (this.contentItems[i].callLifecycleHookUpwards) {
                this.contentItems[i].callLifecycleHookUpwards(functionName, functionArguments);
            }
        }
    }

}
