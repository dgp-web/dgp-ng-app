import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output
} from "@angular/core";
import { ComponentConfiguration, itemDefaultConfig } from "../types";
import type { DragProxy } from "./drag-and-drop/drag-proxy.component";
import type { WithDragParent } from "../models/with-drag-parent.model";
import { observeAttribute$ } from "dgp-ng-app";

@Component({
    selector: "dgp-gl-component",
    template: `
        <dgp-item-container [model]="config"
                            [isHidden]="isHidden"></dgp-item-container>
    `,
    styles: [`
        :host {
            overflow: auto;
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            height: 100%;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlComponent implements WithDragParent, OnInit, AfterViewInit {

    readonly element = $(this.elementRef.nativeElement);

    isComponent = true;

    @Input()
    isHidden = true;
    readonly isHidden$ = observeAttribute$(this as GlComponent, "isHidden");

    @Input()
    config: ComponentConfiguration;

    parent: DragProxy;

    @Output()
    readonly dragStart = new EventEmitter<void>();

    constructor(
        private readonly elementRef: ElementRef<HTMLElement>,
        private readonly cd: ChangeDetectorRef
    ) {
    }

    startDragging() {
        this.dragStart.emit();
    }

    ngOnInit(): void {
        this.config = {...itemDefaultConfig, ...this.config};
    }

    ngAfterViewInit(): void {
        this.isHidden$.subscribe(hidden => {
            if (hidden) {
                this.hide();
            } else {
                this.show();
            }
        });
    }

    hide() {
        this.isHidden = true;
        this.cd.markForCheck();
        this.element.hide();
    }

    show() {
        this.isHidden = false;
        this.cd.markForCheck();
        this.element.show();
    }

    destroy() {
        this.element.remove();
    }

    setDragParent(parent: DragProxy) {
        this.parent = parent;
    }


}
