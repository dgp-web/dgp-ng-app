import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from "@angular/core";
import { ComponentConfiguration } from "../../custom-goldenlayout/types";
import { createGuid } from "dgp-ng-app";

@Component({
    selector: "gl-container",
    template: "<ng-content></ng-content>",
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DockingLayoutContainerComponent {

    @ContentChild(TemplateRef) template: TemplateRef<any>;

    @Input() closable = true;
    @Input() title: string;
    @Input() componentName = createGuid();
    @Input() width: number;
    @Input() height: number;

    get configuration(): ComponentConfiguration {

        return {
            type: "component",

            width: this.width,
            height: this.height,
            isClosable: this.closable,
            componentName: this.componentName,
            title: this.title,
            id: createGuid(),
            componentState: {
                template: () => this.template
            }
        };

    }
}
