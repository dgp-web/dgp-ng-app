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
export class DgpDropzoneDirectiveBase<TModel> implements OnInit, OnChanges, AfterViewInit, OnDestroy, Mutable<WithDragContext> {

    protected readonly dragContext$ = new BehaviorSubject<string>(null);

    readonly isModelDragged$ = this.dragContext$.pipe(
        switchMap(dragContext => this.dragAndDropService.isModelDragged$({dragContext})),
        tap(isModelDragged => this.toggleDropIndicator(isModelDragged)),
        shareReplay(1)
    );

    private subscription: Subscription;

    @HostBinding("class.dgp-drag-over")
    dragover = false;

    @HostBinding("class.dgp-show-drop-indicator")
    showDropIndicator = false;

    @Input()
    dragContext: string;

    @Output()
    readonly modelDropped = new EventEmitter<TModel>();

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

    private readonly onDragOver = (e: DragEvent) => {
        e.preventDefault();
    };

    private readonly onDragStart = (e: DragEvent) => {
        const modelDragInfo = this.parseDragEvent(e);
        if (!modelDragInfo) return;

        this.dragAndDropService.registerDragStart(modelDragInfo);
    };

    private readonly onDragEnd = (e: DragEvent) => {
        e.preventDefault();

        if (!this.dragAndDropService.isContextDragged({dragContext: this.dragContext})) return;

        this.dragAndDropService.registerDragEnd();
    };

    private readonly onDragEnter = (e: DragEvent) => {
        e.preventDefault();

        if (!this.dragAndDropService.isContextDragged({dragContext: this.dragContext})) return;

        this.activateDragOverEffect();
    };

    private readonly onDragLeave = (e: DragEvent) => {
        e.preventDefault();

        if (!this.dragAndDropService.isContextDragged({dragContext: this.dragContext})) return;

        const htmlElement = this.elementRef.nativeElement as HTMLElement;

        const targetIsSelf = htmlElement === e.target;
        const relatedTargetIsChildNodeOfSelf = htmlElement.contains(e.relatedTarget as Node);

        if (targetIsSelf && relatedTargetIsChildNodeOfSelf) return;

        const targetIsChildNodeOfSelf = htmlElement.contains(e.target as Node);
        const relatedTargetIsSelf = htmlElement === e.relatedTarget;

        if (targetIsChildNodeOfSelf && relatedTargetIsSelf) return;

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
        if (!stringifiedData) return null;
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

    private toggleDropIndicator(isModelDragged: boolean) {
        this.showDropIndicator = isModelDragged;
        this.cd.markForCheck();
    }

}
