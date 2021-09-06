import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges
} from "@angular/core";
import { Mutable } from "data-modeling";
import { WithDragContext } from "../../models";
import { ModelDragInfo } from "../../models/model-drag-info.model";
import { DgpDragAndDropService } from "../../data/services/drag-and-drop.service";
import { BehaviorSubject, Subscription } from "rxjs";
import { shareReplay, switchMap, tap } from "rxjs/operators";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class DgpDropzoneBase<TModel> implements OnInit, OnChanges, AfterViewInit, OnDestroy, Mutable<WithDragContext> {

    @HostBinding("class.dgp-drag-over")
    dragover = false;

    @HostBinding("class.dgp-show-drop-indicator")
    showDropIndicator = false;

    protected readonly dragContext$ = new BehaviorSubject<string>(null);

    readonly isModelDragged$ = this.dragContext$.pipe(
        switchMap(dragContext => this.dragAndDropService.isModelDragged$({dragContext})),
        tap(isModelDragged => this.toggleDropIndicator(isModelDragged)),
        shareReplay(1)
    );

    @Input()
    dragContext: string;

    @Output()
    readonly modelDropped = new EventEmitter<TModel>();

    private subscription: Subscription;

    constructor(
        private readonly elementRef: ElementRef,
        private readonly cd: ChangeDetectorRef,
        private readonly dragAndDropService: DgpDragAndDropService
    ) {
    }

    ngOnInit(): void {
        this.subscription = this.isModelDragged$.subscribe();
    }

    ngAfterViewInit(): void {
        this.elementRef.nativeElement.addEventListener("dragstart", this.onDragStart);
        this.elementRef.nativeElement.addEventListener("dragend", this.onDragEnd);
        this.elementRef.nativeElement.addEventListener("dragenter", this.onDragEnter);
        this.elementRef.nativeElement.addEventListener("dragleave", this.onDragLeave);
        this.elementRef.nativeElement.addEventListener("dragover", this.onDragOver);
        this.elementRef.nativeElement.addEventListener("drop", this.drop);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.dragContext) {
            this.dragContext$.next(this.dragContext);
        }
    }

    ngOnDestroy(): void {
        if (this.subscription && !this.subscription.closed) this.subscription.unsubscribe();
    }

    readonly onDragOver = (e: DragEvent) => {
        e.preventDefault();
    };

    readonly onDragStart = (e: DragEvent) => {
        const modelDragInfo = this.parseDragEvent(e);
        if (!modelDragInfo) return;

        this.dragAndDropService.registerDragStart(modelDragInfo);
    };

    readonly onDragEnd = (e: DragEvent) => {
        e.preventDefault();

        const modelDragInfo = this.parseDragEvent(e);
        if (!modelDragInfo) return;

        this.dragAndDropService.registerDragEnd();
    };

    readonly onDragEnter = (e: DragEvent) => {
        e.preventDefault();

        const modelDragInfo = this.parseDragEvent(e);
        if (!modelDragInfo) return;

        this.activateDragOverEffect();
    };

    readonly onDragLeave = (e) => {
        e.preventDefault();

        const modelDragInfo = this.parseDragEvent(e);
        if (!modelDragInfo) return;

        this.deactivateDragOverEffect();
    };

    readonly drop = (e: DragEvent) => {
        e.stopPropagation();
        e.preventDefault();

        const modelDragInfo = this.parseDragEvent(e);
        if (!modelDragInfo) return;

        this.modelDropped.emit(modelDragInfo.model);
        this.deactivateDragOverEffect();
    };


    private parseDragEvent(e: DragEvent): ModelDragInfo<TModel> {
        const stringifiedData = e.dataTransfer.getData("text/plain");
        const modelDragInfo = JSON.parse(stringifiedData) as ModelDragInfo<TModel>;

        if (modelDragInfo?.dragContext !== this.dragContext) return null;

        return modelDragInfo;
    }

    private activateDragOverEffect() {
        this.dragover = true;
        this.cd.markForCheck();
    }

    private deactivateDragOverEffect() {
        this.dragover = false;
        this.cd.markForCheck();
    }

    toggleDropIndicator(isModelDragged: boolean) {
        this.showDropIndicator = isModelDragged;
        this.cd.markForCheck();
    }

}
