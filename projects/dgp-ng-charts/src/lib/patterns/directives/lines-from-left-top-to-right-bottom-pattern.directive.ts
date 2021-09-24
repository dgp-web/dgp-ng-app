import { Directive } from "@angular/core";
import { linesFromLeftTopToRightBottomPattern } from "../constants";
import { VerticalLinesPatternDirective } from "./vertical-lines-pattern.directive";

@Directive({selector: "[dgpLinesFromLeftTopToRightBottomPattern]"})
export class LinesFromLeftTopToRightBottomPatternDirective extends VerticalLinesPatternDirective {

    model = linesFromLeftTopToRightBottomPattern;

    render(): void {
        super.render();

        this.renderer.setAttribute(this.elementRef.nativeElement, "patternTransform", "rotate(135 0 0)");
    }

}
