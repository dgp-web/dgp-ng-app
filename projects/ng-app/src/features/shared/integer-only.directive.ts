import { Directive, HostListener } from "@angular/core";

@Directive({
    selector: "[appIntegerOnly]",
    standalone: true
})
export class IntegerOnlyDirective {

    // 1. Blocks keyboard decimals
    @HostListener("keydown", ["$event"])
    onKeyDown(event: KeyboardEvent) {
        if ([".", ",", "e", "E"].includes(event.key)) {
            event.preventDefault();
        }
    }

    // 2. Blocks clipboard decimals
    @HostListener("paste", ["$event"])
    onPaste(event: ClipboardEvent) {
        const clipboardData = event.clipboardData;
        const pastedText = clipboardData?.getData("text") || "";

        // If the pasted text contains a decimal, comma, or scientific 'e', block it
        // Use /^-?\d+$/ if you want to allow negative integers
        const integerRegex = /^\d+$/;

        if (!integerRegex.test(pastedText)) {
            event.preventDefault();
        }
    }
}
