import { Directive } from "@angular/core";
import { linesFromLeftBottomToRightTopPattern } from "../constants";
import { VerticalLinesPatternDirective } from "./vertical-lines-pattern.directive";

@Directive({selector: "[dgpLinesFromLeftBottomToRightTopPattern]"})
export class LinesFromLeftBottomToRightTopPatternDirective extends VerticalLinesPatternDirective {

    model = linesFromLeftBottomToRightTopPattern;

    render(): void {
        super.render();

        this.renderer.setAttribute(this.elementRef.nativeElement, "patternTransform", "rotate(45 0 0)");
    }

}
