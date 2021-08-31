import { Action } from "@ngrx/store";
import { BroadcastConfig } from "../models";
import { compositeActionTypePrefix } from "../actions";
import { CompositeEntityAction } from "entity-store";

export function tryTrimSelectionFromCompositeEntityAction(action: Action,
                                                          config: BroadcastConfig): any {

    if (action.type.startsWith(compositeActionTypePrefix)) {

        const typedAction = action as CompositeEntityAction<any, any>;

        if (config.syncSelection) {
            /**
             * Synchronize everything but the selection
             * which the client has to manage itself
             */
            return new CompositeEntityAction({
                add: typedAction.payload.add,
                clear: typedAction.payload.clear,
                remove: typedAction.payload.remove,
                set: typedAction.payload.set,
                update: typedAction.payload.update,
                select: typedAction.payload.select
            });
        } else {
            /**
             * Synchronize everything but the selection
             * which the client has to manage itself
             */
            return new CompositeEntityAction({
                add: typedAction.payload.add,
                clear: typedAction.payload.clear,
                remove: typedAction.payload.remove,
                set: typedAction.payload.set,
                update: typedAction.payload.update
            });
        }


    } else {
        return action;
    }

}
