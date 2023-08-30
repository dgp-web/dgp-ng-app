import { ChangeDetectionStrategy, Component, ContentChild, Directive, Input, TemplateRef } from "@angular/core";
import { ComponentConfiguration } from "../../custom-goldenlayout/types";
import { createGuid } from "dgp-ng-app";


@Directive({selector: "[dgpDockingLayoutContainerLabel], [dgp-docking-layout-container-label]"})
export class DgpDockingLayoutContainerLabelDirective {

}


@Component({
    selector: "dgp-docking-layout-container",
    template: "<ng-content></ng-content>",
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DockingLayoutContainerComponent {

    @ContentChild(TemplateRef) templateRef: TemplateRef<any>;
    @ContentChild(DgpDockingLayoutContainerLabelDirective, {
        read: TemplateRef
    }) labelTemplateRef: TemplateRef<any>;

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
                template: () => this.templateRef,
                labelTemplate: this.labelTemplateRef ? () => this.labelTemplateRef : undefined
            }
        };

    }
}
