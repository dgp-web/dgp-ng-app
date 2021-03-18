import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from "@angular/core";
import { ComponentConfiguration } from "../../custom-goldenlayout/types";
import { createGuid } from "dgp-ng-app";

@Component({
    selector: "dgp-docking-layout-container",
    template: "<ng-content></ng-content>",
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DockingLayoutContainerComponent {

    @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

    closable = false;
    //  @Input() closable = false;
    @Input() label: string;
    @Input() id = createGuid();
    @Input() width: number;
    @Input() height: number;

    get configuration(): ComponentConfiguration {

        return {
            type: "component",

            width: this.width,
            height: this.height,
            isClosable: this.closable,
            componentName: this.id,
            title: this.label,
            id: this.id,
            componentState: {
                template: () => this.templateRef
            },
            reorderEnabled: true
        };

    }
}
