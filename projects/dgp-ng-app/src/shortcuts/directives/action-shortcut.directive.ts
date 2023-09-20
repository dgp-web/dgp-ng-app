import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { DgpDisabledBase } from "../../utils/dgp-disabled-base.directive";

@Directive({selector: "[dgpActionShortcut]"})
export class DgpActionShortcutDirective extends DgpDisabledBase implements OnInit, OnDestroy {

    /**
     * The regular disabled input can be used as proxy
     * for disabled inputs
     *
     * Only disabling the shortcut is  available via
     * this input
     */
    @Input()
    isShortCutDisabled = false;

    @Input()
    shortcutKey: string;

    @Input()
    requireAlt = true;

    @Input()
    requireCtrl = true;

    @Input()
    requireShift = false;

    @Output()
    readonly shortcutTriggered = new EventEmitter();

    constructor(
        private readonly elRef: ElementRef<HTMLElement>
    ) {
    }

    ngOnInit(): void {
        window.addEventListener("keydown", this.onKeyDown);
    }

    ngOnDestroy(): void {
        window.removeEventListener("keydown", this.onKeyDown);
    }

    private onKeyDown = (event: KeyboardEvent) => {
        if (this.disabled || this.isShortCutDisabled) return;
        if (!this.shortcutKey) return;

        if (this.requireAlt && !event.altKey) return;
        if (this.requireCtrl && !event.ctrlKey) return;
        if (this.requireShift && !event.shiftKey) return;

        if (event.key !== this.shortcutKey) return;

        this.elRef.nativeElement.click();
        this.shortcutTriggered.emit();
    };

}
