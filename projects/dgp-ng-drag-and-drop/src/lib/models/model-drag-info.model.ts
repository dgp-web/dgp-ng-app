import { WithDragContext } from "./with-drag-context.model";

export interface ModelDragInfo<TModel> extends WithDragContext {
    readonly model: TModel;
}
