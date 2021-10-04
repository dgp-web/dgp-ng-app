import { Directive } from "@angular/core";
import { SVGSymbolBaseDirective } from "./svg-symbol.base-directive";

@Directive({
    selector: "[dgpCircle]",
})
export class CircleDirective extends SVGSymbolBaseDirective {

    setAttributes(): void {
        const size = this.width / 2;
        this.renderer.setAttribute(this.elementRef.nativeElement, "cx", size.toString());
        this.renderer.setAttribute(this.elementRef.nativeElement, "cy", size.toString());
        this.renderer.setAttribute(this.elementRef.nativeElement, "r", size.toString());
    }

}
