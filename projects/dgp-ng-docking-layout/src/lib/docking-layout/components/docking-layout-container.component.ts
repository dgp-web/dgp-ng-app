import { Component, ChangeDetectionStrategy, Input, TemplateRef, ContentChild } from "@angular/core";
import { ComponentConfiguration } from "@dgp/ng-bootstrap-ui";
import { guid } from "@dgp/ngrx-entity-store";

@Component({
    selector: "gl-container",
    template: "<ng-content></ng-content>",
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DockingLayoutContainerComponent {

    @ContentChild(TemplateRef) template: TemplateRef<any>;

    @Input() closable = true;
    @Input() title: string;
    @Input() componentName = guid();
    @Input() width: number;
    @Input() height: number;

    get configuration(): ComponentConfiguration {

        const configuration: ComponentConfiguration = {
            type: "component",

            width: this.width,
            height: this.height,
            isClosable: this.closable,
            componentName: this.componentName,
            title: this.title,
            id: guid(),
            componentState: {
                template: () => this.template
            }
        };

        return configuration;

    }
}
