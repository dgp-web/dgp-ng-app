import { Directive } from "@angular/core";
import { diagonalCheckerboardPattern } from "../constants";
import { CheckerboardPatternDirective } from "./checkerboard-pattern.directive";

@Directive({selector: "[dgpDiagonalCheckerboardPattern]"})
export class DiagonalCheckerboardPatternDirective extends CheckerboardPatternDirective {

    model = diagonalCheckerboardPattern;

    render(): void {
        super.render();
        this.renderer.setAttribute(this.elementRef.nativeElement, "patternTransform", "rotate(45)");

    }


}
