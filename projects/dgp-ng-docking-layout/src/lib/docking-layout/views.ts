import { DockingLayoutViewModels } from "./models";

export const dockingLayoutViewMap = {
    dragProxy: {
        render(model: {
            readonly draggedItem: HTMLElement
        }) {
            return `
                <div class="lm_dragProxy">
                    <div class="lm_header card-header"
                         style="height: auto !important;">
                        <ul class="lm_tabs card-header-tabs nav nav-tabs">
                            <li class="lm_tab lm_active"><i class="lm_left"></i>
                                <a class="lm_title"></a>
                                <i class="lm_right"></i></li>
                        </ul>
                    </div>
                    <div class="lm_content">${model.draggedItem.innerHTML}</div>
                </div>
            `;
        }
    },
    rowOrColumn: {
        render(model?: DockingLayoutViewModels["rowOrColumn"]) {
            return `
                <div class="lm_item lm_${model.isColumn ? "column" : "row"}"></div>
            `;
        }
    },
    tabDropPlaceholder: {
        render() {
            return `
                <div class="lm_drop_tab_placeholder"></div>
            `;
        }
    }
};
