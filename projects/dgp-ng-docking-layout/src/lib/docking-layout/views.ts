import { DockingLayoutViewModels, ViewMap } from "./models";

export const dockingLayoutViewMap: ViewMap<DockingLayoutViewModels> = {
    dropTargetIndicator: {
        render(): string {
            return `
                <div class="lm_dropTargetIndicator"><div class="lm_inner"></div></div>
            `;
        }
    }
};
