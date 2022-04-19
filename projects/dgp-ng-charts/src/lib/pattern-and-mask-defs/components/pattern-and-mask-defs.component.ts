import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "[dgpPatternAndMaskDefs]",
    template: `
        <!-- Patterns -->
        <svg:pattern xmlns:svg="http://www.w3.org/2000/svg"
                     dgpHorizontalLinesPattern></svg:pattern>
        <svg:pattern xmlns:svg="http://www.w3.org/2000/svg"
                     dgpVerticalLinesPattern></svg:pattern>
        <svg:pattern xmlns:svg="http://www.w3.org/2000/svg"
                     dgpLinesFromLeftTopToRightBottomPattern></svg:pattern>
        <svg:pattern xmlns:svg="http://www.w3.org/2000/svg"
                     dgpLinesFromLeftBottomToRightTopPattern></svg:pattern>
        <svg:pattern xmlns:svg="http://www.w3.org/2000/svg"
                     dgpCheckerboardPattern></svg:pattern>
        <svg:pattern xmlns:svg="http://www.w3.org/2000/svg"
                     dgpDiagonalCheckerboardPattern></svg:pattern>

        <!-- Masks -->
        <svg:mask xmlns:svg="http://www.w3.org/2000/svg"
                  dgpVerticalLinesMask></svg:mask>
        <svg:mask xmlns:svg="http://www.w3.org/2000/svg"
                  dgpHorizontalLinesMask></svg:mask>
        <svg:mask xmlns:svg="http://www.w3.org/2000/svg"
                  dgpLinesFromLeftTopToRightBottomMask></svg:mask>
        <svg:mask xmlns:svg="http://www.w3.org/2000/svg"
                  dgpLinesFromLeftBottomToRightTopMask></svg:mask>
        <svg:mask xmlns:svg="http://www.w3.org/2000/svg"
                  dgpGridMask></svg:mask>
        <svg:mask xmlns:svg="http://www.w3.org/2000/svg"
                  dgpDiagonalGridMask></svg:mask>
        <svg:mask xmlns:svg="http://www.w3.org/2000/svg"
                  dgpCheckerboardMask></svg:mask>
        <svg:mask xmlns:svg="http://www.w3.org/2000/svg"
                  dgpDiagonalCheckerboardMask></svg:mask>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DgpPatternAndMaskDefsComponent {

}
