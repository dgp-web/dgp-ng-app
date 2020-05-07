import { DockingLayoutViewModels, HeaderButtonViewModel, ViewMap } from "./models";

export const dockingLayoutViewMap: ViewMap<DockingLayoutViewModels> = {
    dragHandle: {
        render() {
            return `
                <div class="lm_drag_handle"></div>
            `;
        }
    },
    dragProxy: {
        render() {
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
                    <div class="lm_content"></div>
                </div>
            `;
        }
    },
    dropTargetIndicator: {
        render() {
            return `
                <div class="lm_dropTargetIndicator"><div class="lm_inner"></div></div>
            `;
        }
    },
    header: {
        render() {
            return `
               <div class="lm_header card-header">
                    <ul class="lm_tabs card-header-tabs nav nav-tabs"></ul>
                    <ul class="lm_controls"></ul>
                    <ul class="lm_tabdropdown_list"></ul>
               </div>
            `;
        }
    },
    headerButton: {
        render(model: HeaderButtonViewModel) {
            return `
               <li class="${model.cssClass}" title="${model.label}"></li>
            `;
        }
    },
    itemContainer: {
        render() {
            return `
                <div class="lm_item_container">
                    <div class="lm_content"></div>
                </div>
            `;
        }
    },
    root: {
        render() {
            return `
                <div class="lm_goldenlayout lm_item lm_root"></div>
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
    splitter: {
        render() {
            return `
                <div class="lm_splitter"></div>
            `;
        }
    },
    stack: {
        render() {
            return `
                <div class="lm_item lm_stack card"></div>
            `;
        }
    },
    stackContent: {
        render() {
            return `
                <div class="lm_items card-body" style="padding: 0;"></div>
            `;
        }
    },
    tab: {
        render() {
            return `
                <li class="lm_tab nav-item">
                    <a class="lm_title nav-link">
                    <button type="button"
                            class="close"
                            aria-label="Close"
                            style="cursor:pointer;margin-left:16px;">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </a>
                </li>
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
