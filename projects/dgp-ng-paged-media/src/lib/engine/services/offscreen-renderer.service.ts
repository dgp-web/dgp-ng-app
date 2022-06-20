import { ApplicationRef, ComponentRef, ElementRef, Injectable, Renderer2, Type, ViewContainerRef } from "@angular/core";
import { isNullOrUndefined } from "dgp-ng-app";

@Injectable({
    providedIn: "root"
})
export class OffscreenRenderer<TRootComponent = any> {

    private rootComponentRef: ComponentRef<TRootComponent>;
    private viewContainerRef: ViewContainerRef;
    private renderer: Renderer2;

    constructor(
        private readonly appRef: ApplicationRef
    ) {
    }

    createComponent<C>(componentType: Type<C>): ComponentRef<C> {
        const componentRef = this.getViewContainerRef()
            .createComponent(componentType);

        const renderer = this.getRenderer();
        renderer.addClass(componentRef.injector.get(ElementRef).nativeElement, "dgp-hide-in-print");

        return componentRef;
    }

    getRenderer(): Renderer2 {

        if (isNullOrUndefined(this.renderer)) {
            const rootComponentRef = this.getRootComponentRef();
            this.renderer = rootComponentRef.injector.get(Renderer2);
        }

        return this.renderer;
    }

    private getRootComponentRef(): ComponentRef<TRootComponent> {

        if (isNullOrUndefined(this.rootComponentRef)) {
            this.rootComponentRef = this.appRef.components[0] as ComponentRef<TRootComponent>;
        }

        return this.rootComponentRef;
    }

    private getViewContainerRef() {

        if (isNullOrUndefined(this.viewContainerRef)) {
            const rootComponentRef = this.getRootComponentRef();
            this.viewContainerRef = rootComponentRef.injector.get(ViewContainerRef);
        }

        return this.viewContainerRef;
    }

}
