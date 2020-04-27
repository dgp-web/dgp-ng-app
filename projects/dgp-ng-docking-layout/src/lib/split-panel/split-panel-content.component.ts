import { ChangeDetectionStrategy, Component, ContentChild, TemplateRef } from "@angular/core";
import { createGuid } from "dgp-ng-app";
import { ComponentConfiguration } from "../custom-goldenlayout/types";

@Component({
    selector: "dgp-split-panel-content",
    template: "<ng-content></ng-content>",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplitPanelContentComponent {

    @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

    readonly id = createGuid();

    get configuration(): ComponentConfiguration {

        return {
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
