import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from "@angular/core";
import { createGuid } from "dgp-ng-app";
import { ComponentConfiguration } from "../custom-goldenlayout/types";
import { SplitPanelContentConfig } from "./models";

export const defaultSplitPanelContentConfig: SplitPanelContentConfig = {
    size: null
};

@Component({
    selector: "dgp-split-panel-content",
    template: "<ng-content></ng-content>",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplitPanelContentComponent implements SplitPanelContentConfig {

    @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

    readonly id = createGuid();

    @Input()
    size = defaultSplitPanelContentConfig.size;

    get configuration(): ComponentConfiguration {

        return {
            width: this.size,
            height: this.size,

            type: "component",

            isClosable: false,
            componentName: this.id,
            id: this.id,
            componentState: {
                template: () => this.templateRef
            }
        };

    }

}
