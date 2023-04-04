import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit } from "@angular/core";
import { DgpView } from "dgp-ng-app";
import { PARENT_ITEM_COMPONENT, StackConfiguration } from "../../types";
import { DockingLayoutService } from "../../docking-layout.service";
import { GlComponent } from "../component.component";
import { StackComponent } from "./stack.component";

@Component({
    selector: "dgp-gl-stack-body",
    template: ``,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackBodyComponent extends DgpView<StackConfiguration> implements OnInit {

    contentItems: GlComponent[] = [];

    constructor(
        private readonly dockingLayoutService: DockingLayoutService,
        private readonly elementRef: ElementRef<HTMLElement>,
        @Inject(PARENT_ITEM_COMPONENT)
        public parent: StackComponent,
    ) {
        super();
    }

    ngOnInit(): void {
        if (this.model?.content) this.createContentItems();
    }

    private createContentItems() {
        this.contentItems = this.model?.content.map(x => this.dockingLayoutService.createContentItem(x, this.parent));
    }

}
