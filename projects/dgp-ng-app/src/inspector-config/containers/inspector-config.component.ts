import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpContainer } from "../../utils/container.component-base";
import { ThemeSwitcherState } from "../../theme-switcher/models";
import { getCurrentInspectorConfig } from "../../theme-switcher/selectors";
import { updateCurrentInspectorConfig } from "../../theme-switcher/actions";
import { InspectorConfig } from "../../inspector/models";

@Component({
    selector: "dgp-inspector-config",
    template: `
        <dgp-inspector-config-form [model]="inspectorConfig$ | async"
                                   (modelChange)="updateInspectorConfig($event)"></dgp-inspector-config-form>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpInspectorConfigComponent extends DgpContainer<ThemeSwitcherState> {
    readonly inspectorConfig$ = this.select(getCurrentInspectorConfig);

    updateInspectorConfig(inspectorConfig: InspectorConfig) {
        this.dispatch(updateCurrentInspectorConfig({inspectorConfig}));
    }
}
