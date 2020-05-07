import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from "@angular/core";
import { createGuid } from "dgp-ng-app";
import { ComponentConfiguration } from "../custom-goldenlayout/types";
import { SplitPanelContentConfig } from "./models";

export const defaultSplitPanelContentConfig: SplitPanelContentConfig = {
    height: null,
    width: null
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
    width = defaultSplitPanelContentConfig.width;

    @Input()
    height = defaultSplitPanelContentConfig.height;

    get configuration(): ComponentConfiguration {

        return {
            width: this.width,
            height: this.height,

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
