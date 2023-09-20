import { Directive, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { DgpDisabledBase } from "../../utils/dgp-disabled-base.directive";
import { ActionShortcutConfig, SHORTCUT_CONFIG, ShortcutConfig } from "../models";

@Directive({selector: "[dgpActionShortcut]"})
export class DgpActionShortcutDirective extends DgpDisabledBase implements OnInit, OnDestroy, ActionShortcutConfig {

    /**
     * The regular disabled input can be used as proxy
     * for disabled inputs
     *
     * Only disabling the shortcut is  available via
     * this input
     */
    @Input()
    isShortcutDisabled = false;

    @Input()
    shortcutKey: string;

    @Input()
    requireAlt = this.config.action.requireAlt;

    @Input()
    requireCtrl = this.config.action.requireCtrl;

    @Input()
    requireShift = this.config.action.requireShift;

    @Input()
    triggerEvent = this.config.action.triggerEvent;

    @Output()
    readonly shortcutTriggered = new EventEmitter();

    constructor(
        private readonly elRef: ElementRef<HTMLElement>,
        @Inject(SHORTCUT_CONFIG)
        private readonly config: ShortcutConfig
    ) {
        super();
    }

    ngOnInit(): void {
        window.addEventListener("keydown", this.onKeyDown);
    }

    ngOnDestroy(): void {
        window.removeEventListener("keydown", this.onKeyDown);
    }

    private onKeyDown = (event: KeyboardEvent) => {
        if (this.disabled || this.isShortcutDisabled) return;
        if (!this.shortcutKey) return;

        if (this.requireAlt && !event.altKey) return;
        if (this.requireCtrl && !event.ctrlKey) return;
        if (this.requireShift && !event.shiftKey) return;

        if (event.key !== this.shortcutKey) return;

        if (this.triggerEvent === "click") {
            this.elRef.nativeElement.click();
        }
        this.shortcutTriggered.emit();
    };

}
