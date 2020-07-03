import { createAction, props, createFeatureSelector, createSelector, select, Store, createReducer, on, StoreModule, StateObservable, ActionsSubject, ReducerManager } from '@ngrx/store';
import { __awaiter, __decorate, __param } from 'tslib';
import { first, tap, switchMap, catchError, defaultIfEmpty, map, bufferTime, filter, distinctUntilChanged, debounceTime, take, concatMap, distinctUntilKeyChanged } from 'rxjs/operators';
import { Router, RouterModule, ActivatedRoute, ActivationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Injectable, APP_INITIALIZER, InjectionToken, NgModule, Inject, Input, Component, ChangeDetectionStrategy, Directive, EventEmitter, Output, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef, Pipe, ElementRef, ContentChild, TemplateRef, ViewChild, ViewEncapsulation, Renderer2 } from '@angular/core';
import { isNullOrUndefined as isNullOrUndefined$1, isDate } from 'util';
import { from, forkJoin, empty, fromEventPattern, interval, of, fromEvent, timer, BehaviorSubject } from 'rxjs';
import { ofType, Actions, Effect, EffectsModule } from '@ngrx/effects';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { uniqBy, isEqual, minBy } from 'lodash';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Platform, PlatformModule } from '@angular/cdk/platform';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';
import { getAll, getFirstSelected, createEntityStore, createKVSFromArray, composeEntityActions } from 'entity-store';
import { MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Breakpoints, BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { createNewHosts, removeNgStyles } from '@angularclass/hmr';
import { MatDividerModule } from '@angular/material/divider';
import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@ngrx/store';
import * as ɵngcc2 from '@angular/router';
import * as ɵngcc3 from '@ngrx/effects';
import * as ɵngcc4 from '@angular/common';
import * as ɵngcc5 from '@angular/material/icon';
import * as ɵngcc6 from '@angular/cdk/platform';
import * as ɵngcc7 from '@angular/material/list';
import * as ɵngcc8 from '@angular/material/tooltip';
import * as ɵngcc9 from '@angular/material/core';
import * as ɵngcc10 from '@angular/material/button';
import * as ɵngcc11 from '@angular/material/menu';
import * as ɵngcc12 from '@angular/platform-browser';
import * as ɵngcc13 from '@angular/material/dialog';
import * as ɵngcc14 from '@angular/material/toolbar';
import * as ɵngcc15 from '@angular/material/progress-bar';
import * as ɵngcc16 from '@angular/material/sidenav';
import * as ɵngcc17 from '@angular/cdk/layout';
import * as ɵngcc18 from '@angular/material/divider';
import * as ɵngcc19 from '@angular/material/snack-bar';
import * as ɵngcc20 from '@angular/material/slide-toggle';
import * as ɵngcc21 from '@angular/forms';
import * as ɵngcc22 from '@angular/cdk/overlay';
import * as ɵngcc23 from '@angular/material/card';
import * as ɵngcc24 from '@angular/cdk/scrolling';

function EmptyStateComponent_dgp_empty_state_icon_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "dgp-empty-state-icon");
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate1(" ", ctx_r0.matIconName, " ");
} }
const _c0 = ["*"];
function FallbackFileViewerComponent_a_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "a", 3);
    ɵngcc0.ɵɵpipe(1, "safe");
    ɵngcc0.ɵɵtext(2, " Download it here ");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("href", ɵngcc0.ɵɵpipeBind2(1, 1, ctx_r1.fileItem.url, "url"), ɵngcc0.ɵɵsanitizeUrl);
} }
function FallbackFileViewerComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    const _r5 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "a", 4);
    ɵngcc0.ɵɵlistener("click", function FallbackFileViewerComponent_ng_template_2_Template_a_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r5); const ctx_r4 = ɵngcc0.ɵɵnextContext(); return ctx_r4.downloadFileInTridentOrEdge(); });
    ɵngcc0.ɵɵtext(1, " Download it here ");
    ɵngcc0.ɵɵelementEnd();
} }
const _c1 = function () { return []; };
const _c2 = function (a0) { return { fileItemId: a0 }; };
function FileItemListComponent_ng_container_1_a_3_Template(rf, ctx) { if (rf & 1) {
    const _r12 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "a", 4);
    ɵngcc0.ɵɵlistener("keydown.delete", function FileItemListComponent_ng_container_1_a_3_Template_a_keydown_delete_0_listener() { ɵngcc0.ɵɵrestoreView(_r12); const fileItemId_r9 = ctx.$implicit; const ctx_r11 = ɵngcc0.ɵɵnextContext(2); return ctx_r11.removeFileItem(ctx_r11.model.fileItemKVS[fileItemId_r9]); });
    ɵngcc0.ɵɵelementStart(1, "mat-icon", 5);
    ɵngcc0.ɵɵtext(2, " insert_drive_file ");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(3, "div", 6);
    ɵngcc0.ɵɵelementStart(4, "div", 7);
    ɵngcc0.ɵɵelementStart(5, "div", 8);
    ɵngcc0.ɵɵtext(6);
    ɵngcc0.ɵɵelement(7, "dgp-spacer");
    ɵngcc0.ɵɵelementStart(8, "small");
    ɵngcc0.ɵɵtext(9);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(10, "div", 9);
    ɵngcc0.ɵɵelementStart(11, "small");
    ɵngcc0.ɵɵtext(12);
    ɵngcc0.ɵɵpipe(13, "date");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelement(14, "dgp-spacer");
    ɵngcc0.ɵɵelementStart(15, "small");
    ɵngcc0.ɵɵtext(16);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(17, "button", 10);
    ɵngcc0.ɵɵelementStart(18, "mat-icon");
    ɵngcc0.ɵɵtext(19, " more_vert ");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(20, "mat-menu", null, 11);
    ɵngcc0.ɵɵelementStart(22, "button", 12);
    ɵngcc0.ɵɵlistener("click", function FileItemListComponent_ng_container_1_a_3_Template_button_click_22_listener() { ɵngcc0.ɵɵrestoreView(_r12); const fileItemId_r9 = ctx.$implicit; const ctx_r13 = ɵngcc0.ɵɵnextContext(2); return ctx_r13.removeFileItem(ctx_r13.model.fileItemKVS[fileItemId_r9]); });
    ɵngcc0.ɵɵtext(23, "Remove ");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const fileItemId_r9 = ctx.$implicit;
    const _r10 = ɵngcc0.ɵɵreference(21);
    const ctx_r8 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("routerLink", ɵngcc0.ɵɵpureFunction0(13, _c1))("queryParams", ɵngcc0.ɵɵpureFunction1(14, _c2, ctx_r8.model.fileItemKVS[fileItemId_r9].fileItemId))("matTooltip", ctx_r8.model.fileItemKVS[fileItemId_r9].fileName);
    ɵngcc0.ɵɵadvance(6);
    ɵngcc0.ɵɵtextInterpolate1(" ", ctx_r8.model.fileItemKVS[fileItemId_r9].fileName, " ");
    ɵngcc0.ɵɵadvance(3);
    ɵngcc0.ɵɵtextInterpolate(ctx_r8.model.fileItemKVS[fileItemId_r9].extension);
    ɵngcc0.ɵɵadvance(3);
    ɵngcc0.ɵɵtextInterpolate(ɵngcc0.ɵɵpipeBind2(13, 10, ctx_r8.model.fileItemKVS[fileItemId_r9].creationDate, "hh:mm, dd MMMM yyyy"));
    ɵngcc0.ɵɵadvance(4);
    ɵngcc0.ɵɵtextInterpolate(ctx_r8.getFileItemSize(ctx_r8.model.fileItemKVS[fileItemId_r9]));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("matMenuTriggerFor", _r10)("disabled", ctx_r8.disabled);
    ɵngcc0.ɵɵadvance(5);
    ɵngcc0.ɵɵproperty("disabled", ctx_r8.disabled);
} }
function FileItemListComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵelementStart(1, "h3", 2);
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(3, FileItemListComponent_ng_container_1_a_3_Template, 24, 16, "a", 3);
    ɵngcc0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const directory_r7 = ctx.$implicit;
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(directory_r7.label);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", directory_r7.fileItemIds);
} }
function FileViewerComponent_ng_container_0_dgp_jpg_viewer_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "dgp-jpg-viewer", 5);
} if (rf & 2) {
    const ctx_r17 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("fileItem", ctx_r17.fileItem);
} }
function FileViewerComponent_ng_container_0_dgp_pdf_viewer_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "dgp-pdf-viewer", 5);
} if (rf & 2) {
    const ctx_r18 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("fileItem", ctx_r18.fileItem);
} }
function FileViewerComponent_ng_container_0_dgp_png_viewer_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "dgp-png-viewer", 5);
} if (rf & 2) {
    const ctx_r19 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("fileItem", ctx_r19.fileItem);
} }
function FileViewerComponent_ng_container_0_dgp_svg_viewer_5_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "dgp-svg-viewer", 5);
} if (rf & 2) {
    const ctx_r20 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("fileItem", ctx_r20.fileItem);
} }
function FileViewerComponent_ng_container_0_dgp_fallback_file_viewer_6_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "dgp-fallback-file-viewer", 5);
} if (rf & 2) {
    const ctx_r21 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("fileItem", ctx_r21.fileItem);
} }
function FileViewerComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵelementContainerStart(1, 2);
    ɵngcc0.ɵɵtemplate(2, FileViewerComponent_ng_container_0_dgp_jpg_viewer_2_Template, 1, 1, "dgp-jpg-viewer", 3);
    ɵngcc0.ɵɵtemplate(3, FileViewerComponent_ng_container_0_dgp_pdf_viewer_3_Template, 1, 1, "dgp-pdf-viewer", 3);
    ɵngcc0.ɵɵtemplate(4, FileViewerComponent_ng_container_0_dgp_png_viewer_4_Template, 1, 1, "dgp-png-viewer", 3);
    ɵngcc0.ɵɵtemplate(5, FileViewerComponent_ng_container_0_dgp_svg_viewer_5_Template, 1, 1, "dgp-svg-viewer", 3);
    ɵngcc0.ɵɵtemplate(6, FileViewerComponent_ng_container_0_dgp_fallback_file_viewer_6_Template, 1, 1, "dgp-fallback-file-viewer", 4);
    ɵngcc0.ɵɵelementContainerEnd();
    ɵngcc0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r14 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitch", ctx_r14.fileItem.extension);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "jpg");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "pdf");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "png");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "svg");
} }
function FileViewerComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "dgp-dynamic-file-viewer", 5);
} if (rf & 2) {
    const ctx_r16 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("fileItem", ctx_r16.fileItem);
} }
function JpgViewerComponent_img_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "img", 2);
    ɵngcc0.ɵɵpipe(1, "safe");
} if (rf & 2) {
    const ctx_r22 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵpropertyInterpolate("alt", ctx_r22.fileItem.fileName);
    ɵngcc0.ɵɵproperty("src", ɵngcc0.ɵɵpipeBind2(1, 2, ctx_r22.fileItem.url, "url"), ɵngcc0.ɵɵsanitizeUrl);
} }
function JpgViewerComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 3);
    ɵngcc0.ɵɵelement(1, "img", 4);
    ɵngcc0.ɵɵpipe(2, "safe");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r24 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵpropertyInterpolate("alt", ctx_r24.fileItem.fileName);
    ɵngcc0.ɵɵproperty("src", ɵngcc0.ɵɵpipeBind2(2, 2, ctx_r24.fileItem.url, "url"), ɵngcc0.ɵɵsanitizeUrl);
} }
function PdfViewerComponent_ng_container_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵelementStart(1, "object", 3);
    ɵngcc0.ɵɵpipe(2, "safe");
    ɵngcc0.ɵɵelement(3, "dgp-fallback-file-viewer", 4);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r28 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵattribute("data", ɵngcc0.ɵɵpipeBind2(2, 2, ctx_r28.fileItem.url, "resourceUrl"), ɵngcc0.ɵɵsanitizeResourceUrl);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("fileItem", ctx_r28.fileItem);
} }
function PdfViewerComponent_ng_container_0_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵelement(1, "div", 5);
    ɵngcc0.ɵɵpipe(2, "safe");
    ɵngcc0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r29 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("innerHTML", ɵngcc0.ɵɵpipeBind2(2, 1, ctx_r29.edgeHTML, "html"), ɵngcc0.ɵɵsanitizeHtml);
} }
function PdfViewerComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵtemplate(1, PdfViewerComponent_ng_container_0_ng_container_1_Template, 4, 5, "ng-container", 2);
    ɵngcc0.ɵɵtemplate(2, PdfViewerComponent_ng_container_0_ng_container_2_Template, 3, 4, "ng-container", 2);
    ɵngcc0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r25 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r25.platform.FIREFOX || ctx_r25.platform.BLINK);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r25.platform.EDGE);
} }
function PdfViewerComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "dgp-fallback-file-viewer", 4);
} if (rf & 2) {
    const ctx_r27 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("fileItem", ctx_r27.fileItem);
} }
function PngViewerComponent_img_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "img", 2);
    ɵngcc0.ɵɵpipe(1, "safe");
} if (rf & 2) {
    const ctx_r30 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵpropertyInterpolate("alt", ctx_r30.fileItem.fileName);
    ɵngcc0.ɵɵproperty("src", ɵngcc0.ɵɵpipeBind2(1, 2, ctx_r30.fileItem.url, "url"), ɵngcc0.ɵɵsanitizeUrl);
} }
function PngViewerComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 3);
    ɵngcc0.ɵɵelement(1, "img", 4);
    ɵngcc0.ɵɵpipe(2, "safe");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r32 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵpropertyInterpolate("alt", ctx_r32.fileItem.fileName);
    ɵngcc0.ɵɵproperty("src", ɵngcc0.ɵɵpipeBind2(2, 2, ctx_r32.fileItem.url, "url"), ɵngcc0.ɵɵsanitizeUrl);
} }
function SvgViewerComponent_img_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "img", 2);
    ɵngcc0.ɵɵpipe(1, "safe");
} if (rf & 2) {
    const ctx_r33 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵpropertyInterpolate("alt", ctx_r33.fileItem.fileName);
    ɵngcc0.ɵɵproperty("src", ɵngcc0.ɵɵpipeBind2(1, 2, ctx_r33.fileItem.url, "url"), ɵngcc0.ɵɵsanitizeUrl);
} }
function SvgViewerComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 3);
    ɵngcc0.ɵɵelement(1, "img", 4);
    ɵngcc0.ɵɵpipe(2, "safe");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r35 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵpropertyInterpolate("alt", ctx_r35.fileItem.fileName);
    ɵngcc0.ɵɵproperty("src", ɵngcc0.ɵɵpipeBind2(2, 2, ctx_r35.fileItem.url, "url"), ɵngcc0.ɵɵsanitizeUrl);
} }
function FileManagerComponent_ng_container_0_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r45 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 7);
    ɵngcc0.ɵɵlistener("click", function FileManagerComponent_ng_container_0_button_4_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r45); const ctx_r44 = ɵngcc0.ɵɵnextContext(2); return ctx_r44.maximize(); });
    ɵngcc0.ɵɵelementStart(1, "mat-icon");
    ɵngcc0.ɵɵtext(2, "crop_din");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} }
function FileManagerComponent_ng_container_0_button_5_Template(rf, ctx) { if (rf & 1) {
    const _r47 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 8);
    ɵngcc0.ɵɵlistener("click", function FileManagerComponent_ng_container_0_button_5_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r47); const ctx_r46 = ɵngcc0.ɵɵnextContext(2); return ctx_r46.minimize(); });
    ɵngcc0.ɵɵelementStart(1, "mat-icon");
    ɵngcc0.ɵɵtext(2, "filter_none");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} }
function FileManagerComponent_ng_container_0_dgp_list_details_page_9_mat_nav_list_6_Template(rf, ctx) { if (rf & 1) {
    const _r51 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "mat-nav-list");
    ɵngcc0.ɵɵelementStart(1, "a", 13);
    ɵngcc0.ɵɵlistener("click", function FileManagerComponent_ng_container_0_dgp_list_details_page_9_mat_nav_list_6_Template_a_click_1_listener() { ɵngcc0.ɵɵrestoreView(_r51); const _r49 = ɵngcc0.ɵɵreference(7); return _r49.click(); });
    ɵngcc0.ɵɵelementStart(2, "mat-icon");
    ɵngcc0.ɵɵtext(3, " open_in_new ");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(4, "div", 14);
    ɵngcc0.ɵɵtext(5, " Choose file via picker ");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(6, "input", 15, 16);
    ɵngcc0.ɵɵlistener("change", function FileManagerComponent_ng_container_0_dgp_list_details_page_9_mat_nav_list_6_Template_input_change_6_listener($event) { ɵngcc0.ɵɵrestoreView(_r51); const ctx_r52 = ɵngcc0.ɵɵnextContext(3); return ctx_r52.onFileSelected($event); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} }
function FileManagerComponent_ng_container_0_dgp_list_details_page_9_Template(rf, ctx) { if (rf & 1) {
    const _r54 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "dgp-list-details-page");
    ɵngcc0.ɵɵelementContainerStart(1, 9);
    ɵngcc0.ɵɵelementStart(2, "dgp-file-item-list", 10);
    ɵngcc0.ɵɵlistener("fileItemRemoved", function FileManagerComponent_ng_container_0_dgp_list_details_page_9_Template_dgp_file_item_list_fileItemRemoved_2_listener($event) { ɵngcc0.ɵɵrestoreView(_r54); const ctx_r53 = ɵngcc0.ɵɵnextContext(2); return ctx_r53.removeFileItem($event); });
    ɵngcc0.ɵɵpipe(3, "async");
    ɵngcc0.ɵɵpipe(4, "async");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelement(5, "dgp-spacer");
    ɵngcc0.ɵɵtemplate(6, FileManagerComponent_ng_container_0_dgp_list_details_page_9_mat_nav_list_6_Template, 8, 0, "mat-nav-list", 11);
    ɵngcc0.ɵɵpipe(7, "async");
    ɵngcc0.ɵɵelementContainerEnd();
    ɵngcc0.ɵɵelement(8, "dgp-file-viewer", 12);
    ɵngcc0.ɵɵpipe(9, "async");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r41 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("model", ɵngcc0.ɵɵpipeBind1(3, 4, ctx_r41.fileItemListModel$))("disabled", ɵngcc0.ɵɵpipeBind1(4, 6, ctx_r41.isRemoveFilesDisabled$));
    ɵngcc0.ɵɵadvance(4);
    ɵngcc0.ɵɵproperty("ngIf", !ɵngcc0.ɵɵpipeBind1(7, 8, ctx_r41.isAddFilesDisabled$));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("fileItem", ɵngcc0.ɵɵpipeBind1(9, 10, ctx_r41.selectedFileItem$));
} }
function FileManagerComponent_ng_container_0_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "dgp-file-viewer", 12);
    ɵngcc0.ɵɵpipe(1, "async");
} if (rf & 2) {
    const ctx_r43 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("fileItem", ɵngcc0.ɵɵpipeBind1(1, 1, ctx_r43.selectedFileItem$));
} }
function FileManagerComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵelementStart(1, "h2", 2);
    ɵngcc0.ɵɵtext(2, " File manager ");
    ɵngcc0.ɵɵelement(3, "dgp-spacer");
    ɵngcc0.ɵɵtemplate(4, FileManagerComponent_ng_container_0_button_4_Template, 3, 0, "button", 3);
    ɵngcc0.ɵɵtemplate(5, FileManagerComponent_ng_container_0_button_5_Template, 3, 0, "button", 4);
    ɵngcc0.ɵɵelementStart(6, "button", 5);
    ɵngcc0.ɵɵelementStart(7, "mat-icon");
    ɵngcc0.ɵɵtext(8, "close");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(9, FileManagerComponent_ng_container_0_dgp_list_details_page_9_Template, 10, 12, "dgp-list-details-page", 0);
    ɵngcc0.ɵɵpipe(10, "async");
    ɵngcc0.ɵɵtemplate(11, FileManagerComponent_ng_container_0_ng_template_11_Template, 2, 3, "ng-template", null, 6, ɵngcc0.ɵɵtemplateRefExtractor);
    ɵngcc0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const _r42 = ɵngcc0.ɵɵreference(12);
    const ctx_r36 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(4);
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r36.isMaximized);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r36.isMaximized);
    ɵngcc0.ɵɵadvance(4);
    ɵngcc0.ɵɵproperty("ngIf", ɵngcc0.ɵɵpipeBind1(10, 4, ctx_r36.canOpenFileDrawer$))("ngIfElse", _r42);
} }
function FileManagerComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    const _r57 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "dgp-empty-state", 17);
    ɵngcc0.ɵɵtext(1, " Drop one or more files into this zone to upload them. ");
    ɵngcc0.ɵɵelement(2, "br");
    ɵngcc0.ɵɵtext(3, " You can preview them afterward. ");
    ɵngcc0.ɵɵelement(4, "br");
    ɵngcc0.ɵɵelementStart(5, "button", 18);
    ɵngcc0.ɵɵlistener("click", function FileManagerComponent_ng_template_2_Template_button_click_5_listener() { ɵngcc0.ɵɵrestoreView(_r57); const _r55 = ɵngcc0.ɵɵreference(11); return _r55.click(); });
    ɵngcc0.ɵɵpipe(6, "async");
    ɵngcc0.ɵɵelementStart(7, "mat-icon", 19);
    ɵngcc0.ɵɵtext(8, "open_in_new");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtext(9, " Choose file via picker ");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(10, "input", 15, 16);
    ɵngcc0.ɵɵlistener("change", function FileManagerComponent_ng_template_2_Template_input_change_10_listener($event) { ɵngcc0.ɵɵrestoreView(_r57); const ctx_r58 = ɵngcc0.ɵɵnextContext(); return ctx_r58.onFileSelected($event); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r38 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(5);
    ɵngcc0.ɵɵproperty("disabled", ɵngcc0.ɵɵpipeBind1(6, 1, ctx_r38.isAddFilesDisabled$));
} }
function PageHeaderComponent_mat_progress_bar_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "mat-progress-bar", 3);
} }
function ListDetailsPageComponent_mat_icon_8_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "mat-icon");
    ɵngcc0.ɵɵtext(1, " arrow_back ");
    ɵngcc0.ɵɵelementEnd();
} }
function ListDetailsPageComponent_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "mat-icon");
    ɵngcc0.ɵɵtext(1, "arrow_forward");
    ɵngcc0.ɵɵelementEnd();
} }
const _c3 = [[["", "dgp-list-details-page-menu", ""]], "*"];
const _c4 = ["[dgp-list-details-page-menu]", "*"];
function HamburgerShellComponent_mat_progress_bar_5_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "mat-progress-bar", 5);
} }
const _c5 = [[["", "dgp-hamburger-menu", ""]], "*"];
const _c6 = ["[dgp-hamburger-menu]", "*"];
function HamburgerMenuEntryComponent_a_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "a", 2);
    ɵngcc0.ɵɵelementStart(1, "mat-icon");
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtext(3);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r64 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵclassProp("disabled", ctx_r64.disabled);
    ɵngcc0.ɵɵproperty("routerLink", ctx_r64.route)("routerLinkActive", "dgp-list-item--selected");
    ɵngcc0.ɵɵattribute("tabindex", ctx_r64.disabled ? 0 - 1 : 0);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(ctx_r64.matIconName);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate1(" ", ctx_r64.label, " ");
} }
function HamburgerMenuEntryComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "a", 3);
    ɵngcc0.ɵɵelementStart(1, "mat-icon");
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtext(3);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r66 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(ctx_r66.matIconName);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate1(" ", ctx_r66.label, " ");
} }
function LogEntryListComponent_mat_nav_list_0_a_3_mat_icon_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "mat-icon", 7);
    ɵngcc0.ɵɵtext(1, " error ");
    ɵngcc0.ɵɵelementEnd();
} }
const _c7 = function (a1) { return ["/logEntries", a1]; };
function LogEntryListComponent_mat_nav_list_0_a_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "a", 4);
    ɵngcc0.ɵɵtemplate(1, LogEntryListComponent_mat_nav_list_0_a_3_mat_icon_1_Template, 2, 0, "mat-icon", 5);
    ɵngcc0.ɵɵelementStart(2, "div", 6);
    ɵngcc0.ɵɵtext(3);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(4, "div", 6);
    ɵngcc0.ɵɵtext(5);
    ɵngcc0.ɵɵpipe(6, "date");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const logEntry_r71 = ctx.$implicit;
    const ctx_r70 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("routerLink", ɵngcc0.ɵɵpureFunction1(7, _c7, logEntry_r71.timeStamp.toString()));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", logEntry_r71.severity === ctx_r70.severityEnum.Error);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate1(" ", logEntry_r71.title, " ");
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate1(" ", ɵngcc0.ɵɵpipeBind2(6, 4, logEntry_r71.timeStamp, "medium"), " ");
} }
function LogEntryListComponent_mat_nav_list_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "mat-nav-list");
    ɵngcc0.ɵɵelementStart(1, "h3", 2);
    ɵngcc0.ɵɵtext(2, "Entries");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(3, LogEntryListComponent_mat_nav_list_0_a_3_Template, 7, 9, "a", 3);
    ɵngcc0.ɵɵpipe(4, "async");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r67 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(3);
    ɵngcc0.ɵɵproperty("ngForOf", ɵngcc0.ɵɵpipeBind1(4, 1, ctx_r67.logEntries$));
} }
function LogEntryListComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "dgp-empty-state", 8);
} }
function LogEntryDetailsComponent_ng_container_0_mat_icon_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "mat-icon", 14);
    ɵngcc0.ɵɵtext(1, " error ");
    ɵngcc0.ɵɵelementEnd();
} }
function LogEntryDetailsComponent_ng_container_0_ng_container_14_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵtext(1, " Error ");
    ɵngcc0.ɵɵelementContainerEnd();
} }
function LogEntryDetailsComponent_ng_container_0_div_17_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵpipe(2, "json");
    ɵngcc0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r81 = ɵngcc0.ɵɵnextContext(3);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate1(" ", ɵngcc0.ɵɵpipeBind1(2, 1, ctx_r81.logEntry.content), " ");
} }
function LogEntryDetailsComponent_ng_container_0_div_17_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "div", 16);
    ɵngcc0.ɵɵpipe(1, "safe");
} if (rf & 2) {
    const ctx_r83 = ɵngcc0.ɵɵnextContext(3);
    ɵngcc0.ɵɵproperty("innerHTML", ɵngcc0.ɵɵpipeBind2(1, 1, ctx_r83.logEntry.content.error, "html"), ɵngcc0.ɵɵsanitizeHtml);
} }
function LogEntryDetailsComponent_ng_container_0_div_17_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 10);
    ɵngcc0.ɵɵtemplate(1, LogEntryDetailsComponent_ng_container_0_div_17_ng_container_1_Template, 3, 3, "ng-container", 0);
    ɵngcc0.ɵɵtemplate(2, LogEntryDetailsComponent_ng_container_0_div_17_ng_template_2_Template, 2, 4, "ng-template", null, 15, ɵngcc0.ɵɵtemplateRefExtractor);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const _r82 = ɵngcc0.ɵɵreference(3);
    const ctx_r78 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r78.isApiError())("ngIfElse", _r82);
} }
function LogEntryDetailsComponent_ng_container_0_ng_template_18_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 17);
    ɵngcc0.ɵɵtext(1, " This log entry doesn't contain additional content. ");
    ɵngcc0.ɵɵelementEnd();
} }
function LogEntryDetailsComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵelementStart(1, "div", 2);
    ɵngcc0.ɵɵtemplate(2, LogEntryDetailsComponent_ng_container_0_mat_icon_2_Template, 2, 0, "mat-icon", 3);
    ɵngcc0.ɵɵelementStart(3, "div", 4);
    ɵngcc0.ɵɵelementStart(4, "h1", 5);
    ɵngcc0.ɵɵtext(5);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(6, "div", 6);
    ɵngcc0.ɵɵtext(7);
    ɵngcc0.ɵɵpipe(8, "date");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelement(9, "mat-divider", 7);
    ɵngcc0.ɵɵelementStart(10, "div", 8);
    ɵngcc0.ɵɵelementStart(11, "h2", 9);
    ɵngcc0.ɵɵtext(12, " Severity ");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(13, "div", 10);
    ɵngcc0.ɵɵtemplate(14, LogEntryDetailsComponent_ng_container_0_ng_container_14_Template, 2, 0, "ng-container", 11);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(15, "h2", 9);
    ɵngcc0.ɵɵtext(16, " Content ");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(17, LogEntryDetailsComponent_ng_container_0_div_17_Template, 4, 2, "div", 12);
    ɵngcc0.ɵɵtemplate(18, LogEntryDetailsComponent_ng_container_0_ng_template_18_Template, 2, 0, "ng-template", null, 13, ɵngcc0.ɵɵtemplateRefExtractor);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const _r79 = ɵngcc0.ɵɵreference(19);
    const ctx_r73 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r73.logEntry.severity === ctx_r73.severityEnum.Error);
    ɵngcc0.ɵɵadvance(3);
    ɵngcc0.ɵɵtextInterpolate1(" ", ctx_r73.logEntry.title, " ");
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate1(" ", ɵngcc0.ɵɵpipeBind2(8, 6, ctx_r73.logEntry.timeStamp, "medium"), " ");
    ɵngcc0.ɵɵadvance(7);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r73.logEntry.severity === ctx_r73.severityEnum.Error);
    ɵngcc0.ɵɵadvance(3);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r73.logEntry.content)("ngIfElse", _r79);
} }
function LogEntryDetailsComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "dgp-empty-state", 18);
    ɵngcc0.ɵɵtext(1, " Pick one from the list to the left. ");
    ɵngcc0.ɵɵelementEnd();
} }
const _c8 = ["triggerButton"];
function VirtualListPanelComponent_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
const _c9 = function (a0) { return { $implicit: a0 }; };
function VirtualListPanelComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵtemplate(1, VirtualListPanelComponent_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 2);
    ɵngcc0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r86 = ctx.$implicit;
    const ctx_r85 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r85.itemTemplate)("ngTemplateOutletContext", ɵngcc0.ɵɵpureFunction1(2, _c9, item_r86));
} }
const authenticateUser = createAction("[Authentication] AuthenticateUser", props());
const cacheInitialUrl = createAction("[Authentication] CacheInitialUrl", props());
const registerAuthenticateError = createAction("[Authentication] RegisterAuthenticationError", props());

/**
 * Service for authenticating the user
 */
class AuthenticationApiClient {
}

const authenticationStoreFeature = "Authentication";

const authenticationFeatureSelector = createFeatureSelector(authenticationStoreFeature);
const ɵ0 = x => x.success;
const getIsAuthenticatedSelector = createSelector(authenticationFeatureSelector, ɵ0);
const ɵ1 = x => x.user;
const getAuthenticatedUserSelector = createSelector(authenticationFeatureSelector, ɵ1);
const ɵ2 = x => x.initialUrl;
const getCachedInitialUrlSelector = createSelector(authenticationFeatureSelector, ɵ2);
const ɵ3 = x => !isNullOrUndefined$1(x);
const hasCachedInitialUrlSelector = createSelector(getCachedInitialUrlSelector, ɵ3);

let AuthenticationGuard = class AuthenticationGuard {
    constructor(store, router) {
        this.store = store;
        this.router = router;
    }
    canActivate(route, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const hasInitialUrl = yield this.store.pipe(select(hasCachedInitialUrlSelector), first())
                .toPromise();
            if (!hasInitialUrl) {
                this.store.dispatch(cacheInitialUrl({ initialUrl: state.url }));
            }
            return this.store.pipe(select(getIsAuthenticatedSelector), first())
                .toPromise();
        });
    }
};
AuthenticationGuard.ɵfac = function AuthenticationGuard_Factory(t) { return new (t || AuthenticationGuard)(ɵngcc0.ɵɵinject(ɵngcc1.Store), ɵngcc0.ɵɵinject(ɵngcc2.Router)); };
AuthenticationGuard.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: AuthenticationGuard, factory: AuthenticationGuard.ɵfac });
AuthenticationGuard.ctorParameters = () => [
    { type: Store },
    { type: Router }
];

class AuthenticationService {
}
let AuthenticationServiceImpl = class AuthenticationServiceImpl {
    constructor(store, authenticationApiClient) {
        this.store = store;
        this.authenticationApiClient = authenticationApiClient;
        this.postAuthenticationTasks = [];
    }
    authenticate$() {
        return from(this.authenticationApiClient.authenticate$())
            .pipe(tap(user => {
            this.store.dispatch(authenticateUser({ user }));
        }), switchMap(user => {
            const requests$ = this.postAuthenticationTasks.map(task => {
                return from(task(user));
            });
            return forkJoin(requests$);
        }), catchError((error) => {
            this.store.dispatch(registerAuthenticateError({ error }));
            return empty();
        }), defaultIfEmpty(null))
            .toPromise();
    }
    registerPostAuthenticationTask(task) {
        this.postAuthenticationTasks.push(task);
    }
};
AuthenticationServiceImpl.ɵfac = function AuthenticationServiceImpl_Factory(t) { return new (t || AuthenticationServiceImpl)(ɵngcc0.ɵɵinject(ɵngcc1.Store), ɵngcc0.ɵɵinject(AuthenticationApiClient)); };
AuthenticationServiceImpl.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: AuthenticationServiceImpl, factory: AuthenticationServiceImpl.ɵfac });
AuthenticationServiceImpl.ctorParameters = () => [
    { type: Store },
    { type: AuthenticationApiClient }
];
const authenticationServiceProvider = {
    provide: AuthenticationService,
    useClass: AuthenticationServiceImpl
};

/**
 * Service that runs tasks once the user is authenticated
 * but before the application actually starts.
 *
 * Use for downloading basic data or load user settings.
 */
class InitializationService {
}

const initialAuthenticationState = {
    user: null,
    success: null,
    error: null,
    initialUrl: null
};
const ɵ0$1 = (state, action) => {
    return Object.assign(Object.assign({}, state), { user: action.user, success: true });
}, ɵ1$1 = (state, action) => {
    return Object.assign(Object.assign({}, state), { initialUrl: action.initialUrl });
}, ɵ2$1 = (state, action) => {
    return Object.assign(Object.assign({}, state), { error: action.error, success: false });
};
const authenticationReducer = createReducer(initialAuthenticationState, on(authenticateUser, ɵ0$1), on(cacheInitialUrl, ɵ1$1), on(registerAuthenticateError, ɵ2$1));

/**
 * Logic executed before the app loads
 */
function appInitializer(authenticationService, initializationService) {
    authenticationService.registerPostAuthenticationTask((user) => {
        return initializationService.runPostAuthenticationTask$(user);
    });
    return () => {
        return authenticationService
            .authenticate$();
    };
}
const appInitializerProvider = {
    provide: APP_INITIALIZER,
    useFactory: appInitializer,
    deps: [
        AuthenticationService,
        InitializationService
    ],
    multi: true
};

var DgpAuthenticationModule_1;
const AUTHENTICATION_REDUCER = new InjectionToken("authenticationReducer");
function authenticationReducerFactory() {
    return authenticationReducer;
}
const authenticationReducerProvider = {
    provide: AUTHENTICATION_REDUCER,
    useFactory: authenticationReducerFactory
};
let DgpAuthenticationModule = DgpAuthenticationModule_1 = class DgpAuthenticationModule {
    static forRoot(settings) {
        return {
            ngModule: DgpAuthenticationModule_1,
            providers: [
                settings.authenticationApiClientProvider,
                settings.initializationServiceProvider,
            ]
        };
    }
};
DgpAuthenticationModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: DgpAuthenticationModule });
DgpAuthenticationModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function DgpAuthenticationModule_Factory(t) { return new (t || DgpAuthenticationModule)(); }, providers: [
        appInitializerProvider,
        authenticationReducerProvider,
        AuthenticationGuard,
        authenticationServiceProvider
    ], imports: [[
            StoreModule.forFeature(authenticationStoreFeature, AUTHENTICATION_REDUCER)
        ]] });

const setOwnBroadcastRoleActionType = "[BroadcastChannel] SetOwnRole";
class SetOwnBroadcastRoleAction {
    constructor(payload) {
        this.payload = payload;
        this.type = setOwnBroadcastRoleActionType;
    }
}
const setOwnBroadcastRole = createAction(setOwnBroadcastRoleActionType, props());
const setBroadcastChannelDataIdActionType = "[BroadcastChannel] SetSelectedDataId";
class SetBroadcastChannelDataIdAction {
    constructor(payload) {
        this.payload = payload;
        this.type = setBroadcastChannelDataIdActionType;
    }
}
const setBroadcastChannelDataId = createAction(setBroadcastChannelDataIdActionType, props());
const requestInitialData = createAction("[BroadcastChannel] RequestInitialData");
const leaderActionTypePrefix = "[Leader] ";
const peonActionTypePrefix = "[Peon] ";
const compositeActionTypePrefix = "[Composite] ";
const trackRequestActionTypePrefix = "[Request] ";

const heartbeatBroadcastChannelId = "HeartbeatBroadcastChannel";
const actionBroadcastChannelId = "ActionBroadcastChannel";
const defaultBroadcastRoleDisplayConfig = {
    leaderBrowserTabTitleSuffix: ": Leader",
    peonBrowserTabTitleSuffix: ": Peon"
};
const defaultBroadcastConfig = {
    heartbeartBroadcastInterval: 1000,
    incomingHeartbeatBufferInterval: 3000,
    heartbeatBroadcastChannelId,
    actionBroadcastChannelId,
    actionTypesToPrefixWithPeon: [],
    updateBrowserTabTitleConfig: defaultBroadcastRoleDisplayConfig
};
const BROADCAST_CONFIG = new InjectionToken("DEFAULT_BROADCAST_CONFIG");
var BroadcastRole;
(function (BroadcastRole) {
    BroadcastRole[BroadcastRole["None"] = 0] = "None";
    BroadcastRole[BroadcastRole["Leader"] = 1] = "Leader";
    BroadcastRole[BroadcastRole["Peon"] = 2] = "Peon";
})(BroadcastRole || (BroadcastRole = {}));

const broadcastStoreFeature = "Broadcast";
const broadcastStoreFeatureSelector = createFeatureSelector(broadcastStoreFeature);
const ɵ0$2 = (state, action) => {
    return {
        ownRole: action.broadcastRole
    };
};
const broadcastReducer = createReducer({ ownRole: BroadcastRole.None }, on(setOwnBroadcastRole, ɵ0$2));
const ɵ1$2 = (x) => {
    if (isNullOrUndefined$1(x)) {
        return null;
    }
    return x.ownRole;
};
const getOwnBroadcastRoleSelector = createSelector(broadcastStoreFeatureSelector, ɵ1$2);

let NoPeonGuard = class NoPeonGuard {
    constructor(store) {
        this.store = store;
    }
    canActivate(route, state) {
        return this.store.pipe(select(getOwnBroadcastRoleSelector), map((role) => {
            return role !== BroadcastRole.Peon;
        }));
    }
};
NoPeonGuard.ɵfac = function NoPeonGuard_Factory(t) { return new (t || NoPeonGuard)(ɵngcc0.ɵɵinject(ɵngcc1.Store)); };
NoPeonGuard.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: NoPeonGuard, factory: NoPeonGuard.ɵfac });
NoPeonGuard.ctorParameters = () => [
    { type: Store }
];

const crypto = window.crypto || window.msCrypto; // for IE 11
function createGuid() {
    // @ts-ignore
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => 
    // tslint:disable-next-line:no-bitwise
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}

function prefixAction(payload) {
    return Object.assign({}, payload.action, {
        type: payload.prefix + payload.action.type
    });
}

function shouldPrefixAction(payload) {
    if (payload.actualBroadcastRole === payload.triggeringBroadcastRole) {
        if (payload.triggeringActionPrefixes.some(actionPrefix => {
            return payload.action.type.startsWith(actionPrefix);
        })) {
            return true;
        }
    }
    return false;
}

let BroadcastStoreDecorator = class BroadcastStoreDecorator extends Store {
    constructor(state$, actionsObserver, reducerManager, config) {
        super(state$, actionsObserver, reducerManager);
        this.config = config;
        this.ownBroadcastRoleSubscription = state$.pipe(select(getOwnBroadcastRoleSelector)).subscribe(x => {
            this.broadcastRole = x;
        }, (e) => {
            throw e;
        });
    }
    dispatch(action) {
        let localAction = action;
        const shouldPrefixActionWithPeonResult = shouldPrefixAction({
            action,
            actualBroadcastRole: this.broadcastRole,
            triggeringBroadcastRole: BroadcastRole.Peon,
            triggeringActionPrefixes: this.config.actionTypesToPrefixWithPeon
        });
        if (shouldPrefixActionWithPeonResult) {
            localAction = prefixAction({
                action: localAction,
                prefix: peonActionTypePrefix
            });
        }
        super.dispatch(localAction);
    }
    next(action) {
        let localAction = action;
        const shouldPrefixActionWithPeonResult = shouldPrefixAction({
            action,
            actualBroadcastRole: this.broadcastRole,
            triggeringBroadcastRole: BroadcastRole.Peon,
            triggeringActionPrefixes: this.config.actionTypesToPrefixWithPeon
        });
        if (shouldPrefixActionWithPeonResult) {
            localAction = prefixAction({
                action: localAction,
                prefix: peonActionTypePrefix
            });
        }
        super.next(localAction);
    }
};
BroadcastStoreDecorator.ɵfac = function BroadcastStoreDecorator_Factory(t) { return new (t || BroadcastStoreDecorator)(ɵngcc0.ɵɵinject(StateObservable), ɵngcc0.ɵɵinject(ActionsSubject), ɵngcc0.ɵɵinject(ReducerManager), ɵngcc0.ɵɵinject(BROADCAST_CONFIG)); };
BroadcastStoreDecorator.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: BroadcastStoreDecorator, factory: BroadcastStoreDecorator.ɵfac });
BroadcastStoreDecorator.ctorParameters = () => [
    { type: StateObservable, decorators: [{ type: Inject, args: [StateObservable,] }] },
    { type: ActionsSubject, decorators: [{ type: Inject, args: [ActionsSubject,] }] },
    { type: ReducerManager, decorators: [{ type: Inject, args: [ReducerManager,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [BROADCAST_CONFIG,] }] }
];
BroadcastStoreDecorator = __decorate([ __param(0, Inject(StateObservable)),
    __param(1, Inject(ActionsSubject)),
    __param(2, Inject(ReducerManager)),
    __param(3, Inject(BROADCAST_CONFIG))
], BroadcastStoreDecorator);
const broadcastStoreProvider = {
    provide: Store,
    useClass: BroadcastStoreDecorator
};

class BroadcastChannelLocalStorageFallbackService {
    constructor(channelId) {
        this.channelId = channelId;
    }
    addEventListener(type, listener, options) {
        window.addEventListener("storage", (ev) => {
            if (ev.key !== this.channelId) {
                return;
            }
            if (isNullOrUndefined$1(ev.newValue)) {
                return;
            }
            const message = JSON.parse(ev.newValue);
            listener({
                data: message
            });
        });
    }
    postMessage(message) {
        const messageJson = JSON.stringify(message);
        window.localStorage.setItem(this.channelId, messageJson);
    }
}

/**
 * Parses heartbeats from message events
 *
 * This is needed to ensure that the objects resulting from broadcast channels
 * and local storage look the same
 *
 * @param messageEvent
 */
function getBroadcastHeartbeatFromMessageEvent(messageEvent) {
    return {
        dataId: messageEvent.data.dataId,
        participantId: messageEvent.data.participantId,
        participantCreationDate: isDate(messageEvent.data.participantCreationDate) ?
            messageEvent.data.participantCreationDate : new Date(messageEvent.data.participantCreationDate)
    };
}

class BroadcastChannelService {
}
let BroadcastChannelServiceImpl = class BroadcastChannelServiceImpl extends BroadcastChannelService {
    constructor(config) {
        super();
        this.config = config;
        this.addBroadcastListenerForHeartbeat = (handler) => {
            this.heartbeatBroadcastChannel.addEventListener("message", handler);
        };
        this.addBroadcastListenerForAction = (handler) => {
            this.actionBroadcastChannel.addEventListener("message", handler);
        };
        if ("BroadcastChannel" in self) {
            this.heartbeatBroadcastChannel = new BroadcastChannel(this.config.heartbeatBroadcastChannelId);
            this.actionBroadcastChannel = new BroadcastChannel(this.config.actionBroadcastChannelId);
        }
        else {
            this.heartbeatBroadcastChannel = new BroadcastChannelLocalStorageFallbackService(this.config.heartbeatBroadcastChannelId);
            this.actionBroadcastChannel = new BroadcastChannelLocalStorageFallbackService(this.config.actionBroadcastChannelId);
        }
    }
    getAction$() {
        return fromEventPattern(this.addBroadcastListenerForAction).pipe(map((messageEvent) => messageEvent.data));
    }
    getHeartbeat$() {
        return fromEventPattern(this.addBroadcastListenerForHeartbeat).pipe(map(getBroadcastHeartbeatFromMessageEvent));
    }
    postAction(action) {
        this.actionBroadcastChannel.postMessage(action);
    }
    postHeartbeat(heartbeat) {
        this.heartbeatBroadcastChannel.postMessage(heartbeat);
    }
};
BroadcastChannelServiceImpl.ɵfac = function BroadcastChannelServiceImpl_Factory(t) { return new (t || BroadcastChannelServiceImpl)(ɵngcc0.ɵɵinject(BROADCAST_CONFIG)); };
BroadcastChannelServiceImpl.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: BroadcastChannelServiceImpl, factory: BroadcastChannelServiceImpl.ɵfac });
BroadcastChannelServiceImpl.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [BROADCAST_CONFIG,] }] }
];
BroadcastChannelServiceImpl = __decorate([ __param(0, Inject(BROADCAST_CONFIG))
], BroadcastChannelServiceImpl);
const broadcastChannelServiceProvider = {
    provide: BroadcastChannelService,
    useClass: BroadcastChannelServiceImpl
};

function createBroadcastHeartbeat(payload) {
    return {
        participantId: payload.participant.participantId,
        participantCreationDate: payload.participant.participantCreationDate,
        dataId: payload.dataId,
    };
}

function createBroadcastParticipant() {
    return {
        participantId: createGuid(),
        participantCreationDate: new Date()
    };
}

function trimIncomingBroadcastAction(action) {
    if (action.type.startsWith(peonActionTypePrefix)) {
        return Object.assign({}, action, {
            type: action.type.replace(peonActionTypePrefix, "")
        });
    }
    else if (action.type.startsWith(leaderActionTypePrefix)) {
        return Object.assign({}, action, {
            type: action.type.replace(leaderActionTypePrefix, "")
        });
    }
    else {
        throw Error("Broadcasted actions must either be marked as Peon or Leader actions");
    }
}

/**
 * Returns distinct heartbeats for a given data channel
 *
 * If no dataId is passed to identify the channel, an empty array is returned
 * Heartbeats are distinguished by participantId
 *
 * @param payload
 */
function getDistinctHeartbeatsForChannel(payload) {
    if (isNullOrUndefined$1(payload.channelDataId)) {
        return [];
    }
    const distinctHearbeats = uniqBy(payload.heartbeats, (x) => x.participantId);
    return distinctHearbeats.filter(x => {
        if (isNullOrUndefined$1(x.dataId)) {
            return false;
        }
        return isEqual(x.dataId, payload.channelDataId);
    });
}

function getHeartbeatFromOldestParticipant(payload) {
    return minBy(payload, (x) => x.participantCreationDate);
}

function shouldBroadcastParticipantChangeRole(payload) {
    const result = {
        shouldChangeRole: false,
        newRole: null
    };
    const ownHeartbeat = payload.heartbeats.find(x => x.participantId === payload.participantId);
    if (isNullOrUndefined$1(ownHeartbeat.dataId)) {
        if (payload.currentBroadcastRole !== BroadcastRole.None) {
            return {
                newBroadcastRole: BroadcastRole.None,
                shouldChangeRole: true
            };
        }
        else {
            return result;
        }
    }
    const distinctHeartbeatsForOwnChannel = getDistinctHeartbeatsForChannel({
        heartbeats: payload.heartbeats,
        channelDataId: ownHeartbeat.dataId
    });
    if (distinctHeartbeatsForOwnChannel.length < 2) {
        if (payload.currentBroadcastRole !== BroadcastRole.None) {
            return {
                newBroadcastRole: BroadcastRole.None,
                shouldChangeRole: true
            };
        }
        else {
            return result;
        }
    }
    const elderSender = getHeartbeatFromOldestParticipant(distinctHeartbeatsForOwnChannel);
    if (elderSender.participantId === payload.participantId) {
        if (payload.currentBroadcastRole !== BroadcastRole.Leader) {
            return {
                newBroadcastRole: BroadcastRole.Leader,
                shouldChangeRole: true
            };
        }
        else {
            return result;
        }
    }
    else {
        if (payload.currentBroadcastRole !== BroadcastRole.Peon) {
            return {
                newBroadcastRole: BroadcastRole.Peon,
                shouldChangeRole: true
            };
        }
        else {
            return result;
        }
    }
}

function createBroadcastAction(payload) {
    return Object.assign({}, payload.action, {
        type: payload.action.type,
        participantId: payload.participant.participantId,
        participantCreationDate: payload.participant.participantCreationDate,
        dataId: payload.dataId,
    });
}

function filterIncomingBroadcastAction(payload) {
    const doDataIdsExist = !isNullOrUndefined$1(payload.action.dataId)
        && !isNullOrUndefined$1(payload.dataId);
    if (!doDataIdsExist) {
        return false;
    }
    const areDataIdsEqual = isEqual(payload.action.dataId, payload.dataId);
    if (!areDataIdsEqual) {
        return false;
    }
    const peonActionArrivesAtLeader = payload.action.type.startsWith(peonActionTypePrefix)
        && payload.ownBroadcastRole === BroadcastRole.Leader;
    if (peonActionArrivesAtLeader) {
        return true;
    }
    const leaderActionArrivesAtPeon = payload.action.type.startsWith(leaderActionTypePrefix)
        && payload.ownBroadcastRole === BroadcastRole.Peon;
    return leaderActionArrivesAtPeon;
}

const defaultShouldUpdateBrowserTabBroadcastRoleDisplayConfig = defaultBroadcastRoleDisplayConfig;
function shouldUpdateBrowserTabBroadcastRoleDisplay(payload, config = defaultShouldUpdateBrowserTabBroadcastRoleDisplayConfig) {
    let updatedTabTitle;
    let broadcastRoleLabel;
    const result = {
        shouldUpdateRoleDisplay: null,
        updatedBrowserTabTitle: null
    };
    switch (payload.currentBroadcastRole) {
        case BroadcastRole.None:
            break;
        case BroadcastRole.Leader:
            broadcastRoleLabel = config.leaderBrowserTabTitleSuffix;
            break;
        case BroadcastRole.Peon:
            broadcastRoleLabel = config.peonBrowserTabTitleSuffix;
            break;
    }
    if (!isNullOrUndefined$1(broadcastRoleLabel)) {
        updatedTabTitle = payload.currentBrowserTabTitle;
        if (updatedTabTitle.endsWith(config.leaderBrowserTabTitleSuffix)) {
            updatedTabTitle = updatedTabTitle.replace(config.leaderBrowserTabTitleSuffix, "");
        }
        else if (updatedTabTitle.endsWith(config.peonBrowserTabTitleSuffix)) {
            updatedTabTitle = updatedTabTitle.replace(config.peonBrowserTabTitleSuffix, "");
        }
        updatedTabTitle += broadcastRoleLabel;
    }
    else {
        updatedTabTitle = payload.currentBrowserTabTitle;
        if (updatedTabTitle.endsWith(config.leaderBrowserTabTitleSuffix)) {
            updatedTabTitle = updatedTabTitle.replace(config.leaderBrowserTabTitleSuffix, "");
        }
        else if (updatedTabTitle.endsWith(config.peonBrowserTabTitleSuffix)) {
            updatedTabTitle = updatedTabTitle.replace(config.peonBrowserTabTitleSuffix, "");
        }
    }
    if (updatedTabTitle !== payload.currentBrowserTabTitle) {
        result.updatedBrowserTabTitle = updatedTabTitle;
    }
    result.shouldUpdateRoleDisplay = !isNullOrUndefined$1(result.updatedBrowserTabTitle);
    return result;
}

function filterActionToPrefixWithLeaderPredicate(action) {
    return action.type.startsWith(compositeActionTypePrefix)
        || action.type.startsWith(trackRequestActionTypePrefix);
}

function getBroadcastHeartbeatsForInterval(payload) {
    return payload.heartbeatsFromOtherParticipants.concat([
        createBroadcastHeartbeat({
            participant: payload.participant,
            dataId: payload.dataId
        })
    ]);
}
let BroadcastEffects = class BroadcastEffects {
    constructor(actions$, store, channelService, config) {
        this.actions$ = actions$;
        this.store = store;
        this.channelService = channelService;
        this.config = config;
        this.participant = createBroadcastParticipant();
        this.heartbeat$ = interval(this.config.heartbeartBroadcastInterval);
        this.cacheDataId$ = this.actions$.pipe(ofType(setBroadcastChannelDataId), tap(action => {
            this.selectedDataId = action.payload;
        }));
        this.cacheOwnBroadcastRole$ = this.store.pipe(select(getOwnBroadcastRoleSelector))
            .pipe(tap((ownBroadcastRole) => {
            this.ownBroadcastRole = ownBroadcastRole;
        }));
        this.broadcastHeartbeat$ = this.heartbeat$.pipe(tap(() => {
            const heartbeat = createBroadcastHeartbeat({
                participant: this.participant,
                dataId: this.selectedDataId
            });
            this.channelService.postHeartbeat(heartbeat);
        }));
        this.observeBroadcastedHeartbeats$ = this.channelService
            .getHeartbeat$()
            .pipe(bufferTime(this.config.incomingHeartbeatBufferInterval), map((heartbeartsFromOtherParticipants) => {
            return getBroadcastHeartbeatsForInterval({
                heartbeatsFromOtherParticipants: heartbeartsFromOtherParticipants,
                participant: this.participant,
                dataId: this.selectedDataId
            });
        }), map((heartbeats) => {
            const shouldChangeRoleResult = shouldBroadcastParticipantChangeRole({
                currentBroadcastRole: this.ownBroadcastRole,
                heartbeats,
                participantId: this.participant.participantId
            });
            if (shouldChangeRoleResult.shouldChangeRole) {
                return setOwnBroadcastRole({ broadcastRole: shouldChangeRoleResult.newBroadcastRole });
            }
            else {
                return null;
            }
        }), filter(x => !isNullOrUndefined$1(x)));
        this.displayBroadcastRoleInBrowserTabTitle$ = this.actions$.pipe(ofType(setOwnBroadcastRole), filter(() => !isNullOrUndefined$1(this.config.updateBrowserTabTitleConfig)), tap(action => {
            const result = shouldUpdateBrowserTabBroadcastRoleDisplay({
                currentBroadcastRole: action.broadcastRole,
                currentBrowserTabTitle: window.document.title
            }, this.config.updateBrowserTabTitleConfig);
            if (result.shouldUpdateRoleDisplay) {
                window.document.title = result.updatedBrowserTabTitle;
            }
        }));
        this.broadcastPeonAction$ = this.actions$.pipe(filter((action) => action.type.startsWith(peonActionTypePrefix)), tap((action) => {
            const actionMessage = createBroadcastAction({
                participant: this.participant,
                dataId: this.selectedDataId,
                action
            });
            this.channelService.postAction(actionMessage);
        }));
        this.createLeaderAction$ = this.store.pipe(select(getOwnBroadcastRoleSelector), switchMap((broadcastRole) => {
            if (broadcastRole === BroadcastRole.Leader) {
                return this.actions$.pipe(filter(filterActionToPrefixWithLeaderPredicate));
            }
            else {
                return of(null);
            }
        }), filter(x => !isNullOrUndefined$1(x)), map((action) => {
            return Object.assign({}, action, {
                type: leaderActionTypePrefix + action.type
            });
        }));
        this.broadcastLeaderAction$ = this.actions$.pipe(filter((action) => action.type.startsWith(leaderActionTypePrefix)), tap((action) => {
            const actionMessage = createBroadcastAction({
                participant: this.participant,
                dataId: this.selectedDataId,
                action
            });
            this.channelService.postAction(actionMessage);
        }));
        this.observeBroadcastedActions$ = this.channelService
            .getAction$()
            .pipe(filter((action) => {
            return filterIncomingBroadcastAction({
                action,
                dataId: this.selectedDataId,
                ownBroadcastRole: this.ownBroadcastRole
            });
        }), map(x => trimIncomingBroadcastAction(x)));
        this.sendInitialData$ = this.actions$.pipe(ofType(requestInitialData), switchMap(() => this.store.select(getOwnBroadcastRoleSelector)
            .pipe(first())), filter(role => role === BroadcastRole.Leader
            && this.config.sendInitialState !== null
            && this.config.sendInitialState !== undefined), switchMap(() => this.store.pipe(first())), map(state => prefixAction({
            action: this.config.sendInitialState(state),
            prefix: leaderActionTypePrefix
        })));
        this.requestInitialData$ = this.store.select(getOwnBroadcastRoleSelector)
            .pipe(distinctUntilChanged(), filter(role => role === BroadcastRole.Peon
            && this.config.sendInitialState !== null
            && this.config.sendInitialState !== undefined), map(() => prefixAction({
            action: requestInitialData,
            prefix: peonActionTypePrefix
        })));
    }
};
BroadcastEffects.ɵfac = function BroadcastEffects_Factory(t) { return new (t || BroadcastEffects)(ɵngcc0.ɵɵinject(ɵngcc3.Actions), ɵngcc0.ɵɵinject(ɵngcc1.Store), ɵngcc0.ɵɵinject(BroadcastChannelService), ɵngcc0.ɵɵinject(BROADCAST_CONFIG)); };
BroadcastEffects.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: BroadcastEffects, factory: BroadcastEffects.ɵfac });
BroadcastEffects.ctorParameters = () => [
    { type: Actions },
    { type: Store },
    { type: BroadcastChannelService },
    { type: undefined, decorators: [{ type: Inject, args: [BROADCAST_CONFIG,] }] }
];
__decorate([
    Effect({
        dispatch: false
    })
], BroadcastEffects.prototype, "cacheDataId$", void 0);
__decorate([
    Effect({
        dispatch: false
    })
], BroadcastEffects.prototype, "cacheOwnBroadcastRole$", void 0);
__decorate([
    Effect({
        dispatch: false
    })
], BroadcastEffects.prototype, "broadcastHeartbeat$", void 0);
__decorate([
    Effect()
], BroadcastEffects.prototype, "observeBroadcastedHeartbeats$", void 0);
__decorate([
    Effect({
        dispatch: false
    })
], BroadcastEffects.prototype, "displayBroadcastRoleInBrowserTabTitle$", void 0);
__decorate([
    Effect({
        dispatch: false
    })
], BroadcastEffects.prototype, "broadcastPeonAction$", void 0);
__decorate([
    Effect()
], BroadcastEffects.prototype, "createLeaderAction$", void 0);
__decorate([
    Effect({
        dispatch: false
    })
], BroadcastEffects.prototype, "broadcastLeaderAction$", void 0);
__decorate([
    Effect()
], BroadcastEffects.prototype, "observeBroadcastedActions$", void 0);
__decorate([
    Effect()
], BroadcastEffects.prototype, "sendInitialData$", void 0);
__decorate([
    Effect()
], BroadcastEffects.prototype, "requestInitialData$", void 0);
BroadcastEffects = __decorate([ __param(3, Inject(BROADCAST_CONFIG))
], BroadcastEffects);

var DgpBroadcastStoreModule_1;
const BROADCAST_REDUCER = new InjectionToken("BroadcastStoreReducer");
function broadcastReducerFactory() {
    return broadcastReducer;
}
const broadcastReducerProvider = {
    provide: BROADCAST_REDUCER,
    useFactory: broadcastReducerFactory
};
const ɵ0$3 = defaultBroadcastConfig;
let DgpBroadcastStoreModule = DgpBroadcastStoreModule_1 = class DgpBroadcastStoreModule {
    static forRoot(config = defaultBroadcastConfig) {
        return {
            ngModule: DgpBroadcastStoreModule_1,
            providers: [{
                    provide: BROADCAST_CONFIG,
                    useValue: config
                }, broadcastStoreProvider]
        };
    }
};
DgpBroadcastStoreModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: DgpBroadcastStoreModule });
DgpBroadcastStoreModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function DgpBroadcastStoreModule_Factory(t) { return new (t || DgpBroadcastStoreModule)(); }, providers: [
        broadcastChannelServiceProvider,
        {
            provide: BROADCAST_CONFIG,
            useValue: ɵ0$3
        },
        NoPeonGuard,
        broadcastReducerProvider
    ], imports: [[
            StoreModule.forFeature(broadcastStoreFeature, BROADCAST_REDUCER),
            EffectsModule.forFeature([
                BroadcastEffects
            ]),
            MatSnackBarModule
        ]] });

let EmptyStateComponent = class EmptyStateComponent {
};
EmptyStateComponent.ɵfac = function EmptyStateComponent_Factory(t) { return new (t || EmptyStateComponent)(); };
EmptyStateComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: EmptyStateComponent, selectors: [["dgp-empty-state"]], inputs: { matIconName: "matIconName", title: "title" }, ngContentSelectors: _c0, decls: 5, vars: 2, consts: [[4, "ngIf"]], template: function EmptyStateComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵtemplate(0, EmptyStateComponent_dgp_empty_state_icon_0_Template, 2, 1, "dgp-empty-state-icon", 0);
        ɵngcc0.ɵɵelementStart(1, "dgp-empty-state-title");
        ɵngcc0.ɵɵtext(2);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(3, "dgp-empty-state-content");
        ɵngcc0.ɵɵprojection(4);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ctx.matIconName);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵtextInterpolate1(" ", ctx.title, " ");
    } }, directives: function () { return [ɵngcc4.NgIf, EmptyStateTitleComponent,
        EmptyStateContentComponent,
        EmptyStateIconComponent]; }, styles: ["[_nghost-%COMP%] {\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n            max-height: 640px;\n            height: 100%;\n            justify-content: center;\n            align-items: center;\n        }"], changeDetection: 0 });
__decorate([
    Input()
], EmptyStateComponent.prototype, "matIconName", void 0);
__decorate([
    Input()
], EmptyStateComponent.prototype, "title", void 0);

let EmptyStateContentComponent = class EmptyStateContentComponent {
};
EmptyStateContentComponent.ɵfac = function EmptyStateContentComponent_Factory(t) { return new (t || EmptyStateContentComponent)(); };
EmptyStateContentComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: EmptyStateContentComponent, selectors: [["dgp-empty-state-content"]], ngContentSelectors: _c0, decls: 1, vars: 0, template: function EmptyStateContentComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵprojection(0);
    } }, encapsulation: 2, changeDetection: 0 });

let EmptyStateIconComponent = class EmptyStateIconComponent {
};
EmptyStateIconComponent.ɵfac = function EmptyStateIconComponent_Factory(t) { return new (t || EmptyStateIconComponent)(); };
EmptyStateIconComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: EmptyStateIconComponent, selectors: [["dgp-empty-state-icon"]], ngContentSelectors: _c0, decls: 2, vars: 0, consts: [[1, "icon"]], template: function EmptyStateIconComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵelementStart(0, "mat-icon", 0);
        ɵngcc0.ɵɵprojection(1);
        ɵngcc0.ɵɵelementEnd();
    } }, directives: [ɵngcc5.MatIcon], styles: ["[_nghost-%COMP%] {\n            margin-left: 16px;\n            margin-right: 16px;\n            display: inline-flex;\n        }\n\n        .icon[_ngcontent-%COMP%] {\n            color: gray;\n            font-size: 64px;\n            width: 64px;\n            height: 64px;\n        }"], changeDetection: 0 });

let EmptyStateTitleComponent = class EmptyStateTitleComponent {
};
EmptyStateTitleComponent.ɵfac = function EmptyStateTitleComponent_Factory(t) { return new (t || EmptyStateTitleComponent)(); };
EmptyStateTitleComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: EmptyStateTitleComponent, selectors: [["dgp-empty-state-title"]], ngContentSelectors: _c0, decls: 2, vars: 0, consts: [[1, "mat-h1"]], template: function EmptyStateTitleComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵelementStart(0, "h1", 0);
        ɵngcc0.ɵɵprojection(1);
        ɵngcc0.ɵɵelementEnd();
    } }, styles: ["[_nghost-%COMP%] {\n            display: inline-flex;\n            color: gray;\n        }"], changeDetection: 0 });

let DgpEmptyStateModule = class DgpEmptyStateModule {
};
DgpEmptyStateModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: DgpEmptyStateModule });
DgpEmptyStateModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function DgpEmptyStateModule_Factory(t) { return new (t || DgpEmptyStateModule)(); }, imports: [[
            CommonModule,
            MatIconModule
        ]] });

const FILE_VIEWER_CONFIG = new InjectionToken("DgpFileViewerConfig");

function getFileItemSizeLabel(size) {
    if (size < 1000) {
        return (size / (1000)).toFixed(2) + " Kb";
    }
    else {
        return (size / (1000 * 1000)).toFixed(2) + " Mb";
    }
}

function parseFileNameWithExtension(fileNameWithExtension) {
    const lastPeriodIndex = fileNameWithExtension.indexOf(".");
    const extension = fileNameWithExtension.substring(lastPeriodIndex + 1, fileNameWithExtension.length);
    const fileName = fileNameWithExtension.substring(0, lastPeriodIndex);
    return {
        extension, fileName
    };
}
function getMimeTypeFromExtension(extension) {
    switch (extension) {
        case "pdf":
            return "application/pdf";
        default:
            return null;
    }
}
function getFileItemsFromFileList(fileList) {
    const result = new Array();
    for (let i = 0; i < fileList.length; i++) {
        const file = fileList.item(i);
        const objectUrl = URL.createObjectURL(file);
        const fileItem = Object.assign({ fileItemId: createGuid(), size: file.size, url: objectUrl, creationDate: new Date(file.lastModified), isSaved: false }, parseFileNameWithExtension(file.name));
        result.push(fileItem);
    }
    return result;
}
function getFileFromFileItem$(fileItem) {
    return new Promise(resolve => {
        return fetch(fileItem.url, {
            credentials: "include"
        }).then(x => x.blob()).then(x => {
            const file = new Blob([x], {
                type: getMimeTypeFromExtension(fileItem.extension)
            });
            file.name = fileItem.fileName + "." + fileItem.extension;
            resolve(file);
        }).catch(reason => {
            console.error(reason);
        });
    });
}

let FileViewerComponentBase = 
// tslint:disable-next-line:directive-class-suffix
class FileViewerComponentBase {
};
FileViewerComponentBase.ɵfac = function FileViewerComponentBase_Factory(t) { return new (t || FileViewerComponentBase)(); };
FileViewerComponentBase.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: FileViewerComponentBase, inputs: { fileItem: "fileItem" } });
__decorate([
    Input()
], FileViewerComponentBase.prototype, "fileItem", void 0);

let FallbackFileViewerComponent = class FallbackFileViewerComponent extends FileViewerComponentBase {
    constructor(platform) {
        super();
        this.platform = platform;
        this.isTridentOrEdge = this.platform.TRIDENT || this.platform.EDGE;
    }
    ngAfterViewInit() {
        this.isTridentOrEdge = this.platform.TRIDENT || this.platform.EDGE;
    }
    downloadFileInTridentOrEdge() {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield getFileFromFileItem$(this.fileItem);
            window.navigator.msSaveOrOpenBlob(file, file.name);
        });
    }
};
FallbackFileViewerComponent.ɵfac = function FallbackFileViewerComponent_Factory(t) { return new (t || FallbackFileViewerComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc6.Platform)); };
FallbackFileViewerComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: FallbackFileViewerComponent, selectors: [["dgp-fallback-file-viewer"]], features: [ɵngcc0.ɵɵInheritDefinitionFeature], decls: 4, vars: 2, consts: [["title", "No preview available", "matIconName", "get_app"], ["class", "download-link", "target", "_blank", 3, "href", 4, "ngIf", "ngIfElse"], ["ieFallback", ""], ["target", "_blank", 1, "download-link", 3, "href"], ["href", "javascript:;", 1, "download-link", 3, "click"]], template: function FallbackFileViewerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "dgp-empty-state", 0);
        ɵngcc0.ɵɵtemplate(1, FallbackFileViewerComponent_a_1_Template, 3, 4, "a", 1);
        ɵngcc0.ɵɵtemplate(2, FallbackFileViewerComponent_ng_template_2_Template, 2, 0, "ng-template", null, 2, ɵngcc0.ɵɵtemplateRefExtractor);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r2 = ɵngcc0.ɵɵreference(3);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", !ctx.isTridentOrEdge)("ngIfElse", _r2);
    } }, directives: function () { return [EmptyStateComponent, ɵngcc4.NgIf]; }, pipes: function () { return [SafePipe]; }, styles: ["[_nghost-%COMP%] {\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n            width: 100%;\n            height: 100%;\n        }\n\n        .download-link[_ngcontent-%COMP%] {\n            color: inherit;\n        }"], changeDetection: 0 });
FallbackFileViewerComponent.ctorParameters = () => [
    { type: Platform }
];

let FileItemListComponent = class FileItemListComponent {
    constructor() {
        this.fileItemRemoved = new EventEmitter();
    }
    getFileItemSize(fileItem) {
        return getFileItemSizeLabel(fileItem.size);
    }
    removeFileItem(fileItem) {
        if (this.disabled)
            return;
        this.fileItemRemoved.emit(fileItem);
    }
};
FileItemListComponent.ɵfac = function FileItemListComponent_Factory(t) { return new (t || FileItemListComponent)(); };
FileItemListComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: FileItemListComponent, selectors: [["dgp-file-item-list"]], inputs: { disabled: "disabled", model: "model" }, outputs: { fileItemRemoved: "fileItemRemoved" }, decls: 2, vars: 1, consts: [[2, "overflow", "auto"], [4, "ngFor", "ngForOf"], ["mat-subheader", ""], ["mat-list-item", "", "routerLinkActive", "dgp-list-item --selected", "matTooltipShowDelay", "500", 3, "routerLink", "queryParams", "matTooltip", "keydown.delete", 4, "ngFor", "ngForOf"], ["mat-list-item", "", "routerLinkActive", "dgp-list-item --selected", "matTooltipShowDelay", "500", 3, "routerLink", "queryParams", "matTooltip", "keydown.delete"], ["matListIcon", ""], ["matLine", "", 2, "display", "flex", "align-items", "center"], [2, "flex-grow", "1", "display", "flex", "flex-direction", "column", "overflow", "hidden"], [2, "flex-grow", "1", "display", "flex"], [2, "display", "flex"], ["mat-icon-button", "", 2, "margin-left", "16px", 3, "matMenuTriggerFor", "disabled"], ["overflowMenu", "matMenu"], ["mat-menu-item", "", 3, "disabled", "click"]], template: function FileItemListComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "mat-nav-list", 0);
        ɵngcc0.ɵɵtemplate(1, FileItemListComponent_ng_container_1_Template, 4, 2, "ng-container", 1);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.model.directories);
    } }, directives: function () { return [ɵngcc7.MatNavList, ɵngcc4.NgForOf, ɵngcc7.MatListSubheaderCssMatStyler, ɵngcc7.MatListItem, ɵngcc2.RouterLinkWithHref, ɵngcc2.RouterLinkActive, ɵngcc8.MatTooltip, ɵngcc5.MatIcon, ɵngcc7.MatListIconCssMatStyler, ɵngcc9.MatLine, SpacerComponent, ɵngcc10.MatButton, ɵngcc11.MatMenuTrigger, ɵngcc11._MatMenu, ɵngcc11.MatMenuItem]; }, pipes: function () { return [ɵngcc4.DatePipe]; }, styles: ["[_nghost-%COMP%] {\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n            overflow: auto;\n        }"], changeDetection: 0 });
__decorate([
    Input()
], FileItemListComponent.prototype, "disabled", void 0);
__decorate([
    Output()
], FileItemListComponent.prototype, "fileItemRemoved", void 0);
__decorate([
    Input()
], FileItemListComponent.prototype, "model", void 0);

let FileViewerComponent = class FileViewerComponent extends FileViewerComponentBase {
    constructor(config) {
        super();
        this.config = config;
    }
    ngOnChanges(changes) {
        if (changes && changes.fileItem) {
            if (this.fileItem) {
                this.isKnownFileType = this.config.fileTypeViewerMap[this.fileItem.extension] === null
                    || this.config.fileTypeViewerMap[this.fileItem.extension] === undefined;
            }
        }
    }
};
FileViewerComponent.ɵfac = function FileViewerComponent_Factory(t) { return new (t || FileViewerComponent)(ɵngcc0.ɵɵdirectiveInject(FILE_VIEWER_CONFIG)); };
FileViewerComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: FileViewerComponent, selectors: [["dgp-file-viewer"]], features: [ɵngcc0.ɵɵInheritDefinitionFeature, ɵngcc0.ɵɵNgOnChangesFeature], decls: 3, vars: 2, consts: [[4, "ngIf", "ngIfElse"], ["dynamicViewer", ""], [3, "ngSwitch"], [3, "fileItem", 4, "ngSwitchCase"], [3, "fileItem", 4, "ngSwitchDefault"], [3, "fileItem"]], template: function FileViewerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, FileViewerComponent_ng_container_0_Template, 7, 5, "ng-container", 0);
        ɵngcc0.ɵɵtemplate(1, FileViewerComponent_ng_template_1_Template, 1, 1, "ng-template", null, 1, ɵngcc0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        const _r15 = ɵngcc0.ɵɵreference(2);
        ɵngcc0.ɵɵproperty("ngIf", ctx.isKnownFileType)("ngIfElse", _r15);
    } }, directives: function () { return [ɵngcc4.NgIf, ɵngcc4.NgSwitch, ɵngcc4.NgSwitchCase, ɵngcc4.NgSwitchDefault, JpgViewerComponent,
        PdfViewerComponent,
        PngViewerComponent,
        SvgViewerComponent,
        FallbackFileViewerComponent,
        DynamicFileViewerComponent]; }, styles: ["[_nghost-%COMP%] {\n            display: flex;\n            flex-grow: 1;\n            flex-direction: column;\n            justify-content: center;\n            align-items: center;\n        }"], changeDetection: 0 });
FileViewerComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [FILE_VIEWER_CONFIG,] }] }
];
FileViewerComponent = __decorate([ __param(0, Inject(FILE_VIEWER_CONFIG))
], FileViewerComponent);

let DynamicFileViewerComponent = class DynamicFileViewerComponent extends FileViewerComponentBase {
    constructor(componentFactoryResolver, viewContainerRef, config) {
        super();
        this.componentFactoryResolver = componentFactoryResolver;
        this.viewContainerRef = viewContainerRef;
        this.config = config;
    }
    ngOnChanges(changes) {
        if (changes && changes.fileItem) {
            if (this.fileItem) {
                this.loadComponent(this.fileItem);
            }
            else {
                this.clear();
            }
        }
    }
    loadComponent(fileItem) {
        const fileType = fileItem.extension;
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.config.fileTypeViewerMap[fileType.toLowerCase()] ? this.config.fileTypeViewerMap[fileType.toLowerCase()] : this.config.fileTypeViewerMap.default);
        this.viewContainerRef.clear();
        const componentRef = this.viewContainerRef.createComponent(componentFactory);
        const viewerComponent = componentRef.instance;
        viewerComponent.fileItem = this.fileItem;
    }
    clear() {
        this.viewContainerRef.clear();
    }
};
DynamicFileViewerComponent.ɵfac = function DynamicFileViewerComponent_Factory(t) { return new (t || DynamicFileViewerComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ComponentFactoryResolver), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ViewContainerRef), ɵngcc0.ɵɵdirectiveInject(FILE_VIEWER_CONFIG)); };
DynamicFileViewerComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: DynamicFileViewerComponent, selectors: [["dgp-dynamic-file-viewer"]], features: [ɵngcc0.ɵɵInheritDefinitionFeature, ɵngcc0.ɵɵNgOnChangesFeature], decls: 0, vars: 0, template: function DynamicFileViewerComponent_Template(rf, ctx) { }, styles: ["[_nghost-%COMP%] {\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n            width: 100%;\n            height: 100%;\n        }"], changeDetection: 0 });
DynamicFileViewerComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ViewContainerRef },
    { type: undefined, decorators: [{ type: Inject, args: [FILE_VIEWER_CONFIG,] }] }
];
DynamicFileViewerComponent = __decorate([ __param(2, Inject(FILE_VIEWER_CONFIG))
], DynamicFileViewerComponent);

let JpgViewerComponent = class JpgViewerComponent extends FileViewerComponentBase {
    constructor(platform) {
        super();
        this.platform = platform;
        this.isTrident = this.platform.TRIDENT;
    }
};
JpgViewerComponent.ɵfac = function JpgViewerComponent_Factory(t) { return new (t || JpgViewerComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc6.Platform)); };
JpgViewerComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: JpgViewerComponent, selectors: [["dgp-jpg-viewer"]], features: [ɵngcc0.ɵɵInheritDefinitionFeature], decls: 3, vars: 2, consts: [["class", "image", 3, "src", "alt", 4, "ngIf", "ngIfElse"], ["fallback", ""], [1, "image", 3, "src", "alt"], [1, "trident-container"], [1, "trident-image", 3, "src", "alt"]], template: function JpgViewerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, JpgViewerComponent_img_0_Template, 2, 5, "img", 0);
        ɵngcc0.ɵɵtemplate(1, JpgViewerComponent_ng_template_1_Template, 3, 5, "ng-template", null, 1, ɵngcc0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        const _r23 = ɵngcc0.ɵɵreference(2);
        ɵngcc0.ɵɵproperty("ngIf", !ctx.isTrident)("ngIfElse", _r23);
    } }, directives: function () { return [ɵngcc4.NgIf]; }, pipes: function () { return [SafePipe]; }, styles: ["[_nghost-%COMP%] {\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n            width: 100%;\n            height: 100%;\n        }\n\n        .image[_ngcontent-%COMP%] {\n            max-width: 100%;\n            max-height: 100%;\n            object-fit: contain;\n        }\n\n        .trident-container[_ngcontent-%COMP%] {\n            display: flex;\n            overflow: auto;\n            flex-shrink: 0;\n        }\n\n        .trident-image[_ngcontent-%COMP%] {\n            margin: auto;\n            flex-shrink: 0;\n        }"], changeDetection: 0 });
JpgViewerComponent.ctorParameters = () => [
    { type: Platform }
];

let PdfViewerComponent = class PdfViewerComponent extends FileViewerComponentBase {
    constructor(platform, cd) {
        super();
        this.platform = platform;
        this.cd = cd;
    }
    ngOnChanges(changes) {
        if (changes.fileItem && this.platform.EDGE) {
            this.edgeHTML = `
                <embed src="${this.fileItem.url}"
                       type="application/pdf"
                       width="100%"
                       height="100%">
            `;
            this.cd.markForCheck();
        }
    }
};
PdfViewerComponent.ɵfac = function PdfViewerComponent_Factory(t) { return new (t || PdfViewerComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc6.Platform), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef)); };
PdfViewerComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: PdfViewerComponent, selectors: [["dgp-pdf-viewer"]], features: [ɵngcc0.ɵɵInheritDefinitionFeature, ɵngcc0.ɵɵNgOnChangesFeature], decls: 3, vars: 2, consts: [[4, "ngIf", "ngIfElse"], ["fallback", ""], [4, "ngIf"], ["type", "application/pdf", "width", "100%", "height", "100%"], [3, "fileItem"], [1, "edge-helper", 3, "innerHTML"]], template: function PdfViewerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, PdfViewerComponent_ng_container_0_Template, 3, 2, "ng-container", 0);
        ɵngcc0.ɵɵtemplate(1, PdfViewerComponent_ng_template_1_Template, 1, 1, "ng-template", null, 1, ɵngcc0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        const _r26 = ɵngcc0.ɵɵreference(2);
        ɵngcc0.ɵɵproperty("ngIf", ctx.platform.FIREFOX || ctx.platform.BLINK || ctx.platform.EDGE)("ngIfElse", _r26);
    } }, directives: function () { return [ɵngcc4.NgIf, FallbackFileViewerComponent]; }, pipes: function () { return [SafePipe]; }, styles: ["[_nghost-%COMP%] {\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n            width: 100%;\n            height: 100%;\n        }\n\n        .edge-helper[_ngcontent-%COMP%] {\n            flex-grow: 1;\n        }"], changeDetection: 0 });
PdfViewerComponent.ctorParameters = () => [
    { type: Platform },
    { type: ChangeDetectorRef }
];

let PngViewerComponent = class PngViewerComponent extends FileViewerComponentBase {
    constructor(platform) {
        super();
        this.platform = platform;
        this.isTrident = this.platform.TRIDENT;
    }
};
PngViewerComponent.ɵfac = function PngViewerComponent_Factory(t) { return new (t || PngViewerComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc6.Platform)); };
PngViewerComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: PngViewerComponent, selectors: [["dgp-png-viewer"]], features: [ɵngcc0.ɵɵInheritDefinitionFeature], decls: 3, vars: 2, consts: [["class", "image", 3, "src", "alt", 4, "ngIf", "ngIfElse"], ["fallback", ""], [1, "image", 3, "src", "alt"], [1, "trident-container"], [1, "trident-image", 3, "src", "alt"]], template: function PngViewerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, PngViewerComponent_img_0_Template, 2, 5, "img", 0);
        ɵngcc0.ɵɵtemplate(1, PngViewerComponent_ng_template_1_Template, 3, 5, "ng-template", null, 1, ɵngcc0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        const _r31 = ɵngcc0.ɵɵreference(2);
        ɵngcc0.ɵɵproperty("ngIf", !ctx.isTrident)("ngIfElse", _r31);
    } }, directives: function () { return [ɵngcc4.NgIf]; }, pipes: function () { return [SafePipe]; }, styles: ["[_nghost-%COMP%] {\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n            width: 100%;\n            height: 100%;\n        }\n\n        .image[_ngcontent-%COMP%] {\n            max-width: 100%;\n            max-height: 100%;\n            object-fit: contain;\n        }\n\n        .trident-container[_ngcontent-%COMP%] {\n            display: flex;\n            overflow: auto;\n            flex-shrink: 0;\n        }\n\n        .trident-image[_ngcontent-%COMP%] {\n            margin: auto;\n            flex-shrink: 0;\n        }"], changeDetection: 0 });
PngViewerComponent.ctorParameters = () => [
    { type: Platform }
];

let SvgViewerComponent = class SvgViewerComponent extends FileViewerComponentBase {
    constructor(platform) {
        super();
        this.platform = platform;
        this.isTrident = this.platform.TRIDENT;
    }
};
SvgViewerComponent.ɵfac = function SvgViewerComponent_Factory(t) { return new (t || SvgViewerComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc6.Platform)); };
SvgViewerComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: SvgViewerComponent, selectors: [["dgp-svg-viewer"]], features: [ɵngcc0.ɵɵInheritDefinitionFeature], decls: 3, vars: 2, consts: [["class", "image", 3, "src", "alt", 4, "ngIf", "ngIfElse"], ["fallback", ""], [1, "image", 3, "src", "alt"], [1, "trident-container"], [1, "trident-image", 3, "src", "alt"]], template: function SvgViewerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, SvgViewerComponent_img_0_Template, 2, 5, "img", 0);
        ɵngcc0.ɵɵtemplate(1, SvgViewerComponent_ng_template_1_Template, 3, 5, "ng-template", null, 1, ɵngcc0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        const _r34 = ɵngcc0.ɵɵreference(2);
        ɵngcc0.ɵɵproperty("ngIf", !ctx.isTrident)("ngIfElse", _r34);
    } }, directives: function () { return [ɵngcc4.NgIf]; }, pipes: function () { return [SafePipe]; }, styles: ["[_nghost-%COMP%] {\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n            width: 100%;\n            height: 100%;\n        }\n\n        .image[_ngcontent-%COMP%] {\n            max-width: 100%;\n            max-height: 100%;\n            object-fit: contain;\n        }\n\n        .trident-container[_ngcontent-%COMP%] {\n            display: flex;\n            overflow: auto;\n            flex-shrink: 0;\n        }\n\n        .trident-image[_ngcontent-%COMP%] {\n            margin: auto;\n            flex-shrink: 0;\n        }"], changeDetection: 0 });
SvgViewerComponent.ctorParameters = () => [
    { type: Platform }
];

let SpacerComponent = class SpacerComponent {
};
SpacerComponent.ɵfac = function SpacerComponent_Factory(t) { return new (t || SpacerComponent)(); };
SpacerComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: SpacerComponent, selectors: [["dgp-spacer"]], decls: 0, vars: 0, template: function SpacerComponent_Template(rf, ctx) { }, styles: ["[_nghost-%COMP%] {\n            flex-grow: 1;\n        }"], changeDetection: 0 });

let DgpSpacerModule = class DgpSpacerModule {
};
DgpSpacerModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: DgpSpacerModule });
DgpSpacerModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function DgpSpacerModule_Factory(t) { return new (t || DgpSpacerModule)(); } });

let SafePipe = class SafePipe {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(value, type) {
        switch (type) {
            case "html":
                return this.sanitizer.bypassSecurityTrustHtml(value);
            case "style":
                return this.sanitizer.bypassSecurityTrustStyle(value);
            case "script":
                return this.sanitizer.bypassSecurityTrustScript(value);
            case "url":
                return this.sanitizer.bypassSecurityTrustUrl(value);
            case "resourceUrl":
                return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            default:
                throw new Error(`Invalid safe type specified: ${type}`);
        }
    }
};
SafePipe.ɵfac = function SafePipe_Factory(t) { return new (t || SafePipe)(ɵngcc0.ɵɵdirectiveInject(ɵngcc12.DomSanitizer)); };
SafePipe.ɵpipe = ɵngcc0.ɵɵdefinePipe({ name: "safe", type: SafePipe, pure: true });
SafePipe.ctorParameters = () => [
    { type: DomSanitizer }
];

let SafePipeModule = class SafePipeModule {
};
SafePipeModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: SafePipeModule });
SafePipeModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function SafePipeModule_Factory(t) { return new (t || SafePipeModule)(); } });

var DgpFileViewerModule_1;
// TODO: Add bmp
const defaultFileTypeViewerMap = {};
const defaultFileViewerConfig = {
    fileTypeViewerMap: defaultFileTypeViewerMap
};
let DgpFileViewerModule = DgpFileViewerModule_1 = class DgpFileViewerModule {
    static forRoot(config = defaultFileViewerConfig) {
        return {
            ngModule: DgpFileViewerModule_1,
            providers: [{
                    provide: FILE_VIEWER_CONFIG,
                    useValue: config
                }]
        };
    }
};
DgpFileViewerModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: DgpFileViewerModule });
DgpFileViewerModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function DgpFileViewerModule_Factory(t) { return new (t || DgpFileViewerModule)(); }, providers: [{
            provide: FILE_VIEWER_CONFIG,
            useValue: defaultFileViewerConfig
        }], imports: [[
            PlatformModule,
            DgpEmptyStateModule,
            MatListModule,
            RouterModule,
            CommonModule,
            MatTooltipModule,
            MatIconModule,
            DgpSpacerModule,
            MatButtonModule,
            MatMenuModule,
            SafePipeModule
        ]] });

const openFileManagerOverlay = createAction("[FileUpload] OpenFileManagerOverlay", props());
const openFileManager = openFileManagerOverlay;
const closeFileManager = createAction("[FileUpload] CloseFileManager");
const addFilesViaDrop = createAction("[FileUpload] AddFiles", props());
const addFiles = addFilesViaDrop;
const removeFile = createAction("[FileUpload] RemoveFile", props());
const showDropTarget = createAction("[FileUpload] ShowDropTarget");
const hideDropTarget = createAction("[FileUpload] HideDropTarget");
const setConfig = createAction("[FileUpload] SetConfig", props());

let DragFileListenerDirective = class DragFileListenerDirective {
    constructor(store, elementRef) {
        this.store = store;
        this.elementRef = elementRef;
        function dragOverHandler(e) {
            e.preventDefault();
            store.dispatch(openFileManager({}));
        }
        this.elementRef.nativeElement.addEventListener("dragover", dragOverHandler);
    }
};
DragFileListenerDirective.ɵfac = function DragFileListenerDirective_Factory(t) { return new (t || DragFileListenerDirective)(ɵngcc0.ɵɵdirectiveInject(ɵngcc1.Store), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef)); };
DragFileListenerDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: DragFileListenerDirective, selectors: [["", "dgpFileDragListener", ""]] });
DragFileListenerDirective.ctorParameters = () => [
    { type: Store },
    { type: ElementRef }
];

function openFileManagerShortKeyFilter(x) {
    return x.keyCode === 70 && x.altKey;
}
const defaultFileUploadConfig = {
    fileManagerMatDialogConfig: {
        height: "80%",
        width: "80%",
        panelClass: "dgp-file-manager-overlay"
    },
    maximizedClass: "dgp-file-manager-overlay--maximized",
    openFileManagerShortKeyFilter,
    editingCapabilities: {
        canAddFiles: true,
        canRemoveFiles: true
    },
    canOpenFileDrawer: true
};
const FILE_UPLOAD_CONFIG = new InjectionToken("FileUploadConfig");
const fileUploadStoreFeature = "FileUpload";

const fileUploadFeatureSelector = createFeatureSelector(fileUploadStoreFeature);
const ɵ0$4 = x => x.fileItem;
const getFileItemState = createSelector(fileUploadFeatureSelector, ɵ0$4);
const ɵ1$3 = x => x.directory;
const getDirectoryState = createSelector(fileUploadFeatureSelector, ɵ1$3);
const ɵ2$2 = x => getAll(x);
const getAllFileItems = createSelector(getFileItemState, ɵ2$2);
const ɵ3$1 = x => x.entities;
const getFileItemKVS = createSelector(getFileItemState, ɵ3$1);
const ɵ4 = x => getAll(x);
const getAllDirectories = createSelector(getDirectoryState, ɵ4);
const ɵ5 = (directories, fileItemKVS) => {
    return {
        directories, fileItemKVS
    };
};
const getFileItemListModel = createSelector(getAllDirectories, getFileItemKVS, ɵ5);
const ɵ6 = x => getFirstSelected(x);
const getSelectedFileItem = createSelector(getFileItemState, ɵ6);
const ɵ7 = x => x.isFileManagerOpen;
const isFileManagerOpen = createSelector(fileUploadFeatureSelector, ɵ7);
const ɵ8 = x => x.initialConfig.canOpenFileDrawer;
const canOpenFileDrawer = createSelector(fileUploadFeatureSelector, ɵ8);
const ɵ9 = x => !x.initialConfig.editingCapabilities.canAddFiles;
const isAddFilesDisabled = createSelector(fileUploadFeatureSelector, ɵ9);
const ɵ10 = x => !x.initialConfig.editingCapabilities.canRemoveFiles;
const isRemoveFilesDisabled = createSelector(fileUploadFeatureSelector, ɵ10);
const ɵ11 = x => x.initialConfig.editingCapabilities.canAddFiles
    && (x.isDropTargetVisible || x.fileItem.ids.length === 0);
const isDropTargetVisible = createSelector(fileUploadFeatureSelector, ɵ11);

let OpenFileManagerViaShortKeyDirective = class OpenFileManagerViaShortKeyDirective {
    constructor(store, moduleConfig) {
        this.store = store;
        this.moduleConfig = moduleConfig;
        this.keyPressSubscription = fromEvent(document, "keydown")
            .pipe(filter(this.moduleConfig.openFileManagerShortKeyFilter), switchMap(() => this.store.select(isFileManagerOpen)
            .pipe(first())
            .toPromise()), filter(x => !x), tap(() => this.store.dispatch(openFileManager({}))))
            .subscribe();
    }
    ngOnDestroy() {
        if (!this.keyPressSubscription.closed) {
            this.keyPressSubscription.unsubscribe();
        }
    }
};
OpenFileManagerViaShortKeyDirective.ɵfac = function OpenFileManagerViaShortKeyDirective_Factory(t) { return new (t || OpenFileManagerViaShortKeyDirective)(ɵngcc0.ɵɵdirectiveInject(ɵngcc1.Store), ɵngcc0.ɵɵdirectiveInject(FILE_UPLOAD_CONFIG)); };
OpenFileManagerViaShortKeyDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: OpenFileManagerViaShortKeyDirective, selectors: [["", "dgpOpenFileManagerViaShortKey", ""]] });
OpenFileManagerViaShortKeyDirective.ctorParameters = () => [
    { type: Store },
    { type: undefined, decorators: [{ type: Inject, args: [FILE_UPLOAD_CONFIG,] }] }
];
OpenFileManagerViaShortKeyDirective = __decorate([ __param(1, Inject(FILE_UPLOAD_CONFIG))
], OpenFileManagerViaShortKeyDirective);

const fileUploadEntityStore = createEntityStore({
    storeFeature: "FileUpload",
    entityTypes: [
        "directory",
        "fileItem"
    ]
});
const ɵ0$5 = (state = false, action) => {
    switch (action.type) {
        case openFileManagerOverlay.type:
            return true;
        case closeFileManager.type:
            return false;
        default:
            return state;
    }
}, ɵ1$4 = (state = false, action) => {
    switch (action.type) {
        case showDropTarget.type:
            return true;
        case hideDropTarget.type:
            return false;
        default:
            return state;
    }
}, ɵ2$3 = (state = defaultFileUploadConfig, action) => {
    if (action.type === setConfig.type) {
        return action.config;
    }
    else {
        return state;
    }
};
const fileUploadReducer = Object.assign(Object.assign({}, fileUploadEntityStore.reducers), { isFileManagerOpen: ɵ0$5, isDropTargetVisible: ɵ1$4, initialConfig: ɵ2$3 });

let DgpContainer = 
// tslint:disable-next-line:directive-class-suffix
class DgpContainer {
    constructor(store) {
        this.store = store;
        this.dispatch = (x) => this.store.dispatch(x);
        this.select = (x) => this.store.select(x);
    }
};
DgpContainer.ɵfac = function DgpContainer_Factory(t) { return new (t || DgpContainer)(ɵngcc0.ɵɵdirectiveInject(ɵngcc1.Store)); };
DgpContainer.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: DgpContainer });
DgpContainer.ctorParameters = () => [
    { type: Store }
];

let FileManagerComponent = class FileManagerComponent extends DgpContainer {
    constructor(store, elementRef, dialogRef, moduleConfig) {
        super(store);
        this.store = store;
        this.elementRef = elementRef;
        this.dialogRef = dialogRef;
        this.moduleConfig = moduleConfig;
        this.isMaximized = false;
        this.isDropTargetVisible$ = this.select(isDropTargetVisible);
        this.fileItemListModel$ = this.select(getFileItemListModel);
        this.selectedFileItem$ = this.select(getSelectedFileItem);
        this.isRemoveFilesDisabled$ = this.select(isRemoveFilesDisabled);
        this.isAddFilesDisabled$ = this.select(isAddFilesDisabled);
        this.canOpenFileDrawer$ = this.select(canOpenFileDrawer);
        this.dragEnterHandler = (e) => {
            e.preventDefault();
            this.dispatch(showDropTarget());
        };
        this.dragLeaveHandler = (e) => {
            e.preventDefault();
            this.dispatch(hideDropTarget());
        };
        this.dragOverHandler = (e) => {
            e.preventDefault();
        };
        this.dropHandler = (e) => {
            e.preventDefault();
            const fileItems = getFileItemsFromFileList(e.dataTransfer.files);
            this.store.dispatch(hideDropTarget());
            this.store.dispatch(addFilesViaDrop({ fileItems }));
        };
    }
    ngAfterViewInit() {
        this.elementRef.nativeElement.addEventListener("dragenter", this.dragEnterHandler);
        this.elementRef.nativeElement.addEventListener("dragleave", this.dragLeaveHandler);
        this.elementRef.nativeElement.addEventListener("drop", this.dropHandler);
        this.elementRef.nativeElement.addEventListener("dragover", this.dragOverHandler);
    }
    ngOnDestroy() {
        this.elementRef.nativeElement.removeEventListener("dragenter", this.dragEnterHandler);
        this.elementRef.nativeElement.removeEventListener("dragleave", this.dragLeaveHandler);
        this.elementRef.nativeElement.removeEventListener("drop", this.dropHandler);
        this.elementRef.nativeElement.removeEventListener("dragover", this.dragOverHandler);
    }
    removeFileItem(fileItem) {
        this.dispatch(removeFile({ fileItem }));
    }
    onFileSelected(e) {
        const fileItems = getFileItemsFromFileList(e.target.files);
        this.dispatch(addFilesViaDrop({ fileItems }));
    }
    maximize() {
        this.dialogRef.addPanelClass(this.moduleConfig.maximizedClass);
        this.isMaximized = true;
    }
    minimize() {
        this.dialogRef.removePanelClass(this.moduleConfig.maximizedClass);
        this.isMaximized = false;
    }
};
FileManagerComponent.ɵfac = function FileManagerComponent_Factory(t) { return new (t || FileManagerComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc1.Store), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc13.MatDialogRef), ɵngcc0.ɵɵdirectiveInject(FILE_UPLOAD_CONFIG)); };
FileManagerComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: FileManagerComponent, selectors: [["dgp-file-manager"]], features: [ɵngcc0.ɵɵInheritDefinitionFeature], decls: 4, vars: 4, consts: [[4, "ngIf", "ngIfElse"], ["dropTarget", ""], ["mat-dialog-title", "", 2, "display", "flex", "align-items", "center"], ["mat-icon-button", "", "matTooltip", "Maximize", 3, "click", 4, "ngIf"], ["mat-icon-button", "", "matTooltip", "Minimize", 3, "click", 4, "ngIf"], ["mat-icon-button", "", "mat-dialog-close", "", "matTooltip", "Close dialog"], ["singleFileMode", ""], ["mat-icon-button", "", "matTooltip", "Maximize", 3, "click"], ["mat-icon-button", "", "matTooltip", "Minimize", 3, "click"], ["dgp-list-details-page-menu", ""], [3, "model", "disabled", "fileItemRemoved"], [4, "ngIf"], [3, "fileItem"], ["mat-list-item", "", 3, "click"], ["matLine", ""], ["hidden", "", "multiple", "", "type", "file", 3, "change"], ["filePicker", ""], ["title", "Drop file here", "matIconName", "get_app", 1, "drop-target"], ["mat-button", "", 2, "display", "flex", "max-width", "480px", "width", "100%", "justify-content", "center", "margin-top", "16px", 3, "disabled", "click"], [2, "margin-right", "4px"]], template: function FileManagerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, FileManagerComponent_ng_container_0_Template, 13, 6, "ng-container", 0);
        ɵngcc0.ɵɵpipe(1, "async");
        ɵngcc0.ɵɵtemplate(2, FileManagerComponent_ng_template_2_Template, 12, 3, "ng-template", null, 1, ɵngcc0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        const _r37 = ɵngcc0.ɵɵreference(3);
        ɵngcc0.ɵɵproperty("ngIf", ɵngcc0.ɵɵpipeBind1(1, 2, ctx.isDropTargetVisible$) === false)("ngIfElse", _r37);
    } }, directives: function () { return [ɵngcc4.NgIf, ɵngcc13.MatDialogTitle, SpacerComponent, ɵngcc10.MatButton, ɵngcc13.MatDialogClose, ɵngcc8.MatTooltip, ɵngcc5.MatIcon, ListDetailsPageComponent,
        FileItemListComponent,
        FileViewerComponent, ɵngcc7.MatNavList, ɵngcc7.MatListItem, ɵngcc9.MatLine, EmptyStateComponent]; }, pipes: function () { return [ɵngcc4.AsyncPipe]; }, styles: ["[_nghost-%COMP%] {\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n            width: 100%;\n            height: 100%;\n        }\n\n        .drop-target[_ngcontent-%COMP%] {\n            border: 2px dashed white;\n            max-height: 100%;\n        }"], changeDetection: 0 });
FileManagerComponent.ctorParameters = () => [
    { type: Store },
    { type: ElementRef },
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [FILE_UPLOAD_CONFIG,] }] }
];
FileManagerComponent = __decorate([ __param(3, Inject(FILE_UPLOAD_CONFIG))
], FileManagerComponent);

let FileUploadEffects = class FileUploadEffects {
    constructor(actions$, store, matDialog, activatedRoute, router, moduleConfig) {
        this.actions$ = actions$;
        this.store = store;
        this.matDialog = matDialog;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.moduleConfig = moduleConfig;
        this.openFileManagerOverlay$ = this.actions$.pipe(ofType(openFileManagerOverlay), tap(action => {
            if (action.fileItems) {
                this.store.dispatch(fileUploadEntityStore.actions.composeEntityActions({
                    set: {
                        fileItem: createKVSFromArray(action.fileItems, x => x.fileItemId),
                        directory: createKVSFromArray(action.directories, x => x.directoryId),
                    }
                }));
            }
            if (action.config) {
                this.store.dispatch(setConfig({
                    config: action.config
                }));
            }
        }), switchMap(action => {
            const dialogRef = this.matDialog
                .open(FileManagerComponent, action.config ? action.config.fileManagerMatDialogConfig : this.moduleConfig.fileManagerMatDialogConfig);
            if (action.selectedFileItemId) {
                this.store.dispatch(fileUploadEntityStore.actions.composeEntityActions({
                    select: {
                        fileItem: [action.selectedFileItemId]
                    }
                }));
            }
            return dialogRef.afterClosed();
        }), map(() => closeFileManager()));
        this.addFilesViaDrop$ = this.actions$.pipe(ofType(addFilesViaDrop), switchMap(action => {
            return this.store.select(getAllDirectories).pipe(first(), map(directories => {
                if (directories.length > 0) {
                    const directory = directories[0];
                    this.router.navigate([], {
                        queryParams: {
                            fileItemId: action.fileItems[0].fileItemId
                        }
                    });
                    return fileUploadEntityStore.actions.composeEntityActions({
                        add: {
                            fileItem: createKVSFromArray(action.fileItems, x => x.fileItemId)
                        },
                        update: {
                            directory: {
                                [directory.directoryId]: {
                                    fileItemIds: directory.fileItemIds.concat(action.fileItems.map(x => x.fileItemId))
                                }
                            }
                        }
                    });
                }
                else {
                    this.router.navigate([], {
                        queryParams: {
                            fileItemId: action.fileItems[0].fileItemId
                        }
                    });
                    return fileUploadEntityStore.actions.composeEntityActions({
                        add: {
                            fileItem: createKVSFromArray(action.fileItems, x => x.fileItemId),
                            directory: {
                                ["Files"]: {
                                    directoryId: "Files",
                                    label: "Files",
                                    fileItemIds: action.fileItems.map(x => x.fileItemId)
                                }
                            }
                        }
                    });
                }
            }));
        }));
        this.selectFileItem$ = this.activatedRoute.queryParams.pipe(map((x) => x.fileItemId), distinctUntilChanged(), map(fileItemId => {
            if (!fileItemId) {
                return fileUploadEntityStore.actions.composeEntityActions({
                    select: {
                        fileItem: []
                    }
                });
            }
            return fileUploadEntityStore.actions.composeEntityActions({
                select: {
                    fileItem: [fileItemId]
                }
            });
        }));
        this.removeFile$ = this.actions$.pipe(ofType(removeFile), map(action => fileUploadEntityStore.actions.composeEntityActions({
            remove: {
                fileItem: [action.fileItem.fileItemId]
            }
        })));
        this.store.dispatch(setConfig({
            config: moduleConfig
        }));
    }
};
FileUploadEffects.ɵfac = function FileUploadEffects_Factory(t) { return new (t || FileUploadEffects)(ɵngcc0.ɵɵinject(ɵngcc3.Actions), ɵngcc0.ɵɵinject(ɵngcc1.Store), ɵngcc0.ɵɵinject(ɵngcc13.MatDialog), ɵngcc0.ɵɵinject(ɵngcc2.ActivatedRoute), ɵngcc0.ɵɵinject(ɵngcc2.Router), ɵngcc0.ɵɵinject(FILE_UPLOAD_CONFIG)); };
FileUploadEffects.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: FileUploadEffects, factory: FileUploadEffects.ɵfac });
FileUploadEffects.ctorParameters = () => [
    { type: Actions },
    { type: Store },
    { type: MatDialog },
    { type: ActivatedRoute },
    { type: Router },
    { type: undefined, decorators: [{ type: Inject, args: [FILE_UPLOAD_CONFIG,] }] }
];
__decorate([
    Effect()
], FileUploadEffects.prototype, "openFileManagerOverlay$", void 0);
__decorate([
    Effect()
], FileUploadEffects.prototype, "addFilesViaDrop$", void 0);
__decorate([
    Effect()
], FileUploadEffects.prototype, "selectFileItem$", void 0);
__decorate([
    Effect()
], FileUploadEffects.prototype, "removeFile$", void 0);
FileUploadEffects = __decorate([ __param(5, Inject(FILE_UPLOAD_CONFIG))
], FileUploadEffects);

const requestStoreFeature = "Requests";

const requestStateSelector = createFeatureSelector(requestStoreFeature);
const ɵ0$6 = x => x.requests.pendingRequests > 0;
const hasPendingRequests = createSelector(requestStateSelector, ɵ0$6);
const ɵ1$5 = x => x;
const hasPendingRequestsSelector = createSelector(hasPendingRequests, ɵ1$5);

let PageHeaderComponent = class PageHeaderComponent extends DgpContainer {
    constructor() {
        super(...arguments);
        this.hasPendingRequests$ = this.select(hasPendingRequestsSelector);
    }
};
PageHeaderComponent.ɵfac = function PageHeaderComponent_Factory(t) { return ɵPageHeaderComponent_BaseFactory(t || PageHeaderComponent); };
PageHeaderComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: PageHeaderComponent, selectors: [["dgp-page-header"]], features: [ɵngcc0.ɵɵInheritDefinitionFeature], ngContentSelectors: _c0, decls: 5, vars: 3, consts: [["color", "primary", 1, "toolbar"], [1, "progress-bar-container"], ["color", "accent", "mode", "query", 4, "ngIf"], ["color", "accent", "mode", "query"]], template: function PageHeaderComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵelementStart(0, "mat-toolbar", 0);
        ɵngcc0.ɵɵelementStart(1, "div", 1);
        ɵngcc0.ɵɵtemplate(2, PageHeaderComponent_mat_progress_bar_2_Template, 1, 0, "mat-progress-bar", 2);
        ɵngcc0.ɵɵpipe(3, "async");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵprojection(4);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngIf", ɵngcc0.ɵɵpipeBind1(3, 1, ctx.hasPendingRequests$));
    } }, directives: [ɵngcc14.MatToolbar, ɵngcc4.NgIf, ɵngcc15.MatProgressBar], pipes: [ɵngcc4.AsyncPipe], styles: [".toolbar[_ngcontent-%COMP%] {\n            position: relative;\n        }\n\n        .progress-bar-container[_ngcontent-%COMP%] {\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n        }"], changeDetection: 0 });

let DgpPageHeaderModule = class DgpPageHeaderModule {
};
DgpPageHeaderModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: DgpPageHeaderModule });
DgpPageHeaderModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function DgpPageHeaderModule_Factory(t) { return new (t || DgpPageHeaderModule)(); }, providers: [], imports: [[
            CommonModule,
            MatToolbarModule,
            MatProgressBarModule
        ]] });

// hamburger menu
const setHamburgerMenuState = createAction("[HamburgerShell] SetHamburgerMenuState", props());
const toggleHamburgerMenu = createAction("[HamburgerShell] ToggleHamburgerMenu");
const closeHamburgerMenu = createAction("[HamburgerShell] CloseHamburgerMenu");
// list-details page
const setListDetailsPageState = createAction("[HamburgerShell] SetListDetailsPageState", props());
const toggleListDetailsPageMenu = createAction("[HamburgerShell] ToggleListDetailsPageMenu");
const closeListDetailsMenu = createAction("[HamburgerShell] CloseListDetailsPageMenu");

var HamburgerShellMode;
(function (HamburgerShellMode) {
    HamburgerShellMode[HamburgerShellMode["Responsive"] = 0] = "Responsive";
    HamburgerShellMode[HamburgerShellMode["Overlay"] = 1] = "Overlay";
    HamburgerShellMode[HamburgerShellMode["SideNav"] = 2] = "SideNav";
})(HamburgerShellMode || (HamburgerShellMode = {}));
var ListDetailsPageMode;
(function (ListDetailsPageMode) {
    ListDetailsPageMode[ListDetailsPageMode["Responsive"] = 0] = "Responsive";
    ListDetailsPageMode[ListDetailsPageMode["Overlay"] = 1] = "Overlay";
    ListDetailsPageMode[ListDetailsPageMode["SideNav"] = 2] = "SideNav";
})(ListDetailsPageMode || (ListDetailsPageMode = {}));
const responsiveHamburgerShellConfig = {
    hamburgerShellMode: HamburgerShellMode.Responsive,
    hamburgerMenuBreakpoints: [
        Breakpoints.XLarge
    ],
    listDetailsPageMode: ListDetailsPageMode.Responsive,
    listDetailsPageMenuBreakpoints: [
        Breakpoints.Large,
        Breakpoints.XLarge
    ]
};
const sideNavHamburgerShellConfig = {
    hamburgerShellMode: HamburgerShellMode.SideNav,
    listDetailsPageMode: ListDetailsPageMode.SideNav
};
const overlayHamburgerShellConfig = {
    hamburgerShellMode: HamburgerShellMode.Overlay,
    listDetailsPageMode: ListDetailsPageMode.Overlay
};
const defaultHamburgerShellConfig = responsiveHamburgerShellConfig;
const HAMBURGER_SHELL_CONFIG = new InjectionToken("HamburgerShellConfig");
const sideNavHamburgerShellConfigProvider = {
    provide: HAMBURGER_SHELL_CONFIG,
    useValue: sideNavHamburgerShellConfig
};
const overlayHamburgerShellConfigProvider = {
    provide: HAMBURGER_SHELL_CONFIG,
    useValue: overlayHamburgerShellConfig
};
const defaultHamburgerShellConfigProvider = {
    provide: HAMBURGER_SHELL_CONFIG,
    useValue: defaultHamburgerShellConfig
};
const hamburgerShellStoreFeature = "HamburgerShell";

const hamburgerShellFeatureSelector = createFeatureSelector(hamburgerShellStoreFeature);
const ɵ0$7 = x => x.hamburgerMenuMode;
const hamburgerMenuModeSelector = createSelector(hamburgerShellFeatureSelector, ɵ0$7);
const ɵ1$6 = x => x.isHamburgerMenuOpen;
const isHamburgerMenuOpenSelector = createSelector(hamburgerShellFeatureSelector, ɵ1$6);
const ɵ2$4 = x => x.pageMenuMode;
const pageMenuModeSelector = createSelector(hamburgerShellFeatureSelector, ɵ2$4);
const ɵ3$2 = x => x.isPageMenuOpen;
const isPageMenuOpenSelector = createSelector(hamburgerShellFeatureSelector, ɵ3$2);

let ListDetailsPageComponent = class ListDetailsPageComponent extends DgpContainer {
    constructor() {
        super(...arguments);
        this.pageMenuDrawerMode$ = this.select(pageMenuModeSelector);
        this.isPageMenuDrawerOpen$ = this.select(isPageMenuOpenSelector);
    }
    closePageMenuDrawer() {
        this.dispatch(closeListDetailsMenu());
    }
    togglePageMenuDrawer() {
        this.dispatch(toggleListDetailsPageMenu());
    }
};
ListDetailsPageComponent.ɵfac = function ListDetailsPageComponent_Factory(t) { return ɵListDetailsPageComponent_BaseFactory(t || ListDetailsPageComponent); };
ListDetailsPageComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: ListDetailsPageComponent, selectors: [["dgp-list-details-page"]], features: [ɵngcc0.ɵɵInheritDefinitionFeature], ngContentSelectors: _c4, decls: 13, vars: 10, consts: [[1, "page-menu-drawer-container"], [1, "page-menu-drawer", "mat-elevation-z4", 3, "mode", "opened", "closed"], [1, "page-menu-drawer-content"], [1, "page-menu-drawer-toggle-container"], ["mat-icon-button", "", "matTooltip", "Toggle menu drawer", 3, "click"], [4, "ngIf", "ngIfElse"], ["closedIcon", ""]], template: function ListDetailsPageComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef(_c3);
        ɵngcc0.ɵɵelementStart(0, "mat-drawer-container", 0);
        ɵngcc0.ɵɵelementStart(1, "mat-drawer", 1);
        ɵngcc0.ɵɵlistener("closed", function ListDetailsPageComponent_Template_mat_drawer_closed_1_listener() { return ctx.closePageMenuDrawer(); });
        ɵngcc0.ɵɵpipe(2, "async");
        ɵngcc0.ɵɵpipe(3, "async");
        ɵngcc0.ɵɵprojection(4);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(5, "mat-drawer-content", 2);
        ɵngcc0.ɵɵelementStart(6, "div", 3);
        ɵngcc0.ɵɵelementStart(7, "button", 4);
        ɵngcc0.ɵɵlistener("click", function ListDetailsPageComponent_Template_button_click_7_listener() { return ctx.togglePageMenuDrawer(); });
        ɵngcc0.ɵɵtemplate(8, ListDetailsPageComponent_mat_icon_8_Template, 2, 0, "mat-icon", 5);
        ɵngcc0.ɵɵpipe(9, "async");
        ɵngcc0.ɵɵtemplate(10, ListDetailsPageComponent_ng_template_10_Template, 2, 0, "ng-template", null, 6, ɵngcc0.ɵɵtemplateRefExtractor);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵprojection(12, 1);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r61 = ɵngcc0.ɵɵreference(11);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("mode", ɵngcc0.ɵɵpipeBind1(2, 4, ctx.pageMenuDrawerMode$))("opened", ɵngcc0.ɵɵpipeBind1(3, 6, ctx.isPageMenuDrawerOpen$));
        ɵngcc0.ɵɵadvance(7);
        ɵngcc0.ɵɵproperty("ngIf", ɵngcc0.ɵɵpipeBind1(9, 8, ctx.isPageMenuDrawerOpen$))("ngIfElse", _r61);
    } }, directives: [ɵngcc16.MatDrawerContainer, ɵngcc16.MatDrawer, ɵngcc16.MatDrawerContent, ɵngcc10.MatButton, ɵngcc8.MatTooltip, ɵngcc4.NgIf, ɵngcc5.MatIcon], pipes: [ɵngcc4.AsyncPipe], styles: ["[_nghost-%COMP%] {\n            display: flex;\n            flex-direction: column;\n            overflow: auto;\n            flex-grow: 1;\n        }\n\n        .page-menu-drawer-container[_ngcontent-%COMP%] {\n            display: flex;\n            flex-grow: 1;\n            overflow: inherit;\n        }\n\n        .page-menu-drawer[_ngcontent-%COMP%] {\n            width: 360px;\n        }\n\n        .page-menu-drawer-content[_ngcontent-%COMP%] {\n            overflow: auto;\n            flex-grow: 1;\n            display: flex;\n            position: relative;\n        }\n\n        .page-menu-drawer-toggle-container[_ngcontent-%COMP%] {\n            display: flex;\n            align-items: center;\n            top: 0;\n            bottom: 0;\n            position: absolute;\n        }"], changeDetection: 0 });

let ListDetailsPageContentComponent = class ListDetailsPageContentComponent {
};
ListDetailsPageContentComponent.ɵfac = function ListDetailsPageContentComponent_Factory(t) { return new (t || ListDetailsPageContentComponent)(); };
ListDetailsPageContentComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: ListDetailsPageContentComponent, selectors: [["dgp-list-details-page-content"]], ngContentSelectors: _c0, decls: 1, vars: 0, template: function ListDetailsPageContentComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵprojection(0);
    } }, styles: ["[_nghost-%COMP%] {\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n            max-width: 800px;\n            width: 100%;\n            padding: 32px;\n            justify-self: center;\n            margin-right: auto;\n            margin-left: auto;\n        }"], changeDetection: 0 });

let DgpListDetailsPageModule = class DgpListDetailsPageModule {
};
DgpListDetailsPageModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: DgpListDetailsPageModule });
DgpListDetailsPageModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function DgpListDetailsPageModule_Factory(t) { return new (t || DgpListDetailsPageModule)(); }, imports: [[
            CommonModule,
            MatButtonModule,
            MatIconModule,
            MatSidenavModule,
            MatTooltipModule
        ]] });

var DgpFileUploadModule_1;
const FILE_UPLOAD_REDUCER = new InjectionToken("hamburgerShellReducer");
function fileUploadReducerFactory() {
    return fileUploadReducer;
}
const fileUploadReducerProvider = {
    provide: FILE_UPLOAD_REDUCER,
    useFactory: fileUploadReducerFactory
};
const ɵ0$8 = defaultFileUploadConfig;
let DgpFileUploadModule = DgpFileUploadModule_1 = class DgpFileUploadModule {
    static forRoot(config = defaultFileUploadConfig) {
        return {
            ngModule: DgpFileUploadModule_1,
            providers: [{
                    provide: FILE_UPLOAD_CONFIG,
                    useValue: config
                }]
        };
    }
};
DgpFileUploadModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: DgpFileUploadModule });
DgpFileUploadModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function DgpFileUploadModule_Factory(t) { return new (t || DgpFileUploadModule)(); }, providers: [
        fileUploadReducerProvider, {
            provide: FILE_UPLOAD_CONFIG,
            useValue: ɵ0$8
        }
    ], imports: [[
            CommonModule,
            MatDialogModule,
            StoreModule.forFeature(fileUploadStoreFeature, FILE_UPLOAD_REDUCER),
            EffectsModule.forFeature([
                FileUploadEffects
            ]),
            DgpPageHeaderModule,
            DgpListDetailsPageModule,
            MatListModule,
            RouterModule,
            MatIconModule,
            DgpSpacerModule,
            MatButtonModule,
            MatMenuModule,
            DgpEmptyStateModule,
            MatTooltipModule,
            DgpFileViewerModule
        ]] });

let HamburgerShellComponent = class HamburgerShellComponent {
    constructor(store) {
        this.store = store;
        this.hasPendingRequests$ = this.store.select(hasPendingRequestsSelector);
        this.isHamburgerMenuOpen$ = this.store.select(isHamburgerMenuOpenSelector);
        this.hamburgerMenuMode$ = this.store.select(hamburgerMenuModeSelector);
    }
    closeHamburgerMenu() {
        this.store.dispatch(closeHamburgerMenu());
    }
};
HamburgerShellComponent.ɵfac = function HamburgerShellComponent_Factory(t) { return new (t || HamburgerShellComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc1.Store)); };
HamburgerShellComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: HamburgerShellComponent, selectors: [["dgp-hamburger-shell"]], ngContentSelectors: _c6, decls: 10, vars: 9, consts: [[1, "hamburger-menu-drawer-container"], [1, "hamburger-menu-drawer", "mat-elevation-z4", 3, "mode", "opened", "closed"], [1, "progress-bar-container"], ["color", "accent", "mode", "query", 4, "ngIf"], [1, "hamburger-menu-drawer-content"], ["color", "accent", "mode", "query"]], template: function HamburgerShellComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef(_c5);
        ɵngcc0.ɵɵelementStart(0, "mat-drawer-container", 0);
        ɵngcc0.ɵɵelementStart(1, "mat-drawer", 1);
        ɵngcc0.ɵɵlistener("closed", function HamburgerShellComponent_Template_mat_drawer_closed_1_listener() { return ctx.closeHamburgerMenu(); });
        ɵngcc0.ɵɵpipe(2, "async");
        ɵngcc0.ɵɵpipe(3, "async");
        ɵngcc0.ɵɵelementStart(4, "div", 2);
        ɵngcc0.ɵɵtemplate(5, HamburgerShellComponent_mat_progress_bar_5_Template, 1, 0, "mat-progress-bar", 3);
        ɵngcc0.ɵɵpipe(6, "async");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵprojection(7);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(8, "mat-drawer-content", 4);
        ɵngcc0.ɵɵprojection(9, 1);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("mode", ɵngcc0.ɵɵpipeBind1(2, 3, ctx.hamburgerMenuMode$))("opened", ɵngcc0.ɵɵpipeBind1(3, 5, ctx.isHamburgerMenuOpen$));
        ɵngcc0.ɵɵadvance(4);
        ɵngcc0.ɵɵproperty("ngIf", ɵngcc0.ɵɵpipeBind1(6, 7, ctx.hasPendingRequests$));
    } }, directives: [ɵngcc16.MatDrawerContainer, ɵngcc16.MatDrawer, ɵngcc4.NgIf, ɵngcc16.MatDrawerContent, ɵngcc15.MatProgressBar], pipes: [ɵngcc4.AsyncPipe], styles: ["[_nghost-%COMP%] {\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n            overflow: auto;\n        }\n\n        .hamburger-menu-drawer-container[_ngcontent-%COMP%] {\n            flex-grow: 1;\n            display: flex !important;\n        }\n\n        .hamburger-menu-drawer[_ngcontent-%COMP%] {\n            width: 240px;\n        }\n\n        .progress-bar-container[_ngcontent-%COMP%] {\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n        }\n\n        .hamburger-menu-drawer-content[_ngcontent-%COMP%] {\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n            height: auto;\n        }"], changeDetection: 0 });
HamburgerShellComponent.ctorParameters = () => [
    { type: Store }
];

let HamburgerMenuToggleComponent = class HamburgerMenuToggleComponent extends DgpContainer {
    toggleHamburgerMenu() {
        this.dispatch(toggleHamburgerMenu());
    }
};
HamburgerMenuToggleComponent.ɵfac = function HamburgerMenuToggleComponent_Factory(t) { return ɵHamburgerMenuToggleComponent_BaseFactory(t || HamburgerMenuToggleComponent); };
HamburgerMenuToggleComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: HamburgerMenuToggleComponent, selectors: [["dgp-hamburger-menu-toggle"]], features: [ɵngcc0.ɵɵInheritDefinitionFeature], decls: 3, vars: 0, consts: [["mat-icon-button", "", 3, "click"]], template: function HamburgerMenuToggleComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "button", 0);
        ɵngcc0.ɵɵlistener("click", function HamburgerMenuToggleComponent_Template_button_click_0_listener() { return ctx.toggleHamburgerMenu(); });
        ɵngcc0.ɵɵelementStart(1, "mat-icon");
        ɵngcc0.ɵɵtext(2, "menu");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } }, directives: [ɵngcc10.MatButton, ɵngcc5.MatIcon], styles: ["[_nghost-%COMP%] {\n            margin-right: 8px;\n        }"], changeDetection: 0 });

let DgpHamburgerMenuToggleModule = class DgpHamburgerMenuToggleModule {
};
DgpHamburgerMenuToggleModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: DgpHamburgerMenuToggleModule });
DgpHamburgerMenuToggleModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function DgpHamburgerMenuToggleModule_Factory(t) { return new (t || DgpHamburgerMenuToggleModule)(); }, imports: [[
            CommonModule,
            MatButtonModule,
            MatIconModule
        ]] });

let HamburgerMenuComponent = class HamburgerMenuComponent {
};
HamburgerMenuComponent.ɵfac = function HamburgerMenuComponent_Factory(t) { return new (t || HamburgerMenuComponent)(); };
HamburgerMenuComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: HamburgerMenuComponent, selectors: [["dgp-hamburger-menu"]], ngContentSelectors: _c0, decls: 1, vars: 0, template: function HamburgerMenuComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵprojection(0);
    } }, styles: ["[_nghost-%COMP%] {\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n            height: 100%;\n        }"], changeDetection: 0 });

let HamburgerMenuHeaderComponent = class HamburgerMenuHeaderComponent {
};
HamburgerMenuHeaderComponent.ɵfac = function HamburgerMenuHeaderComponent_Factory(t) { return new (t || HamburgerMenuHeaderComponent)(); };
HamburgerMenuHeaderComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: HamburgerMenuHeaderComponent, selectors: [["dgp-hamburger-menu-header"]], ngContentSelectors: _c0, decls: 2, vars: 0, consts: [["color", "primary", 1, "hamburger-menu__header"]], template: function HamburgerMenuHeaderComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵelementStart(0, "mat-toolbar", 0);
        ɵngcc0.ɵɵprojection(1);
        ɵngcc0.ɵɵelementEnd();
    } }, directives: [ɵngcc14.MatToolbar], styles: [""], changeDetection: 0 });

let HamburgerMenuEntriesComponent = class HamburgerMenuEntriesComponent {
};
HamburgerMenuEntriesComponent.ɵfac = function HamburgerMenuEntriesComponent_Factory(t) { return new (t || HamburgerMenuEntriesComponent)(); };
HamburgerMenuEntriesComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: HamburgerMenuEntriesComponent, selectors: [["dgp-hamburger-menu-entries"]], ngContentSelectors: _c0, decls: 2, vars: 0, template: function HamburgerMenuEntriesComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵelementStart(0, "mat-nav-list");
        ɵngcc0.ɵɵprojection(1);
        ɵngcc0.ɵɵelementEnd();
    } }, directives: [ɵngcc7.MatNavList], styles: ["[_nghost-%COMP%] {\n            display: flex;\n            flex-direction: column;\n            overflow: auto;\n            flex-grow: 1;\n        }\n\n        mat-nav-list[_ngcontent-%COMP%] {\n            flex-grow: 1;\n        }"], changeDetection: 0 });

let HamburgerMenuEntryComponent = class HamburgerMenuEntryComponent {
    isNonEmptyRoute() {
        return this.route && this.route.length !== 0;
    }
};
HamburgerMenuEntryComponent.ɵfac = function HamburgerMenuEntryComponent_Factory(t) { return new (t || HamburgerMenuEntryComponent)(); };
HamburgerMenuEntryComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: HamburgerMenuEntryComponent, selectors: [["dgp-hamburger-menu-entry"]], inputs: { matIconName: "matIconName", label: "label", route: "route", disabled: "disabled" }, decls: 3, vars: 2, consts: [["mat-list-item", "", 3, "routerLink", "routerLinkActive", "disabled", 4, "ngIf", "ngIfElse"], ["emptyRoute", ""], ["mat-list-item", "", 3, "routerLink", "routerLinkActive"], ["mat-list-item", "", "tabindex", "-1", 1, "disabled"]], template: function HamburgerMenuEntryComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, HamburgerMenuEntryComponent_a_0_Template, 4, 7, "a", 0);
        ɵngcc0.ɵɵtemplate(1, HamburgerMenuEntryComponent_ng_template_1_Template, 4, 2, "ng-template", null, 1, ɵngcc0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        const _r65 = ɵngcc0.ɵɵreference(2);
        ɵngcc0.ɵɵproperty("ngIf", ctx.isNonEmptyRoute())("ngIfElse", _r65);
    } }, directives: [ɵngcc4.NgIf, ɵngcc7.MatListItem, ɵngcc2.RouterLinkWithHref, ɵngcc2.RouterLinkActive, ɵngcc5.MatIcon], styles: ["mat-icon[_ngcontent-%COMP%] {\n            margin-right: 16px;\n        }\n\n        .disabled[_ngcontent-%COMP%] {\n            pointer-events: none;\n            color: gray !important;\n        }"], changeDetection: 0 });
__decorate([
    Input()
], HamburgerMenuEntryComponent.prototype, "matIconName", void 0);
__decorate([
    Input()
], HamburgerMenuEntryComponent.prototype, "label", void 0);
__decorate([
    Input()
], HamburgerMenuEntryComponent.prototype, "route", void 0);
__decorate([
    Input()
], HamburgerMenuEntryComponent.prototype, "disabled", void 0);

let DgpHamburgerMenuModule = class DgpHamburgerMenuModule {
};
DgpHamburgerMenuModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: DgpHamburgerMenuModule });
DgpHamburgerMenuModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function DgpHamburgerMenuModule_Factory(t) { return new (t || DgpHamburgerMenuModule)(); }, imports: [[
            MatToolbarModule,
            MatListModule,
            RouterModule,
            MatIconModule,
            CommonModule
        ]] });

let HamburgerShellEffects = class HamburgerShellEffects {
    constructor(actions, store, breakpointObserver, hamburgerShellConfig) {
        this.actions = actions;
        this.store = store;
        this.breakpointObserver = breakpointObserver;
        this.hamburgerShellConfig = hamburgerShellConfig;
        this.setHamburgerMenuState$ = of(this.hamburgerShellConfig.hamburgerShellMode)
            .pipe(filter(x => x === HamburgerShellMode.Responsive), switchMap(() => {
            return this.breakpointObserver.observe(this.hamburgerShellConfig.hamburgerMenuBreakpoints);
        }), debounceTime(50), map(result => {
            const isHamburgerMenuOpen = result.matches;
            const hamburgerMenuMode = isHamburgerMenuOpen ? "side" : "over";
            return setHamburgerMenuState({
                isHamburgerMenuOpen,
                hamburgerMenuMode
            });
        }));
        this.setListDetailsPageLayout$ = of(this.hamburgerShellConfig.listDetailsPageMode)
            .pipe(filter(x => x === ListDetailsPageMode.Responsive), switchMap(() => {
            return this.breakpointObserver.observe(this.hamburgerShellConfig.listDetailsPageMenuBreakpoints);
        }), debounceTime(50), map(result => {
            const isPageMenuOpen = result.matches;
            const pageMenuMode = isPageMenuOpen ? "side" : "over";
            return setListDetailsPageState({
                isPageMenuOpen,
                pageMenuMode
            });
        }));
        if (hamburgerShellConfig.hamburgerShellMode === HamburgerShellMode.SideNav) {
            this.store.dispatch(setHamburgerMenuState({
                isHamburgerMenuOpen: true,
                hamburgerMenuMode: "side"
            }));
        }
        else if (hamburgerShellConfig.hamburgerShellMode === HamburgerShellMode.Overlay) {
            this.store.dispatch(setHamburgerMenuState({
                isHamburgerMenuOpen: false,
                hamburgerMenuMode: "over"
            }));
        }
        if (hamburgerShellConfig.listDetailsPageMode === ListDetailsPageMode.SideNav) {
            this.store.dispatch(setListDetailsPageState({
                isPageMenuOpen: true,
                pageMenuMode: "side"
            }));
        }
        else if (hamburgerShellConfig.listDetailsPageMode === ListDetailsPageMode.Overlay) {
            this.store.dispatch(setListDetailsPageState({
                isPageMenuOpen: false,
                pageMenuMode: "over"
            }));
        }
    }
};
HamburgerShellEffects.ɵfac = function HamburgerShellEffects_Factory(t) { return new (t || HamburgerShellEffects)(ɵngcc0.ɵɵinject(ɵngcc3.Actions), ɵngcc0.ɵɵinject(ɵngcc1.Store), ɵngcc0.ɵɵinject(ɵngcc17.BreakpointObserver), ɵngcc0.ɵɵinject(HAMBURGER_SHELL_CONFIG)); };
HamburgerShellEffects.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: HamburgerShellEffects, factory: HamburgerShellEffects.ɵfac });
HamburgerShellEffects.ctorParameters = () => [
    { type: Actions },
    { type: Store },
    { type: BreakpointObserver },
    { type: undefined, decorators: [{ type: Inject, args: [HAMBURGER_SHELL_CONFIG,] }] }
];
__decorate([
    Effect()
], HamburgerShellEffects.prototype, "setHamburgerMenuState$", void 0);
__decorate([
    Effect()
], HamburgerShellEffects.prototype, "setListDetailsPageLayout$", void 0);
HamburgerShellEffects = __decorate([ __param(3, Inject(HAMBURGER_SHELL_CONFIG))
], HamburgerShellEffects);

const initialHamburgerShellState = {
    hamburgerMenuMode: "side",
    isHamburgerMenuOpen: true,
    pageMenuMode: "side",
    isPageMenuOpen: true
};
const ɵ0$9 = (state, action) => {
    return Object.assign(Object.assign({}, state), { hamburgerMenuMode: action.hamburgerMenuMode, isHamburgerMenuOpen: action.isHamburgerMenuOpen });
}, ɵ1$7 = (state) => {
    return Object.assign(Object.assign({}, state), { isHamburgerMenuOpen: !state.isHamburgerMenuOpen });
}, ɵ2$5 = (state) => {
    return Object.assign(Object.assign({}, state), { isHamburgerMenuOpen: false });
}, ɵ3$3 = (state, action) => {
    return Object.assign(Object.assign({}, state), { pageMenuMode: action.pageMenuMode, isPageMenuOpen: action.isPageMenuOpen });
}, ɵ4$1 = (state) => {
    return Object.assign(Object.assign({}, state), { isPageMenuOpen: !state.isPageMenuOpen });
}, ɵ5$1 = (state) => {
    return Object.assign(Object.assign({}, state), { isPageMenuOpen: false });
};
const hamburgerShellReducer = createReducer(initialHamburgerShellState, on(setHamburgerMenuState, (ɵ0$9)), on(toggleHamburgerMenu, (ɵ1$7)), on(closeHamburgerMenu, (ɵ2$5)), on(setListDetailsPageState, (ɵ3$3)), on(toggleListDetailsPageMenu, (ɵ4$1)), on(closeListDetailsMenu, (ɵ5$1)));

var DgpHamburgerShellModule_1;
const HAMBURGER_SHELL_REDUCER = new InjectionToken("hamburgerShellReducer");
function hamburgerShellReducerFactory() {
    return hamburgerShellReducer;
}
const hamburgerShellReducerProvider = {
    provide: HAMBURGER_SHELL_REDUCER,
    useFactory: hamburgerShellReducerFactory
};
let DgpHamburgerShellModule = DgpHamburgerShellModule_1 = class DgpHamburgerShellModule {
    static forRoot(configProvider = defaultHamburgerShellConfigProvider) {
        return {
            ngModule: DgpHamburgerShellModule_1,
            providers: [
                configProvider
            ]
        };
    }
};
DgpHamburgerShellModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: DgpHamburgerShellModule });
DgpHamburgerShellModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function DgpHamburgerShellModule_Factory(t) { return new (t || DgpHamburgerShellModule)(); }, providers: [
        hamburgerShellReducerProvider
    ], imports: [[
            LayoutModule,
            CommonModule,
            FormsModule,
            MatButtonModule,
            MatIconModule,
            MatProgressBarModule,
            MatSidenavModule,
            StoreModule.forFeature(hamburgerShellStoreFeature, HAMBURGER_SHELL_REDUCER),
            EffectsModule.forFeature([
                HamburgerShellEffects
            ]),
            RouterModule
        ]] });

const hotReload = createAction("[HMR] Reload", props());

/**
 * Generate a reducer to set the root state in dev mode for HMR
 */
function hmrReducer(x) {
    return (state, action) => {
        if (action.type === "[HMR] Reload") {
            return action.payload;
        }
        return x(state, action);
    };
}

class DgpNgApp {
    constructor(appRef, ngrxStore) {
        this.appRef = appRef;
        this.ngrxStore = ngrxStore;
    }
    //noinspection JSUnusedGlobalSymbols
    hmrOnInit(store) {
        if (!store || !store.rootState) {
            return;
        }
        if (store.rootState) {
            this.ngrxStore.dispatch(hotReload({ payload: store.rootState }));
        }
        Object.keys(store)
            .forEach(prop => delete store[prop]);
    }
    //noinspection JSUnusedGlobalSymbols
    hmrOnDestroy(store) {
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        store.disposeOldHosts = createNewHosts(cmpLocation);
        this.ngrxStore
            .pipe(take(1))
            .subscribe(s => store.rootState = s);
        let queryResults = document.querySelectorAll(".cdk-overlay-container");
        queryResults.forEach(x => {
            x.parentNode.removeChild(x);
        });
        queryResults = document.querySelectorAll(".cdk-visually-hidden");
        queryResults.forEach(x => {
            x.parentNode.removeChild(x);
        });
        removeNgStyles();
    }
    //noinspection JSUnusedGlobalSymbols
    hmrAfterDestroy(store) {
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}

const logError = createAction("[Log] LogError", props());
const addLogEntry = createAction("[Log] AddLogEntry", props());
const logErrorActionType = logError.type;
class LogErrorAction {
    constructor(payload) {
        this.payload = payload;
        this.type = logErrorActionType;
    }
}

var Severity;
(function (Severity) {
    Severity[Severity["Error"] = 0] = "Error";
})(Severity || (Severity = {}));
const logStoreFeature = "LogStore";

const logStore = createEntityStore({
    entityTypes: [
        "logEntry"
    ],
    storeFeature: "LogStore"
});

const logFeatureSelector = createFeatureSelector(logStoreFeature);
const ɵ0$a = x => x.logEntry;
const getLogEntryState = createSelector(logFeatureSelector, ɵ0$a);
const ɵ1$8 = x => {
    const entries = getAll(x);
    entries.sort((a, b) => {
        return b.timeStamp - a.timeStamp;
    });
    return entries;
};
const getAllLogEntries = createSelector(getLogEntryState, ɵ1$8);
const ɵ2$6 = x => x && x.length > 0;
const hasLogEntries = createSelector(getAllLogEntries, ɵ2$6);
const getSelectedLogEntry = createSelector(logFeatureSelector, logStore.selectors.logEntry.getFirstSelected);

let LogPageComponent = class LogPageComponent {
    constructor(store, activatedRoute) {
        this.store = store;
        this.activatedRoute = activatedRoute;
        this.logEntry$ = this.store.select(getSelectedLogEntry);
        activatedRoute.params
            .pipe(filter(params => params.logEntryId))
            .subscribe(params => this.store.dispatch(logStore.actions.composeEntityActions({
            select: {
                logEntry: [params.logEntryId]
            }
        })));
    }
};
LogPageComponent.ɵfac = function LogPageComponent_Factory(t) { return new (t || LogPageComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc1.Store), ɵngcc0.ɵɵdirectiveInject(ɵngcc2.ActivatedRoute)); };
LogPageComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: LogPageComponent, selectors: [["dgp-log-page"]], decls: 9, vars: 3, consts: [["dgp-list-details-page-menu", ""], [3, "logEntry"]], template: function LogPageComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "dgp-page-header");
        ɵngcc0.ɵɵelement(1, "dgp-hamburger-menu-toggle");
        ɵngcc0.ɵɵtext(2, " Log ");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(3, "dgp-list-details-page");
        ɵngcc0.ɵɵelementContainerStart(4, 0);
        ɵngcc0.ɵɵelement(5, "dgp-log-entry-list");
        ɵngcc0.ɵɵelementContainerEnd();
        ɵngcc0.ɵɵelementStart(6, "dgp-list-details-page-content");
        ɵngcc0.ɵɵelement(7, "dgp-log-entry-details", 1);
        ɵngcc0.ɵɵpipe(8, "async");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(7);
        ɵngcc0.ɵɵproperty("logEntry", ɵngcc0.ɵɵpipeBind1(8, 1, ctx.logEntry$));
    } }, directives: function () { return [PageHeaderComponent,
        HamburgerMenuToggleComponent,
        ListDetailsPageComponent,
        LogEntryListComponent,
        ListDetailsPageContentComponent,
        LogEntryDetailsComponent]; }, pipes: function () { return [ɵngcc4.AsyncPipe]; }, encapsulation: 2, changeDetection: 0 });
LogPageComponent.ctorParameters = () => [
    { type: Store },
    { type: ActivatedRoute }
];

let LogEntryListComponent = class LogEntryListComponent extends DgpContainer {
    constructor() {
        super(...arguments);
        this.severityEnum = Severity;
        this.logEntries$ = this.select(getAllLogEntries);
        this.hasLogEntries$ = this.select(hasLogEntries);
    }
};
LogEntryListComponent.ɵfac = function LogEntryListComponent_Factory(t) { return ɵLogEntryListComponent_BaseFactory(t || LogEntryListComponent); };
LogEntryListComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: LogEntryListComponent, selectors: [["dgp-log-entry-list"]], features: [ɵngcc0.ɵɵInheritDefinitionFeature], decls: 4, vars: 4, consts: [[4, "ngIf", "ngIfElse"], ["emptyState", ""], ["mat-subheader", ""], ["mat-list-item", "", 3, "routerLink", 4, "ngFor", "ngForOf"], ["mat-list-item", "", 3, "routerLink"], ["mat-list-icon", "", 4, "ngIf"], ["mat-line", ""], ["mat-list-icon", ""], ["matIconName", "error", "title", "No entries available"]], template: function LogEntryListComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, LogEntryListComponent_mat_nav_list_0_Template, 5, 3, "mat-nav-list", 0);
        ɵngcc0.ɵɵpipe(1, "async");
        ɵngcc0.ɵɵtemplate(2, LogEntryListComponent_ng_template_2_Template, 1, 0, "ng-template", null, 1, ɵngcc0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        const _r68 = ɵngcc0.ɵɵreference(3);
        ɵngcc0.ɵɵproperty("ngIf", ɵngcc0.ɵɵpipeBind1(1, 2, ctx.hasLogEntries$))("ngIfElse", _r68);
    } }, directives: [ɵngcc4.NgIf, ɵngcc7.MatNavList, ɵngcc7.MatListSubheaderCssMatStyler, ɵngcc4.NgForOf, ɵngcc7.MatListItem, ɵngcc2.RouterLinkWithHref, ɵngcc9.MatLine, ɵngcc5.MatIcon, ɵngcc7.MatListIconCssMatStyler, EmptyStateComponent], pipes: [ɵngcc4.AsyncPipe, ɵngcc4.DatePipe], styles: ["[_nghost-%COMP%] {\n            display: flex;\n            flex-grow: 1;\n            flex-direction: column;\n            height: 100%;\n        }"], changeDetection: 0 });

let LogEntryDetailsComponent = class LogEntryDetailsComponent {
    constructor() {
        this.severityEnum = Severity;
    }
    isApiError() {
        var _a, _b;
        if (((_a = this.logEntry.content) === null || _a === void 0 ? void 0 : _a.hasOwnProperty("status")) && ((_b = this.logEntry.content) === null || _b === void 0 ? void 0 : _b.hasOwnProperty("error"))) {
            return true;
        }
        return false;
    }
};
LogEntryDetailsComponent.ɵfac = function LogEntryDetailsComponent_Factory(t) { return new (t || LogEntryDetailsComponent)(); };
LogEntryDetailsComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: LogEntryDetailsComponent, selectors: [["dgp-log-entry-details"]], inputs: { logEntry: "logEntry" }, decls: 3, vars: 2, consts: [[4, "ngIf", "ngIfElse"], ["noLogEntryTemplate", ""], [1, "header"], ["class", "header__icon", 4, "ngIf"], [1, "header__title-container"], [1, "header__title", "mat-h1"], [1, "header__subtitle"], [1, "vertical-separator"], [1, "content"], [1, "content__heading", "mat-h2"], [1, "content__body"], [4, "ngIf"], ["class", "content__body", 4, "ngIf", "ngIfElse"], ["noContentTemplate", ""], [1, "header__icon"], ["apiError", ""], [3, "innerHTML"], [1, "content__placeholder"], ["title", "No entry selected", "matIconName", "error"]], template: function LogEntryDetailsComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, LogEntryDetailsComponent_ng_container_0_Template, 20, 9, "ng-container", 0);
        ɵngcc0.ɵɵtemplate(1, LogEntryDetailsComponent_ng_template_1_Template, 2, 0, "ng-template", null, 1, ɵngcc0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        const _r74 = ɵngcc0.ɵɵreference(2);
        ɵngcc0.ɵɵproperty("ngIf", ctx.logEntry)("ngIfElse", _r74);
    } }, directives: [ɵngcc4.NgIf, ɵngcc18.MatDivider, ɵngcc5.MatIcon, EmptyStateComponent], pipes: [ɵngcc4.DatePipe, ɵngcc4.JsonPipe, SafePipe], styles: ["[_nghost-%COMP%] {\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n            overflow: auto;\n            word-break: break-word;\n        }\n\n        .header[_ngcontent-%COMP%] {\n            display: flex;\n            align-items: center;\n        }\n\n        .header__icon[_ngcontent-%COMP%] {\n            font-size: 40px;\n            width: 40px;\n            height: 40px;\n            margin-left: 16px;\n            margin-right: 16px;\n        }\n\n        .header__title-container[_ngcontent-%COMP%] {\n            flex-grow: 1;\n        }\n\n        .header__title[_ngcontent-%COMP%] {\n            margin-top: 8px;\n            margin-bottom: 8px;\n        }\n\n        .header__subtitle[_ngcontent-%COMP%] {\n            display: flex;\n        }\n\n        .content[_ngcontent-%COMP%] {\n        }\n\n        .content__heading[_ngcontent-%COMP%] {\n            margin-top: 8px;\n            margin-bottom: 8px;\n        }\n\n        .content__body[_ngcontent-%COMP%] {\n\n        }\n\n        .content__placeholder[_ngcontent-%COMP%] {\n\n        }\n\n        .vertical-separator[_ngcontent-%COMP%] {\n            margin-top: 16px;\n            margin-bottom: 16px;\n        }"], changeDetection: 0 });
__decorate([
    Input()
], LogEntryDetailsComponent.prototype, "logEntry", void 0);

let LogEffects = class LogEffects {
    constructor(actions$, matSnackbar, router) {
        this.actions$ = actions$;
        this.matSnackbar = matSnackbar;
        this.router = router;
        this.logError$ = this.actions$.pipe(ofType(logError), map(action => {
            const logEntry = {
                timeStamp: new Date().valueOf(),
                title: action.payload.title,
                content: action.payload.error,
                severity: Severity.Error
            };
            return addLogEntry({ logEntry });
        }));
        this.addLogEntry$ = this.actions$.pipe(ofType(addLogEntry), map(action => logStore.actions.composeEntityActions({
            add: {
                logEntry: {
                    [action.logEntry.timeStamp.toString()]: action.logEntry
                }
            }
        })));
        this.showErrorSnack$ = this.actions$.pipe(ofType(addLogEntry), switchMap(action => this.matSnackbar.open(action.logEntry.title, "Show log", {
            duration: 5000
        })
            .onAction()
            .pipe(map(() => this.router.navigate(["/logEntries", action.logEntry.timeStamp.toString()])), defaultIfEmpty(null))));
    }
};
LogEffects.ɵfac = function LogEffects_Factory(t) { return new (t || LogEffects)(ɵngcc0.ɵɵinject(ɵngcc3.Actions), ɵngcc0.ɵɵinject(ɵngcc19.MatSnackBar), ɵngcc0.ɵɵinject(ɵngcc2.Router)); };
LogEffects.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: LogEffects, factory: LogEffects.ɵfac });
LogEffects.ctorParameters = () => [
    { type: Actions },
    { type: MatSnackBar },
    { type: Router }
];
__decorate([
    Effect()
], LogEffects.prototype, "logError$", void 0);
__decorate([
    Effect()
], LogEffects.prototype, "addLogEntry$", void 0);
__decorate([
    Effect({
        dispatch: false
    })
], LogEffects.prototype, "showErrorSnack$", void 0);

const LOG_STORE_REDUCER = new InjectionToken("LogStoreReducer");
function createLogStoreReducer() {
    return logStore.reducers;
}
const logStoreReducerProvider = {
    provide: LOG_STORE_REDUCER,
    useFactory: createLogStoreReducer
};
let DgpLogModule = class DgpLogModule {
};
DgpLogModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: DgpLogModule });
DgpLogModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function DgpLogModule_Factory(t) { return new (t || DgpLogModule)(); }, providers: [
        logStoreReducerProvider
    ], imports: [[
            CommonModule,
            FormsModule,
            StoreModule.forFeature(logStoreFeature, LOG_STORE_REDUCER),
            EffectsModule.forFeature([
                LogEffects
            ]),
            RouterModule.forChild([{
                    path: "logEntries",
                    component: LogPageComponent
                }, {
                    path: "logEntries/:logEntryId",
                    component: LogPageComponent
                }]),
            MatDividerModule,
            MatIconModule,
            MatListModule,
            MatSnackBarModule,
            DgpHamburgerMenuToggleModule,
            DgpPageHeaderModule,
            DgpListDetailsPageModule,
            DgpEmptyStateModule,
            SafePipeModule
        ]] });

const scheduleRequestActionType = "[ScheduleRequest] ScheduleRequestAction";
class ScheduleRequestAction {
    constructor(payload) {
        this.payload = payload;
        this.type = scheduleRequestActionType;
    }
}
const scheduleRequest = createAction(scheduleRequestActionType, props());
const registerRequestActionType = "[Request] Register";
const registerRequest = createAction(registerRequestActionType);
const unregisterRequestActionType = "[Request] Unregister";
const unregisterRequest = createAction(unregisterRequestActionType);
const resetRequestsActionType = "[Request] Reset";
const resetRequests = createAction(resetRequestsActionType);

/**
 * Observes a promise or observable based
 * request
 *
 * Allows intercepting value and error events
 * with a custom observer
 */
function observeRequest(payload) {
    const request = payload.request$;
    let obs$;
    if (request instanceof Promise) {
        obs$ = from(request);
    }
    else {
        obs$ = request;
    }
    let interceptedObs$ = obs$;
    interceptedObs$ = interceptedObs$.pipe(tap(payload.observer), catchError((err, caught) => {
        return empty();
    }), defaultIfEmpty(null));
    return interceptedObs$.pipe(first()).toPromise();
}

let RequestEffects = class RequestEffects {
    constructor(actions$, store) {
        this.actions$ = actions$;
        this.store = store;
        /**
         * A request-processing queue that processes requests
         * in the order they arrive and keeps track of how
         * many requests are currently running
         */
        this.scheduleRequest$ = this.actions$
            .pipe(ofType(scheduleRequest), concatMap(action => {
            return observeRequest({
                request$: action.request$,
                observer: this.getRequestObserver()
            });
        }));
    }
    getRequestObserver() {
        this.store.dispatch(registerRequest());
        let isAlreadyUnregistered = false;
        const onObserved = () => {
            if (!isAlreadyUnregistered) {
                isAlreadyUnregistered = true;
                this.store.dispatch(unregisterRequest());
            }
        };
        return {
            next: onObserved,
            error: () => {
                onObserved();
            },
            complete: onObserved
        };
    }
};
RequestEffects.ɵfac = function RequestEffects_Factory(t) { return new (t || RequestEffects)(ɵngcc0.ɵɵinject(ɵngcc3.Actions), ɵngcc0.ɵɵinject(ɵngcc1.Store)); };
RequestEffects.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: RequestEffects, factory: RequestEffects.ɵfac });
RequestEffects.ctorParameters = () => [
    { type: Actions },
    { type: Store }
];
__decorate([
    Effect({
        dispatch: false
    })
], RequestEffects.prototype, "scheduleRequest$", void 0);

const ɵ0$b = state => {
    return {
        pendingRequests: state.pendingRequests + 1
    };
}, ɵ1$9 = state => {
    return {
        pendingRequests: state.pendingRequests - 1
    };
}, ɵ2$7 = () => {
    return {
        pendingRequests: 0
    };
};
const requestReducer = createReducer({ pendingRequests: 0 }, on(registerRequest, ɵ0$b), on(unregisterRequest, ɵ1$9), on(resetRequests, ɵ2$7));
const requestStoreReducer = {
    requests: requestReducer
};

const REQUEST_STORE_REDUCER = new InjectionToken("RequestStoreReducer");
function requestStoreReducerFactory() {
    return requestStoreReducer;
}
const requestStoreReducerProvider = {
    provide: REQUEST_STORE_REDUCER,
    useFactory: requestStoreReducerFactory
};
let DgpRequestStoreModule = class DgpRequestStoreModule {
};
DgpRequestStoreModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: DgpRequestStoreModule });
DgpRequestStoreModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function DgpRequestStoreModule_Factory(t) { return new (t || DgpRequestStoreModule)(); }, providers: [
        requestStoreReducerProvider
    ], imports: [[
            StoreModule.forFeature(requestStoreFeature, REQUEST_STORE_REDUCER),
            EffectsModule.forFeature([
                RequestEffects
            ])
        ]] });

const showLoadingSpinner = createAction("[RoutingOverlay] ShowSpinner", props());

let RoutingOverlayComponent = class RoutingOverlayComponent {
};
RoutingOverlayComponent.ɵfac = function RoutingOverlayComponent_Factory(t) { return new (t || RoutingOverlayComponent)(); };
RoutingOverlayComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: RoutingOverlayComponent, selectors: [["dgp-routing-overlay"]], decls: 1, vars: 0, consts: [["mode", "indeterminate", 2, "height", "16px"]], template: function RoutingOverlayComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelement(0, "mat-progress-bar", 0);
    } }, directives: [ɵngcc15.MatProgressBar], styles: ["[_nghost-%COMP%] {\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            flex-grow: 1;\n            height: 100%;\n        }"] });

let RoutingOverlayEffects = class RoutingOverlayEffects {
    constructor(actions$, router, matDialog) {
        this.actions$ = actions$;
        this.router = router;
        this.matDialog = matDialog;
        this.observeRouteEvents$ = this.router.events.pipe(map(event => {
            if (event instanceof ActivationStart) {
                return showLoadingSpinner({ showSpinner: true });
            }
            if (event instanceof NavigationEnd
                || event instanceof NavigationCancel
                || event instanceof NavigationError) {
                return showLoadingSpinner({ showSpinner: false });
            }
            return null;
        }), filter(event => !isNullOrUndefined$1(event)));
        this.showLoadingSpinner$ = this.actions$.pipe(ofType(showLoadingSpinner), distinctUntilKeyChanged("showSpinner"), switchMap(action => {
            if (action.showSpinner) {
                return timer(500).pipe(tap(() => {
                    this.dialogRef = this.matDialog.open(RoutingOverlayComponent, {
                        disableClose: true,
                        width: "400px",
                        height: "320px"
                    });
                }));
            }
            else {
                return of(null).pipe(tap(() => {
                    if (!isNullOrUndefined$1(this.dialogRef)) {
                        this.dialogRef.close();
                    }
                }));
            }
        }));
    }
};
RoutingOverlayEffects.ɵfac = function RoutingOverlayEffects_Factory(t) { return new (t || RoutingOverlayEffects)(ɵngcc0.ɵɵinject(ɵngcc3.Actions), ɵngcc0.ɵɵinject(ɵngcc2.Router), ɵngcc0.ɵɵinject(ɵngcc13.MatDialog)); };
RoutingOverlayEffects.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: RoutingOverlayEffects, factory: RoutingOverlayEffects.ɵfac });
RoutingOverlayEffects.ctorParameters = () => [
    { type: Actions },
    { type: Router },
    { type: MatDialog }
];
__decorate([
    Effect()
], RoutingOverlayEffects.prototype, "observeRouteEvents$", void 0);
__decorate([
    Effect({
        dispatch: false
    })
], RoutingOverlayEffects.prototype, "showLoadingSpinner$", void 0);

let DgpRoutingOverlayModule = class DgpRoutingOverlayModule {
};
DgpRoutingOverlayModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: DgpRoutingOverlayModule });
DgpRoutingOverlayModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function DgpRoutingOverlayModule_Factory(t) { return new (t || DgpRoutingOverlayModule)(); }, imports: [[
            MatDialogModule,
            MatProgressBarModule,
            EffectsModule.forFeature([
                RoutingOverlayEffects
            ]),
            MatProgressBarModule
        ]] });

let DgpTableCelLEditorDirective = class DgpTableCelLEditorDirective {
};
DgpTableCelLEditorDirective.ɵfac = function DgpTableCelLEditorDirective_Factory(t) { return new (t || DgpTableCelLEditorDirective)(); };
DgpTableCelLEditorDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: DgpTableCelLEditorDirective, selectors: [["", "dgpTableCellEditor", ""]] });

function computeTableCellEditorSizes(payload) {
    return {
        offsetTop: (payload.tableCellBoundingRect.top + payload.triggerButtonElement.offsetHeight),
        offsetLeft: payload.tableCellBoundingRect.left,
        availableSpace: {
            left: payload.tableCellBoundingRect.left,
            right: payload.window.innerWidth - (payload.tableCellBoundingRect.left),
            bottom: payload.window.innerHeight - (payload.tableCellBoundingRect.top + payload.triggerButtonElement.offsetHeight),
            top: payload.window.innerHeight - payload.tableCellBoundingRect.top
        }
    };
}
function getDialogPositionFromTableCellEditorSizes(payload) {
    let result = {
        top: payload.tableCellEditorSizes.offsetTop + "px",
        left: payload.tableCellEditorSizes.offsetLeft + "px",
        bottom: null,
        right: null
    };
    if (payload.tableCellEditorSizes.availableSpace.right < payload.configureDialogWidth
        && payload.tableCellEditorSizes.availableSpace.left >= payload.configureDialogWidth) {
        result = Object.assign(Object.assign({}, result), { left: (payload.tableCellEditorSizes.availableSpace.right - payload.configureDialogWidth) + "px" });
    }
    return result;
}

let DgpTableCellComponent = class DgpTableCellComponent {
    constructor(matDialog) {
        this.matDialog = matDialog;
        this.editDialogConfig = {
            width: "240px"
        };
        this.editorOpened = new EventEmitter();
        this.editorClosed = new EventEmitter();
    }
    openCellEditorDialog() {
        return __awaiter(this, void 0, void 0, function* () {
            this.editorOpened.emit();
            const triggerButtonElement = this.buttonElRef.nativeElement;
            const configureDialogWidth = +this.editDialogConfig.width.replace("px", "");
            const tableCellBoundingRect = this.buttonElRef.nativeElement.getBoundingClientRect();
            const tableCellEditorSizes = computeTableCellEditorSizes({
                tableCellBoundingRect, triggerButtonElement, window: window
            });
            const position = getDialogPositionFromTableCellEditorSizes({
                tableCellEditorSizes, configureDialogWidth
            });
            this.dialogRef = this.matDialog.open(this.editorTemplate, Object.assign(Object.assign({}, this.editDialogConfig), { position, backdropClass: "mat-dialog-no-backdrop" }));
            yield this.dialogRef.afterClosed().toPromise();
            this.dialogRef = null;
            this.editorClosed.emit();
        });
    }
    closeCellEditorDialog() {
        if (this.dialogRef) {
            this.dialogRef.close();
        }
    }
};
DgpTableCellComponent.ɵfac = function DgpTableCellComponent_Factory(t) { return new (t || DgpTableCellComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc13.MatDialog)); };
DgpTableCellComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: DgpTableCellComponent, selectors: [["dgp-table-cell"]], contentQueries: function DgpTableCellComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵngcc0.ɵɵcontentQuery(dirIndex, DgpTableCelLEditorDirective, true, TemplateRef);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.editorTemplate = _t.first);
    } }, viewQuery: function DgpTableCellComponent_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵviewQuery(_c8, true, ElementRef);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.buttonElRef = _t.first);
    } }, inputs: { editDialogConfig: "editDialogConfig", disabled: "disabled", scrollParentSelector: "scrollParentSelector" }, outputs: { editorOpened: "editorOpened", editorClosed: "editorClosed" }, ngContentSelectors: _c0, decls: 3, vars: 1, consts: [["mat-button", "", 1, "mat-table-cell-editor-trigger-button", 3, "disabled", "click"], ["triggerButton", ""]], template: function DgpTableCellComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵelementStart(0, "button", 0, 1);
        ɵngcc0.ɵɵlistener("click", function DgpTableCellComponent_Template_button_click_0_listener() { return ctx.openCellEditorDialog(); });
        ɵngcc0.ɵɵprojection(2);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("disabled", ctx.disabled);
    } }, directives: [ɵngcc10.MatButton], styles: ["\n\n        dgp-table-cell {\n            display: flex;\n            flex-grow: 1;\n        }\n\n        .mat-table-cell-editor-trigger-button {\n            flex-grow: 1;\n            justify-content: flex-start;\n            padding: initial;\n            display: flex;\n            font-weight: initial;\n        }\n\n        .mat-table-cell-editor-trigger-button .mat-button-wrapper {\n            flex-grow: 1;\n            justify-content: flex-start;\n            display: flex;\n        }\n\n        .mat-dialog-no-backdrop {\n            background: initial;\n        }\n\n\n    "], encapsulation: 2, changeDetection: 0 });
DgpTableCellComponent.ctorParameters = () => [
    { type: MatDialog }
];
__decorate([
    Input()
], DgpTableCellComponent.prototype, "editDialogConfig", void 0);
__decorate([
    Output()
], DgpTableCellComponent.prototype, "editorOpened", void 0);
__decorate([
    Output()
], DgpTableCellComponent.prototype, "editorClosed", void 0);
__decorate([
    Input()
], DgpTableCellComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], DgpTableCellComponent.prototype, "scrollParentSelector", void 0);
__decorate([
    ContentChild(DgpTableCelLEditorDirective, {
        read: TemplateRef
    })
], DgpTableCellComponent.prototype, "editorTemplate", void 0);
__decorate([
    ViewChild("triggerButton", {
        read: ElementRef
    })
], DgpTableCellComponent.prototype, "buttonElRef", void 0);

let DgpTableCellModule = class DgpTableCellModule {
};
DgpTableCellModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: DgpTableCellModule });
DgpTableCellModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function DgpTableCellModule_Factory(t) { return new (t || DgpTableCellModule)(); }, imports: [[
            CommonModule,
            MatButtonModule,
            MatDialogModule
        ]] });

const toggleDarkMode = createAction("[ThemeSwitcher] ToggleDarkMode");
const setIsDarkModeActive = createAction("[ThemeSwitcher] SetIsDarkModeActive", props());

const defaultThemeSwitcherConfig = {
    darkThemeClassName: "dark-theme"
};
const THEME_SWITCHER_CONFIG = new InjectionToken("ThemeSwitcherConfig");
const themeSwitcherStoreFeature = "ThemeSwitcher";

const themeSwitcherFeatureSelector = createFeatureSelector(themeSwitcherStoreFeature);
const ɵ0$c = x => x.useDarkMode;
const isDarkModeActiveSelector = createSelector(themeSwitcherFeatureSelector, ɵ0$c);
const isDarkModeActive = isDarkModeActiveSelector;

let DarkModeToggleComponent = class DarkModeToggleComponent extends DgpContainer {
    constructor() {
        super(...arguments);
        this.useDarkMode$ = this.select(isDarkModeActive);
    }
    toggleDarkMode() {
        this.dispatch(toggleDarkMode());
    }
};
DarkModeToggleComponent.ɵfac = function DarkModeToggleComponent_Factory(t) { return ɵDarkModeToggleComponent_BaseFactory(t || DarkModeToggleComponent); };
DarkModeToggleComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: DarkModeToggleComponent, selectors: [["dgp-dark-mode-toggle"]], features: [ɵngcc0.ɵɵInheritDefinitionFeature], decls: 3, vars: 3, consts: [[3, "ngModel", "ngModelChange"]], template: function DarkModeToggleComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "mat-slide-toggle", 0);
        ɵngcc0.ɵɵlistener("ngModelChange", function DarkModeToggleComponent_Template_mat_slide_toggle_ngModelChange_0_listener() { return ctx.toggleDarkMode(); });
        ɵngcc0.ɵɵpipe(1, "async");
        ɵngcc0.ɵɵtext(2, " Use dark mode ");
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngModel", ɵngcc0.ɵɵpipeBind1(1, 1, ctx.useDarkMode$));
    } }, directives: [ɵngcc20.MatSlideToggle, ɵngcc21.NgControlStatus, ɵngcc21.NgModel], pipes: [ɵngcc4.AsyncPipe], styles: ["[_nghost-%COMP%] {\n            margin-left: 16px;\n            margin-right: 16px;\n        }"], changeDetection: 0 });

let ThemeHostDirective = class ThemeHostDirective {
    constructor(elRef, renderer, store, config, overlayContainer) {
        this.elRef = elRef;
        this.renderer = renderer;
        this.store = store;
        this.config = config;
        this.overlayContainer = overlayContainer;
        this.store.pipe(select(isDarkModeActiveSelector))
            .subscribe(isDarkModeActive => {
            if (isDarkModeActive) {
                this.renderer.addClass(elRef.nativeElement, this.config.darkThemeClassName);
                this.overlayContainer.getContainerElement()
                    .classList
                    .add(this.config.darkThemeClassName);
            }
            else {
                this.renderer.removeClass(elRef.nativeElement, this.config.darkThemeClassName);
                this.overlayContainer.getContainerElement()
                    .classList
                    .remove(this.config.darkThemeClassName);
            }
        });
    }
};
ThemeHostDirective.ɵfac = function ThemeHostDirective_Factory(t) { return new (t || ThemeHostDirective)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.Store), ɵngcc0.ɵɵdirectiveInject(THEME_SWITCHER_CONFIG), ɵngcc0.ɵɵdirectiveInject(ɵngcc22.OverlayContainer)); };
ThemeHostDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: ThemeHostDirective, selectors: [["", "dgpThemeHost", ""]] });
ThemeHostDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: Store },
    { type: undefined, decorators: [{ type: Inject, args: [THEME_SWITCHER_CONFIG,] }] },
    { type: OverlayContainer }
];
ThemeHostDirective = __decorate([ __param(3, Inject(THEME_SWITCHER_CONFIG))
], ThemeHostDirective);

let ThemeSwitcherEffects = class ThemeSwitcherEffects {
    constructor(actions$, store) {
        this.actions$ = actions$;
        this.store = store;
        this.toggleDarkMode$ = this.actions$.pipe(ofType(toggleDarkMode), switchMap(() => {
            return this.store.pipe(select(isDarkModeActiveSelector), first(), tap(isDarkModeActive => {
                localStorage.setItem("isDarkModeActive", JSON.stringify(isDarkModeActive));
            }));
        }));
    }
};
ThemeSwitcherEffects.ɵfac = function ThemeSwitcherEffects_Factory(t) { return new (t || ThemeSwitcherEffects)(ɵngcc0.ɵɵinject(ɵngcc3.Actions), ɵngcc0.ɵɵinject(ɵngcc1.Store)); };
ThemeSwitcherEffects.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: ThemeSwitcherEffects, factory: ThemeSwitcherEffects.ɵfac });
ThemeSwitcherEffects.ctorParameters = () => [
    { type: Actions },
    { type: Store }
];
__decorate([
    Effect({
        dispatch: false
    })
], ThemeSwitcherEffects.prototype, "toggleDarkMode$", void 0);

const initialThemeSwitcherState = {
    useDarkMode: false
};
const ɵ0$d = (state, action) => {
    return Object.assign(Object.assign({}, state), { useDarkMode: action.isDarkModeActive });
}, ɵ1$a = (state) => {
    return Object.assign(Object.assign({}, state), { useDarkMode: !state.useDarkMode });
};
const themeSwitcherReducer = createReducer(initialThemeSwitcherState, on(setIsDarkModeActive, ɵ0$d), on(toggleDarkMode, ɵ1$a));

var DgpThemeSwitcherModule_1;
const THEME_SWITCHER_REDUCER = new InjectionToken("ThemeSwitcherReducer");
function themeSwitcherReducerFactory() {
    return themeSwitcherReducer;
}
const themeSwitcherReducerProvider = {
    provide: THEME_SWITCHER_REDUCER,
    useFactory: themeSwitcherReducerFactory
};
let DgpThemeSwitcherModule = DgpThemeSwitcherModule_1 = class DgpThemeSwitcherModule {
    constructor(store) {
        this.store = store;
        const isDarkModeActiveJSON = localStorage.getItem("isDarkModeActive");
        if (!isNullOrUndefined$1(isDarkModeActiveJSON)) {
            const isDarkModeActive = JSON.parse(isDarkModeActiveJSON);
            this.store.dispatch(setIsDarkModeActive({ isDarkModeActive }));
        }
    }
    static forRoot(config = defaultThemeSwitcherConfig) {
        return {
            ngModule: DgpThemeSwitcherModule_1,
            providers: [{
                    provide: THEME_SWITCHER_CONFIG,
                    useValue: config
                }]
        };
    }
};
DgpThemeSwitcherModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: DgpThemeSwitcherModule });
DgpThemeSwitcherModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function DgpThemeSwitcherModule_Factory(t) { return new (t || DgpThemeSwitcherModule)(ɵngcc0.ɵɵinject(ɵngcc1.Store)); }, providers: [
        themeSwitcherReducerProvider
    ], imports: [[
            CommonModule,
            FormsModule,
            OverlayModule,
            MatSlideToggleModule,
            StoreModule.forFeature(themeSwitcherStoreFeature, THEME_SWITCHER_REDUCER),
            EffectsModule.forFeature([
                ThemeSwitcherEffects
            ])
        ]] });
DgpThemeSwitcherModule.ctorParameters = () => [
    { type: Store }
];

let TileComponent = class TileComponent {
};
TileComponent.ɵfac = function TileComponent_Factory(t) { return new (t || TileComponent)(); };
TileComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: TileComponent, selectors: [["dgp-tile"]], inputs: { route: "route", matIconName: "matIconName", label: "label", description: "description" }, decls: 10, vars: 4, consts: [[1, "container", 3, "routerLink"], ["matRipple", "", 1, "card"], [1, "description"], [1, "icon", "dgp-bg--primary"], [1, "label"], [1, "divider"]], template: function TileComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "a", 0);
        ɵngcc0.ɵɵelementStart(1, "mat-card", 1);
        ɵngcc0.ɵɵelementStart(2, "mat-card-content", 2);
        ɵngcc0.ɵɵelementStart(3, "mat-icon", 3);
        ɵngcc0.ɵɵtext(4);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(5, "div", 4);
        ɵngcc0.ɵɵtext(6);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelement(7, "mat-divider", 5);
        ɵngcc0.ɵɵelementStart(8, "div");
        ɵngcc0.ɵɵtext(9);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("routerLink", ctx.route);
        ɵngcc0.ɵɵadvance(4);
        ɵngcc0.ɵɵtextInterpolate(ctx.matIconName);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵtextInterpolate1(" ", ctx.label, " ");
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵtextInterpolate1(" ", ctx.description, " ");
    } }, directives: [ɵngcc2.RouterLinkWithHref, ɵngcc23.MatCard, ɵngcc9.MatRipple, ɵngcc23.MatCardContent, ɵngcc5.MatIcon, ɵngcc18.MatDivider], styles: [".container[_ngcontent-%COMP%] {\n            display: flex;\n            flex-direction: column;\n            max-height: 224px;\n            min-height: 224px;\n            height: 100%;\n            max-width: 224px;\n            min-width: 224px;\n            width: 100%;\n            text-decoration: inherit;\n            margin: 8px;\n        }\n\n        .card[_ngcontent-%COMP%] {\n            flex-grow: 1;\n        }\n\n        .description[_ngcontent-%COMP%] {\n            display: flex;\n            flex-direction: column;\n            justify-content: center;\n            align-items: center;\n            height: 100%;\n        }\n\n        .icon[_ngcontent-%COMP%] {\n            font-size: 40px;\n            height: 64px;\n            width: 64px;\n            color: white !important;\n            border-radius: 32px;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            margin-bottom: 16px;\n        }\n\n        .label[_ngcontent-%COMP%] {\n            font-size: larger;\n        }\n\n        .divider[_ngcontent-%COMP%] {\n            position: relative !important;\n            margin-top: 16px;\n            margin-bottom: 16px;\n        }"], changeDetection: 0 });
__decorate([
    Input()
], TileComponent.prototype, "route", void 0);
__decorate([
    Input()
], TileComponent.prototype, "matIconName", void 0);
__decorate([
    Input()
], TileComponent.prototype, "label", void 0);
__decorate([
    Input()
], TileComponent.prototype, "description", void 0);

let DgpTileModule = class DgpTileModule {
};
DgpTileModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: DgpTileModule });
DgpTileModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function DgpTileModule_Factory(t) { return new (t || DgpTileModule)(); }, imports: [[
            RouterModule,
            MatCardModule,
            MatRippleModule,
            MatIconModule,
            MatDividerModule
        ]] });

/**
 * Base class for classes for manipulating a model
 */
let DgpModelEditorComponentBase = 
// tslint:disable-next-line:directive-class-suffix
class DgpModelEditorComponentBase {
    constructor() {
        this.model$ = new BehaviorSubject(this.modelValue);
        this.modelChange = new EventEmitter();
    }
    get model() {
        return this.modelValue;
    }
    set model(value) {
        if (isEqual(value, this.modelValue)) {
            return;
        }
        this.modelValue = value;
        this.model$.next(value);
    }
    setModel(value) {
        this.model = value;
        this.modelChange.emit(this.model);
    }
    updateModel(value) {
        if ((value !== null && typeof value === "object") || (this.model !== null && typeof this.model === "object")) {
            this.model = Object.assign(Object.assign({}, this.model), value);
        }
        else {
            this.model = value;
        }
        this.modelChange.emit(this.model);
    }
};
DgpModelEditorComponentBase.ɵfac = function DgpModelEditorComponentBase_Factory(t) { return new (t || DgpModelEditorComponentBase)(); };
DgpModelEditorComponentBase.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: DgpModelEditorComponentBase, inputs: { model: "model" }, outputs: { modelChange: "modelChange" } });
__decorate([
    Input()
], DgpModelEditorComponentBase.prototype, "model", null);
__decorate([
    Output()
], DgpModelEditorComponentBase.prototype, "modelChange", void 0);

let HybridComponentBase = 
// tslint:disable-next-line:directive-class-suffix
class HybridComponentBase extends DgpModelEditorComponentBase {
    constructor(store) {
        super();
        this.store = store;
        this.dispatch = (x) => this.store.dispatch(x);
        this.select = (x) => this.store.select(x);
        // tslint:disable-next-line:member-ordering
        this.data$ = this.select(this.getData());
    }
};
HybridComponentBase.ɵfac = function HybridComponentBase_Factory(t) { return new (t || HybridComponentBase)(ɵngcc0.ɵɵdirectiveInject(ɵngcc1.Store)); };
HybridComponentBase.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: HybridComponentBase, features: [ɵngcc0.ɵɵInheritDefinitionFeature] });
HybridComponentBase.ctorParameters = () => [
    { type: Store }
];

class DgpSelectEntityViaRouteResolver {
    constructor(store, config) {
        this.store = store;
        this.config = config;
    }
    resolve(route, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const newSelectionIdFromRoute = yield this.config.getNewEntitySurrogateKeyFromRoute(route);
            const oldSelectionIdFromStore = yield this.config.getOldEntitySurrogateKeyFromStore();
            if (!oldSelectionIdFromStore && !newSelectionIdFromRoute) {
                return;
            }
            if (oldSelectionIdFromStore === newSelectionIdFromRoute) {
                return;
            }
            this.store.dispatch(composeEntityActions({
                select: {
                    [this.config.entityName]: [newSelectionIdFromRoute]
                },
                storeFeature: this.config.storeFeature
            }));
        });
    }
}

function isNullOrUndefined(value) {
    return value === null || value === undefined;
}
const nullOrUndefined = isNullOrUndefined;
const notNullOrUndefined = x => !nullOrUndefined(x);

let VirtualListItemDirective = class VirtualListItemDirective {
};
VirtualListItemDirective.ɵfac = function VirtualListItemDirective_Factory(t) { return new (t || VirtualListItemDirective)(); };
VirtualListItemDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: VirtualListItemDirective, selectors: [["", "dgpVirtualListItem", ""]] });

let VirtualListPanelComponent = class VirtualListPanelComponent {
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.itemSize = 48;
    }
    ngAfterViewInit() {
        const parentNode = this.renderer.parentNode(this.elementRef.nativeElement);
        this.renderer.setStyle(parentNode, "flex-grow", 1);
        this.renderer.setStyle(parentNode, "overflow", "auto");
        this.renderer.setStyle(parentNode, "height", "100%");
    }
};
VirtualListPanelComponent.ɵfac = function VirtualListPanelComponent_Factory(t) { return new (t || VirtualListPanelComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2)); };
VirtualListPanelComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: VirtualListPanelComponent, selectors: [["dgp-virtual-list-panel"]], contentQueries: function VirtualListPanelComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵngcc0.ɵɵcontentQuery(dirIndex, VirtualListItemDirective, true, TemplateRef);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.itemTemplate = _t.first);
    } }, inputs: { itemSize: "itemSize", items: "items" }, decls: 2, vars: 2, consts: [[2, "height", "100%", "width", "100%", 3, "itemSize"], [4, "cdkVirtualFor", "cdkVirtualForOf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]], template: function VirtualListPanelComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "cdk-virtual-scroll-viewport", 0);
        ɵngcc0.ɵɵtemplate(1, VirtualListPanelComponent_ng_container_1_Template, 2, 4, "ng-container", 1);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("itemSize", ctx.itemSize);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("cdkVirtualForOf", ctx.items);
    } }, directives: [ɵngcc24.CdkVirtualScrollViewport, ɵngcc24.CdkFixedSizeVirtualScroll, ɵngcc24.CdkVirtualForOf, ɵngcc4.NgTemplateOutlet], encapsulation: 2, changeDetection: 0 });
VirtualListPanelComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
__decorate([
    Input()
], VirtualListPanelComponent.prototype, "itemSize", void 0);
__decorate([
    Input()
], VirtualListPanelComponent.prototype, "items", void 0);
__decorate([
    ContentChild(VirtualListItemDirective, { read: TemplateRef })
], VirtualListPanelComponent.prototype, "itemTemplate", void 0);

let DgpVirtualListPanelModule = class DgpVirtualListPanelModule {
};
DgpVirtualListPanelModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: DgpVirtualListPanelModule });
DgpVirtualListPanelModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function DgpVirtualListPanelModule_Factory(t) { return new (t || DgpVirtualListPanelModule)(); }, imports: [[
            CommonModule,
            ScrollingModule
        ]] });

var DgpNgAppModule_1;
const APP_REDUCER = new InjectionToken("AppReducer");
let DgpNgAppModule = DgpNgAppModule_1 = class DgpNgAppModule {
    static forRoot(config) {
        return {
            ngModule: DgpNgAppModule_1,
            providers: [{
                    provide: APP_REDUCER,
                    useValue: config.appReducer
                }]
        };
    }
};
DgpNgAppModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: DgpNgAppModule });
DgpNgAppModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function DgpNgAppModule_Factory(t) { return new (t || DgpNgAppModule)(); }, imports: [[
            BrowserModule,
            BrowserAnimationsModule,
            StoreModule.forRoot(APP_REDUCER, {
                metaReducers: [hmrReducer]
            }),
            EffectsModule.forRoot([]),
            DgpHamburgerShellModule.forRoot(),
            DgpThemeSwitcherModule.forRoot(),
            DgpHamburgerMenuModule,
            DgpLogModule,
            DgpRequestStoreModule,
            DgpRoutingOverlayModule
        ],
        DgpHamburgerShellModule,
        DgpThemeSwitcherModule,
        DgpHamburgerMenuModule] });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AuthenticationGuard, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc1.Store }, { type: ɵngcc2.Router }]; }, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AuthenticationServiceImpl, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc1.Store }, { type: AuthenticationApiClient }]; }, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(DgpAuthenticationModule, { imports: [ɵngcc1.StoreFeatureModule] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DgpAuthenticationModule, [{
        type: NgModule,
        args: [{
                imports: [
                    StoreModule.forFeature(authenticationStoreFeature, AUTHENTICATION_REDUCER)
                ],
                providers: [
                    appInitializerProvider,
                    authenticationReducerProvider,
                    AuthenticationGuard,
                    authenticationServiceProvider
                ]
            }]
    }], null, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NoPeonGuard, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc1.Store }]; }, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BroadcastStoreDecorator, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc1.StateObservable, decorators: [{
                type: Inject,
                args: [StateObservable]
            }] }, { type: ɵngcc1.ActionsSubject, decorators: [{
                type: Inject,
                args: [ActionsSubject]
            }] }, { type: ɵngcc1.ReducerManager, decorators: [{
                type: Inject,
                args: [ReducerManager]
            }] }, { type: undefined, decorators: [{
                type: Inject,
                args: [BROADCAST_CONFIG]
            }] }]; }, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BroadcastChannelServiceImpl, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [BROADCAST_CONFIG]
            }] }]; }, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BroadcastEffects, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc3.Actions }, { type: ɵngcc1.Store }, { type: BroadcastChannelService }, { type: undefined, decorators: [{
                type: Inject,
                args: [BROADCAST_CONFIG]
            }] }]; }, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(DgpBroadcastStoreModule, { imports: function () { return [ɵngcc1.StoreFeatureModule, ɵngcc3.EffectsFeatureModule, MatSnackBarModule]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DgpBroadcastStoreModule, [{
        type: NgModule,
        args: [{
                imports: [
                    StoreModule.forFeature(broadcastStoreFeature, BROADCAST_REDUCER),
                    EffectsModule.forFeature([
                        BroadcastEffects
                    ]),
                    MatSnackBarModule
                ],
                providers: [
                    broadcastChannelServiceProvider,
                    {
                        provide: BROADCAST_CONFIG,
                        useValue: ɵ0$3
                    },
                    NoPeonGuard,
                    broadcastReducerProvider
                ]
            }]
    }], null, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(EmptyStateComponent, [{
        type: Component,
        args: [{
                selector: "dgp-empty-state",
                template: `
        <dgp-empty-state-icon *ngIf="matIconName">
            {{ matIconName }}
        </dgp-empty-state-icon>
        <dgp-empty-state-title>
            {{ title }}
        </dgp-empty-state-title>

        <dgp-empty-state-content>
            <ng-content></ng-content>
        </dgp-empty-state-content>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            max-height: 640px;
            height: 100%;
            justify-content: center;
            align-items: center;
        }
    `]
            }]
    }], null, { matIconName: [{
            type: Input
        }], title: [{
            type: Input
        }] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(EmptyStateContentComponent, [{
        type: Component,
        args: [{
                selector: "dgp-empty-state-content",
                template: `<ng-content></ng-content>`,
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], null, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(EmptyStateIconComponent, [{
        type: Component,
        args: [{
                selector: "dgp-empty-state-icon",
                template: `
        <mat-icon class="icon">
            <ng-content></ng-content>
        </mat-icon>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
        :host {
            margin-left: 16px;
            margin-right: 16px;
            display: inline-flex;
        }

        .icon {
            color: gray;
            font-size: 64px;
            width: 64px;
            height: 64px;
        }
    `]
            }]
    }], null, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(EmptyStateTitleComponent, [{
        type: Component,
        args: [{
                selector: "dgp-empty-state-title",
                template: `
        <h1 class="mat-h1">
            <ng-content></ng-content>
        </h1>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
        :host {
            display: inline-flex;
            color: gray;
        }
    `]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(DgpEmptyStateModule, { declarations: function () { return [EmptyStateComponent,
        EmptyStateContentComponent,
        EmptyStateIconComponent,
        EmptyStateTitleComponent]; }, imports: function () { return [CommonModule,
        MatIconModule]; }, exports: function () { return [EmptyStateComponent]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DgpEmptyStateModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    MatIconModule
                ],
                declarations: [
                    EmptyStateComponent,
                    EmptyStateContentComponent,
                    EmptyStateIconComponent,
                    EmptyStateTitleComponent
                ],
                exports: [
                    EmptyStateComponent
                ]
            }]
    }], null, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(FileViewerComponentBase, [{
        type: Directive
    }], null, { fileItem: [{
            type: Input
        }] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(FallbackFileViewerComponent, [{
        type: Component,
        args: [{
                selector: "dgp-fallback-file-viewer",
                template: `
        <dgp-empty-state title="No preview available"
                         matIconName="get_app">

            <a *ngIf="!isTridentOrEdge; else ieFallback"
               class="download-link"
               [href]="fileItem.url | safe:'url'"
               target="_blank">
                Download it here
            </a>

            <ng-template #ieFallback>
                <a class="download-link"
                   href="javascript:;"
                   (click)="downloadFileInTridentOrEdge()">
                    Download it here
                </a>
            </ng-template>

        </dgp-empty-state>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            width: 100%;
            height: 100%;
        }

        .download-link {
            color: inherit;
        }
    `]
            }]
    }], function () { return [{ type: ɵngcc6.Platform }]; }, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(FileItemListComponent, [{
        type: Component,
        args: [{
                selector: "dgp-file-item-list",
                template: `
        <mat-nav-list style="overflow: auto;">
            <ng-container *ngFor="let directory of model.directories">
                <h3 mat-subheader>{{ directory.label }}</h3>

                <a *ngFor="let fileItemId of directory.fileItemIds"
                   mat-list-item
                   [routerLink]="[]"
                   routerLinkActive="dgp-list-item --selected"
                   [queryParams]="{ fileItemId: model.fileItemKVS[fileItemId].fileItemId }"
                   [matTooltip]="model.fileItemKVS[fileItemId].fileName"
                   matTooltipShowDelay="500"
                   (keydown.delete)="removeFileItem(model.fileItemKVS[fileItemId])">
                    <mat-icon matListIcon>
                        insert_drive_file
                    </mat-icon>
                    <div matLine
                         style="display: flex; align-items: center;">

                        <div style="flex-grow: 1; display: flex; flex-direction: column; overflow: hidden;">

                            <div style="flex-grow: 1; display: flex;">
                                {{ model.fileItemKVS[fileItemId].fileName }}
                                <dgp-spacer></dgp-spacer>
                                <small>{{ model.fileItemKVS[fileItemId].extension }}</small>
                            </div>

                            <div style="display: flex;">
                                <small>{{ model.fileItemKVS[fileItemId].creationDate | date:'hh:mm, dd MMMM yyyy' }}</small>
                                <dgp-spacer></dgp-spacer>
                                <small>{{ getFileItemSize(model.fileItemKVS[fileItemId]) }}</small>
                            </div>
                        </div>

                        <button mat-icon-button
                                style="margin-left: 16px;"
                                [matMenuTriggerFor]="overflowMenu"
                                [disabled]="disabled">

                            <mat-icon>
                                more_vert
                            </mat-icon>

                        </button>

                        <mat-menu #overflowMenu="matMenu">
                            <button mat-menu-item
                                    (click)="removeFileItem(model.fileItemKVS[fileItemId])"
                                    [disabled]="disabled">Remove
                            </button>
                        </mat-menu>

                    </div>
                </a>

            </ng-container>
        </mat-nav-list>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            overflow: auto;
        }
    `]
            }]
    }], function () { return []; }, { fileItemRemoved: [{
            type: Output
        }], disabled: [{
            type: Input
        }], model: [{
            type: Input
        }] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(FileViewerComponent, [{
        type: Component,
        args: [{
                selector: "dgp-file-viewer",
                template: `

        <ng-container *ngIf="isKnownFileType; else dynamicViewer">
            <ng-container [ngSwitch]="fileItem.extension">
                <dgp-jpg-viewer *ngSwitchCase="'jpg'"
                                [fileItem]="fileItem"></dgp-jpg-viewer>
                <dgp-pdf-viewer *ngSwitchCase="'pdf'"
                                [fileItem]="fileItem"></dgp-pdf-viewer>
                <dgp-png-viewer *ngSwitchCase="'png'"
                                [fileItem]="fileItem"></dgp-png-viewer>
                <dgp-svg-viewer *ngSwitchCase="'svg'"
                                [fileItem]="fileItem"></dgp-svg-viewer>
                <dgp-fallback-file-viewer *ngSwitchDefault
                                          [fileItem]="fileItem"></dgp-fallback-file-viewer>
            </ng-container>
        </ng-container>

        <ng-template #dynamicViewer>
            <dgp-dynamic-file-viewer [fileItem]="fileItem"></dgp-dynamic-file-viewer>
        </ng-template>

    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
        :host {
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    `]
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [FILE_VIEWER_CONFIG]
            }] }]; }, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DynamicFileViewerComponent, [{
        type: Component,
        args: [{
                selector: "dgp-dynamic-file-viewer",
                template: ``,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            width: 100%;
            height: 100%;
        }
    `]
            }]
    }], function () { return [{ type: ɵngcc0.ComponentFactoryResolver }, { type: ɵngcc0.ViewContainerRef }, { type: undefined, decorators: [{
                type: Inject,
                args: [FILE_VIEWER_CONFIG]
            }] }]; }, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(JpgViewerComponent, [{
        type: Component,
        args: [{
                selector: "dgp-jpg-viewer",
                template: `
        <img *ngIf="!isTrident; else fallback"
             [src]="fileItem.url | safe:'url'"
             class="image"
             alt="{{ fileItem.fileName }}">
        <ng-template #fallback>
            <div class="trident-container">
                <img [src]="fileItem.url | safe:'url'"
                     class="trident-image"
                     alt="{{ fileItem.fileName }}">
            </div>
        </ng-template>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            width: 100%;
            height: 100%;
        }

        .image {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }

        .trident-container {
            display: flex;
            overflow: auto;
            flex-shrink: 0;
        }

        .trident-image {
            margin: auto;
            flex-shrink: 0;
        }
    `]
            }]
    }], function () { return [{ type: ɵngcc6.Platform }]; }, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(PdfViewerComponent, [{
        type: Component,
        args: [{
                selector: "dgp-pdf-viewer",
                template: `

        <ng-container *ngIf="platform.FIREFOX || platform.BLINK || platform.EDGE; else fallback">

            <ng-container *ngIf="platform.FIREFOX || platform.BLINK">
                <object [attr.data]="fileItem.url | safe:'resourceUrl'"
                        type="application/pdf"
                        width="100%"
                        height="100%">
                    <dgp-fallback-file-viewer [fileItem]="fileItem"></dgp-fallback-file-viewer>
                </object>
            </ng-container>

            <ng-container *ngIf="platform.EDGE">
                <div [innerHTML]="edgeHTML | safe:'html'"
                     class="edge-helper"></div>
            </ng-container>

        </ng-container>

        <ng-template #fallback>
            <dgp-fallback-file-viewer [fileItem]="fileItem"></dgp-fallback-file-viewer>
        </ng-template>

    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            width: 100%;
            height: 100%;
        }

        .edge-helper {
            flex-grow: 1;
        }
    `]
            }]
    }], function () { return [{ type: ɵngcc6.Platform }, { type: ɵngcc0.ChangeDetectorRef }]; }, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(PngViewerComponent, [{
        type: Component,
        args: [{
                selector: "dgp-png-viewer",
                template: `
        <img *ngIf="!isTrident; else fallback"
             [src]="fileItem.url | safe:'url'"
             class="image"
             alt="{{ fileItem.fileName }}">
        <ng-template #fallback>
            <div class="trident-container">
                <img [src]="fileItem.url | safe:'url'"
                     class="trident-image"
                     alt="{{ fileItem.fileName }}">
            </div>
        </ng-template>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            width: 100%;
            height: 100%;
        }

        .image {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }

        .trident-container {
            display: flex;
            overflow: auto;
            flex-shrink: 0;
        }

        .trident-image {
            margin: auto;
            flex-shrink: 0;
        }

    `]
            }]
    }], function () { return [{ type: ɵngcc6.Platform }]; }, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(SvgViewerComponent, [{
        type: Component,
        args: [{
                selector: "dgp-svg-viewer",
                template: `
        <img *ngIf="!isTrident; else fallback"
             [src]="fileItem.url | safe:'url'"
             class="image"
             alt="{{ fileItem.fileName }}">
        <ng-template #fallback>
            <div class="trident-container">
                <img [src]="fileItem.url | safe:'url'"
                     class="trident-image"
                     alt="{{ fileItem.fileName }}">
            </div>
        </ng-template>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            width: 100%;
            height: 100%;
        }

        .image {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }

        .trident-container {
            display: flex;
            overflow: auto;
            flex-shrink: 0;
        }

        .trident-image {
            margin: auto;
            flex-shrink: 0;
        }

    `]
            }]
    }], function () { return [{ type: ɵngcc6.Platform }]; }, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(SpacerComponent, [{
        type: Component,
        args: [{
                selector: "dgp-spacer",
                template: ``,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
        :host {
            flex-grow: 1;
        }
    `]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(DgpSpacerModule, { declarations: [SpacerComponent], exports: [SpacerComponent] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DgpSpacerModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    SpacerComponent
                ],
                exports: [
                    SpacerComponent
                ]
            }]
    }], null, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(SafePipe, [{
        type: Pipe,
        args: [{
                name: "safe"
            }]
    }], function () { return [{ type: ɵngcc12.DomSanitizer }]; }, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(SafePipeModule, { declarations: [SafePipe], exports: [SafePipe] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(SafePipeModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    SafePipe
                ],
                exports: [
                    SafePipe
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(DgpFileViewerModule, { declarations: function () { return [PdfViewerComponent,
        JpgViewerComponent,
        PngViewerComponent,
        SvgViewerComponent,
        FileViewerComponent,
        FallbackFileViewerComponent,
        FileItemListComponent,
        DynamicFileViewerComponent]; }, imports: function () { return [PlatformModule,
        DgpEmptyStateModule,
        MatListModule,
        RouterModule,
        CommonModule,
        MatTooltipModule,
        MatIconModule,
        DgpSpacerModule,
        MatButtonModule,
        MatMenuModule,
        SafePipeModule]; }, exports: function () { return [PdfViewerComponent,
        JpgViewerComponent,
        PngViewerComponent,
        SvgViewerComponent,
        FileViewerComponent,
        FallbackFileViewerComponent,
        FileItemListComponent,
        DynamicFileViewerComponent]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DgpFileViewerModule, [{
        type: NgModule,
        args: [{
                imports: [
                    PlatformModule,
                    DgpEmptyStateModule,
                    MatListModule,
                    RouterModule,
                    CommonModule,
                    MatTooltipModule,
                    MatIconModule,
                    DgpSpacerModule,
                    MatButtonModule,
                    MatMenuModule,
                    SafePipeModule
                ],
                declarations: [
                    PdfViewerComponent,
                    JpgViewerComponent,
                    PngViewerComponent,
                    SvgViewerComponent,
                    FileViewerComponent,
                    FallbackFileViewerComponent,
                    FileItemListComponent,
                    DynamicFileViewerComponent
                ],
                exports: [
                    PdfViewerComponent,
                    JpgViewerComponent,
                    PngViewerComponent,
                    SvgViewerComponent,
                    FileViewerComponent,
                    FallbackFileViewerComponent,
                    FileItemListComponent,
                    DynamicFileViewerComponent
                ],
                providers: [{
                        provide: FILE_VIEWER_CONFIG,
                        useValue: defaultFileViewerConfig
                    }]
            }]
    }], null, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DragFileListenerDirective, [{
        type: Directive,
        args: [{
                selector: "[dgpFileDragListener]"
            }]
    }], function () { return [{ type: ɵngcc1.Store }, { type: ɵngcc0.ElementRef }]; }, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(OpenFileManagerViaShortKeyDirective, [{
        type: Directive,
        args: [{
                selector: "[dgpOpenFileManagerViaShortKey]"
            }]
    }], function () { return [{ type: ɵngcc1.Store }, { type: undefined, decorators: [{
                type: Inject,
                args: [FILE_UPLOAD_CONFIG]
            }] }]; }, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DgpContainer, [{
        type: Directive
    }], function () { return [{ type: ɵngcc1.Store }]; }, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(FileManagerComponent, [{
        type: Component,
        args: [{
                selector: "dgp-file-manager",
                template: `

        <ng-container *ngIf="(isDropTargetVisible$ | async) === false; else dropTarget">

            <h2 mat-dialog-title
                style="display: flex; align-items: center">
                File manager
                <dgp-spacer></dgp-spacer>
                <button *ngIf="!isMaximized"
                        mat-icon-button
                        (click)="maximize()"
                        matTooltip="Maximize">
                    <mat-icon>crop_din</mat-icon>
                </button>
                <button *ngIf="isMaximized"
                        mat-icon-button
                        (click)="minimize()"
                        matTooltip="Minimize">
                    <mat-icon>filter_none</mat-icon>
                </button>
                <button mat-icon-button
                        mat-dialog-close
                        matTooltip="Close dialog">
                    <mat-icon>close</mat-icon>
                </button>
            </h2>

            <dgp-list-details-page *ngIf="canOpenFileDrawer$ | async; else singleFileMode">

                <ng-container dgp-list-details-page-menu>
                    <dgp-file-item-list [model]="fileItemListModel$ | async"
                                        (fileItemRemoved)="removeFileItem($event)"
                                        [disabled]="isRemoveFilesDisabled$ | async"></dgp-file-item-list>
                    <dgp-spacer></dgp-spacer>
                    <mat-nav-list *ngIf="!(isAddFilesDisabled$ | async)">
                        <a mat-list-item
                           (click)="filePicker.click()">
                            <mat-icon>
                                open_in_new
                            </mat-icon>
                            <div matLine>
                                Choose file via picker
                            </div>
                            <input hidden
                                   multiple
                                   (change)="onFileSelected($event)"
                                   type="file"
                                   #filePicker>
                        </a>
                    </mat-nav-list>
                </ng-container>

                <dgp-file-viewer [fileItem]="selectedFileItem$ | async"></dgp-file-viewer>

            </dgp-list-details-page>

            <ng-template #singleFileMode>
                <dgp-file-viewer [fileItem]="selectedFileItem$ | async"></dgp-file-viewer>
            </ng-template>
        </ng-container>

        <ng-template #dropTarget>

            <dgp-empty-state title="Drop file here"
                             matIconName="get_app"
                             class="drop-target">
                Drop one or more files into this zone to upload them.
                <br>
                You can preview them afterward.
                <br>
                <button mat-button
                        [disabled]="isAddFilesDisabled$ | async"
                        (click)="filePicker.click()"
                        style="display: flex; max-width: 480px; width: 100%; justify-content: center; margin-top: 16px;">
                    <mat-icon style="margin-right: 4px;">open_in_new</mat-icon>
                    Choose file via picker
                </button>

                <input hidden
                       multiple
                       (change)="onFileSelected($event)"
                       type="file"
                       #filePicker>

            </dgp-empty-state>

        </ng-template>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            width: 100%;
            height: 100%;
        }

        .drop-target {
            border: 2px dashed white;
            max-height: 100%;
        }

    `]
            }]
    }], function () { return [{ type: ɵngcc1.Store }, { type: ɵngcc0.ElementRef }, { type: ɵngcc13.MatDialogRef }, { type: undefined, decorators: [{
                type: Inject,
                args: [FILE_UPLOAD_CONFIG]
            }] }]; }, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(FileUploadEffects, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc3.Actions }, { type: ɵngcc1.Store }, { type: ɵngcc13.MatDialog }, { type: ɵngcc2.ActivatedRoute }, { type: ɵngcc2.Router }, { type: undefined, decorators: [{
                type: Inject,
                args: [FILE_UPLOAD_CONFIG]
            }] }]; }, null); })();
const ɵPageHeaderComponent_BaseFactory = ɵngcc0.ɵɵgetInheritedFactory(PageHeaderComponent);
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(PageHeaderComponent, [{
        type: Component,
        args: [{
                selector: "dgp-page-header",
                template: `
        <mat-toolbar color="primary"
                     class="toolbar">
            <div class="progress-bar-container">
                <mat-progress-bar *ngIf="hasPendingRequests$ | async"
                                  color="accent"
                                  mode="query"></mat-progress-bar>
            </div>
            <ng-content></ng-content>
        </mat-toolbar>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
        .toolbar {
            position: relative;
        }

        .progress-bar-container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
        }
    `]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(DgpPageHeaderModule, { declarations: function () { return [PageHeaderComponent]; }, imports: function () { return [CommonModule,
        MatToolbarModule,
        MatProgressBarModule]; }, exports: function () { return [PageHeaderComponent]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DgpPageHeaderModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    MatToolbarModule,
                    MatProgressBarModule
                ],
                declarations: [
                    PageHeaderComponent
                ],
                exports: [
                    PageHeaderComponent
                ],
                providers: []
            }]
    }], null, null); })();
const ɵListDetailsPageComponent_BaseFactory = ɵngcc0.ɵɵgetInheritedFactory(ListDetailsPageComponent);
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ListDetailsPageComponent, [{
        type: Component,
        args: [{
                selector: "dgp-list-details-page",
                template: `
        <mat-drawer-container class="page-menu-drawer-container">

            <mat-drawer [mode]="pageMenuDrawerMode$ | async"
                        [opened]="isPageMenuDrawerOpen$ | async"
                        (closed)="closePageMenuDrawer()"
                        class="page-menu-drawer mat-elevation-z4">

                <ng-content select="[dgp-list-details-page-menu]"></ng-content>

            </mat-drawer>

            <mat-drawer-content class="page-menu-drawer-content">

                <div class="page-menu-drawer-toggle-container">

                    <button mat-icon-button
                            (click)="togglePageMenuDrawer()"
                            matTooltip="Toggle menu drawer">
                        <mat-icon *ngIf="isPageMenuDrawerOpen$ | async; else closedIcon">
                            arrow_back
                        </mat-icon>
                        <ng-template #closedIcon>
                            <mat-icon>arrow_forward</mat-icon>
                        </ng-template>
                    </button>

                </div>

                <ng-content></ng-content>

            </mat-drawer-content>

        </mat-drawer-container>

    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
        :host {
            display: flex;
            flex-direction: column;
            overflow: auto;
            flex-grow: 1;
        }

        .page-menu-drawer-container {
            display: flex;
            flex-grow: 1;
            overflow: inherit;
        }

        .page-menu-drawer {
            width: 360px;
        }

        .page-menu-drawer-content {
            overflow: auto;
            flex-grow: 1;
            display: flex;
            position: relative;
        }

        .page-menu-drawer-toggle-container {
            display: flex;
            align-items: center;
            top: 0;
            bottom: 0;
            position: absolute;
        }

    `]
            }]
    }], null, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ListDetailsPageContentComponent, [{
        type: Component,
        args: [{
                selector: "dgp-list-details-page-content",
                template: `<ng-content></ng-content>`,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            max-width: 800px;
            width: 100%;
            padding: 32px;
            justify-self: center;
            margin-right: auto;
            margin-left: auto;
        }
    `]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(DgpListDetailsPageModule, { declarations: function () { return [ListDetailsPageContentComponent,
        ListDetailsPageComponent]; }, imports: function () { return [CommonModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatTooltipModule]; }, exports: function () { return [ListDetailsPageContentComponent,
        ListDetailsPageComponent]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DgpListDetailsPageModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    MatButtonModule,
                    MatIconModule,
                    MatSidenavModule,
                    MatTooltipModule
                ],
                declarations: [
                    ListDetailsPageContentComponent,
                    ListDetailsPageComponent
                ],
                exports: [
                    ListDetailsPageContentComponent,
                    ListDetailsPageComponent
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(DgpFileUploadModule, { declarations: function () { return [DragFileListenerDirective,
        OpenFileManagerViaShortKeyDirective,
        FileManagerComponent]; }, imports: function () { return [CommonModule,
        MatDialogModule, ɵngcc1.StoreFeatureModule, ɵngcc3.EffectsFeatureModule, DgpPageHeaderModule,
        DgpListDetailsPageModule,
        MatListModule,
        RouterModule,
        MatIconModule,
        DgpSpacerModule,
        MatButtonModule,
        MatMenuModule,
        DgpEmptyStateModule,
        MatTooltipModule,
        DgpFileViewerModule]; }, exports: function () { return [DragFileListenerDirective,
        OpenFileManagerViaShortKeyDirective]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DgpFileUploadModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    MatDialogModule,
                    StoreModule.forFeature(fileUploadStoreFeature, FILE_UPLOAD_REDUCER),
                    EffectsModule.forFeature([
                        FileUploadEffects
                    ]),
                    DgpPageHeaderModule,
                    DgpListDetailsPageModule,
                    MatListModule,
                    RouterModule,
                    MatIconModule,
                    DgpSpacerModule,
                    MatButtonModule,
                    MatMenuModule,
                    DgpEmptyStateModule,
                    MatTooltipModule,
                    DgpFileViewerModule
                ],
                declarations: [
                    DragFileListenerDirective,
                    OpenFileManagerViaShortKeyDirective,
                    FileManagerComponent
                ],
                exports: [
                    DragFileListenerDirective,
                    OpenFileManagerViaShortKeyDirective
                ],
                entryComponents: [
                    FileManagerComponent
                ],
                providers: [
                    fileUploadReducerProvider, {
                        provide: FILE_UPLOAD_CONFIG,
                        useValue: ɵ0$8
                    }
                ]
            }]
    }], null, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(HamburgerShellComponent, [{
        type: Component,
        args: [{
                selector: "dgp-hamburger-shell",
                template: `
        <mat-drawer-container class="hamburger-menu-drawer-container">

            <mat-drawer [mode]="hamburgerMenuMode$ | async"
                        [opened]="isHamburgerMenuOpen$ | async"
                        class="hamburger-menu-drawer mat-elevation-z4"
                        (closed)="closeHamburgerMenu()">

                <div class="progress-bar-container">
                    <mat-progress-bar *ngIf="hasPendingRequests$ | async"
                                      color="accent"
                                      mode="query"></mat-progress-bar>
                </div>

                <ng-content select="[dgp-hamburger-menu]"></ng-content>

            </mat-drawer>

            <mat-drawer-content class="hamburger-menu-drawer-content">

                <ng-content></ng-content>

            </mat-drawer-content>

        </mat-drawer-container>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            overflow: auto;
        }

        .hamburger-menu-drawer-container {
            flex-grow: 1;
            display: flex !important;
        }

        .hamburger-menu-drawer {
            width: 240px;
        }

        .progress-bar-container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
        }

        .hamburger-menu-drawer-content {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            height: auto;
        }
    `]
            }]
    }], function () { return [{ type: ɵngcc1.Store }]; }, null); })();
const ɵHamburgerMenuToggleComponent_BaseFactory = ɵngcc0.ɵɵgetInheritedFactory(HamburgerMenuToggleComponent);
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(HamburgerMenuToggleComponent, [{
        type: Component,
        args: [{
                selector: "dgp-hamburger-menu-toggle",
                template: `
        <button mat-icon-button
                (click)="toggleHamburgerMenu()">
            <mat-icon>menu</mat-icon>
        </button>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
        :host {
            margin-right: 8px;
        }
    `]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(DgpHamburgerMenuToggleModule, { declarations: function () { return [HamburgerMenuToggleComponent]; }, imports: function () { return [CommonModule,
        MatButtonModule,
        MatIconModule]; }, exports: function () { return [HamburgerMenuToggleComponent]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DgpHamburgerMenuToggleModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    MatButtonModule,
                    MatIconModule
                ],
                declarations: [
                    HamburgerMenuToggleComponent
                ],
                exports: [
                    HamburgerMenuToggleComponent
                ]
            }]
    }], null, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(HamburgerMenuComponent, [{
        type: Component,
        args: [{
                selector: "dgp-hamburger-menu",
                template: `<ng-content></ng-content>`,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            height: 100%;
        }
    `]
            }]
    }], null, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(HamburgerMenuHeaderComponent, [{
        type: Component,
        args: [{
                selector: "dgp-hamburger-menu-header",
                template: `
        <mat-toolbar color="primary"
                     class="hamburger-menu__header">
            <ng-content></ng-content>
        </mat-toolbar>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
    
   `]
            }]
    }], null, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(HamburgerMenuEntriesComponent, [{
        type: Component,
        args: [{
                selector: "dgp-hamburger-menu-entries",
                template: `
        <mat-nav-list>
            <ng-content></ng-content>
        </mat-nav-list>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
        :host {
            display: flex;
            flex-direction: column;
            overflow: auto;
            flex-grow: 1;
        }

        mat-nav-list {
            flex-grow: 1;
        }
    `]
            }]
    }], null, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(HamburgerMenuEntryComponent, [{
        type: Component,
        args: [{
                selector: "dgp-hamburger-menu-entry",
                template: `
        <a *ngIf="isNonEmptyRoute(); else emptyRoute"
           mat-list-item
           [routerLink]="route"
           [routerLinkActive]="'dgp-list-item--selected'"
           [class.disabled]="disabled"
           [attr.tabindex]="disabled ? -1 : 0">
            <mat-icon>{{ matIconName }}</mat-icon>
            {{ label }}
        </a>

        <ng-template #emptyRoute>
            <a mat-list-item
               class="disabled"
               tabindex="-1">
                <mat-icon>{{ matIconName }}</mat-icon>
                {{ label }}
            </a>
        </ng-template>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
        mat-icon {
            margin-right: 16px;
        }

        .disabled {
            pointer-events: none;
            color: gray !important;
        }
    `]
            }]
    }], null, { matIconName: [{
            type: Input
        }], label: [{
            type: Input
        }], route: [{
            type: Input
        }], disabled: [{
            type: Input
        }] }); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(DgpHamburgerMenuModule, { declarations: function () { return [HamburgerMenuComponent,
        HamburgerMenuHeaderComponent,
        HamburgerMenuEntriesComponent,
        HamburgerMenuEntryComponent]; }, imports: function () { return [MatToolbarModule,
        MatListModule,
        RouterModule,
        MatIconModule,
        CommonModule]; }, exports: function () { return [HamburgerMenuComponent,
        HamburgerMenuHeaderComponent,
        HamburgerMenuEntriesComponent,
        HamburgerMenuEntryComponent]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DgpHamburgerMenuModule, [{
        type: NgModule,
        args: [{
                imports: [
                    MatToolbarModule,
                    MatListModule,
                    RouterModule,
                    MatIconModule,
                    CommonModule
                ],
                declarations: [
                    HamburgerMenuComponent,
                    HamburgerMenuHeaderComponent,
                    HamburgerMenuEntriesComponent,
                    HamburgerMenuEntryComponent
                ],
                exports: [
                    HamburgerMenuComponent,
                    HamburgerMenuHeaderComponent,
                    HamburgerMenuEntriesComponent,
                    HamburgerMenuEntryComponent
                ]
            }]
    }], null, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(HamburgerShellEffects, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc3.Actions }, { type: ɵngcc1.Store }, { type: ɵngcc17.BreakpointObserver }, { type: undefined, decorators: [{
                type: Inject,
                args: [HAMBURGER_SHELL_CONFIG]
            }] }]; }, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(DgpHamburgerShellModule, { declarations: function () { return [HamburgerShellComponent]; }, imports: function () { return [LayoutModule,
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatProgressBarModule,
        MatSidenavModule, ɵngcc1.StoreFeatureModule, ɵngcc3.EffectsFeatureModule, RouterModule]; }, exports: function () { return [HamburgerShellComponent]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DgpHamburgerShellModule, [{
        type: NgModule,
        args: [{
                imports: [
                    LayoutModule,
                    CommonModule,
                    FormsModule,
                    MatButtonModule,
                    MatIconModule,
                    MatProgressBarModule,
                    MatSidenavModule,
                    StoreModule.forFeature(hamburgerShellStoreFeature, HAMBURGER_SHELL_REDUCER),
                    EffectsModule.forFeature([
                        HamburgerShellEffects
                    ]),
                    RouterModule
                ],
                providers: [
                    hamburgerShellReducerProvider
                ],
                declarations: [
                    HamburgerShellComponent
                ],
                exports: [
                    HamburgerShellComponent
                ]
            }]
    }], null, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(LogPageComponent, [{
        type: Component,
        args: [{
                selector: "dgp-log-page",
                template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Log
        </dgp-page-header>

        <dgp-list-details-page>

            <ng-container dgp-list-details-page-menu>
                <dgp-log-entry-list></dgp-log-entry-list>
            </ng-container>

            <dgp-list-details-page-content>
                <dgp-log-entry-details [logEntry]="logEntry$ | async"></dgp-log-entry-details>
            </dgp-list-details-page-content>

        </dgp-list-details-page>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], function () { return [{ type: ɵngcc1.Store }, { type: ɵngcc2.ActivatedRoute }]; }, null); })();
const ɵLogEntryListComponent_BaseFactory = ɵngcc0.ɵɵgetInheritedFactory(LogEntryListComponent);
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(LogEntryListComponent, [{
        type: Component,
        args: [{
                selector: "dgp-log-entry-list",
                template: `
        <mat-nav-list *ngIf="hasLogEntries$ | async; else emptyState">
            <h3 mat-subheader>Entries</h3>
            <a mat-list-item
               *ngFor="let logEntry of logEntries$ | async"
               [routerLink]="['/logEntries', logEntry.timeStamp.toString()]">
                <mat-icon mat-list-icon
                          *ngIf="logEntry.severity === severityEnum.Error">
                    error
                </mat-icon>
                <div mat-line>
                    {{ logEntry.title }}
                </div>
                <div mat-line>
                    {{ logEntry.timeStamp | date:'medium'}}
                </div>
            </a>
        </mat-nav-list>

        <ng-template #emptyState>
            <dgp-empty-state matIconName="error"
                             title="No entries available">

            </dgp-empty-state>
        </ng-template>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
        :host {
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            height: 100%;
        }
    `]
            }]
    }], null, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(LogEntryDetailsComponent, [{
        type: Component,
        args: [{
                selector: "dgp-log-entry-details",
                template: `
        <ng-container *ngIf="logEntry; else noLogEntryTemplate">

            <div class="header">
                <mat-icon class="header__icon"
                          *ngIf="logEntry.severity === severityEnum.Error">
                    error
                </mat-icon>
                <div class="header__title-container">
                    <h1 class="header__title mat-h1">
                        {{ logEntry.title }}
                    </h1>
                    <div class="header__subtitle">
                        {{ logEntry.timeStamp | date:'medium' }}

                    </div>
                </div>
            </div>

            <mat-divider class="vertical-separator"></mat-divider>

            <div class="content">
                <h2 class="content__heading mat-h2">
                    Severity
                </h2>
                <div class="content__body">
                    <ng-container *ngIf="logEntry.severity === severityEnum.Error">
                        Error
                    </ng-container>
                </div>
                <h2 class="content__heading mat-h2">
                    Content
                </h2>
                <div class="content__body"
                     *ngIf="logEntry.content; else noContentTemplate">
                    <ng-container *ngIf="!isApiError(); else apiError">
                        {{ logEntry.content | json }}
                    </ng-container>
                    <ng-template #apiError>
                        <div [innerHTML]="logEntry.content.error | safe:'html'"></div>
                    </ng-template>
                </div>
                <ng-template #noContentTemplate>
                    <div class="content__placeholder">
                        This log entry doesn't contain additional content.
                    </div>
                </ng-template>
            </div>

        </ng-container>

        <ng-template #noLogEntryTemplate>
            <dgp-empty-state title="No entry selected"
                             matIconName="error">
                Pick one from the list to the left.
            </dgp-empty-state>
        </ng-template>


    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            overflow: auto;
            word-break: break-word;
        }

        .header {
            display: flex;
            align-items: center;
        }

        .header__icon {
            font-size: 40px;
            width: 40px;
            height: 40px;
            margin-left: 16px;
            margin-right: 16px;
        }

        .header__title-container {
            flex-grow: 1;
        }

        .header__title {
            margin-top: 8px;
            margin-bottom: 8px;
        }

        .header__subtitle {
            display: flex;
        }

        .content {
        }

        .content__heading {
            margin-top: 8px;
            margin-bottom: 8px;
        }

        .content__body {

        }

        .content__placeholder {

        }

        .vertical-separator {
            margin-top: 16px;
            margin-bottom: 16px;
        }
    `]
            }]
    }], function () { return []; }, { logEntry: [{
            type: Input
        }] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(LogEffects, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc3.Actions }, { type: ɵngcc19.MatSnackBar }, { type: ɵngcc2.Router }]; }, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(DgpLogModule, { declarations: function () { return [LogEntryDetailsComponent,
        LogEntryListComponent,
        LogPageComponent]; }, imports: function () { return [CommonModule,
        FormsModule, ɵngcc1.StoreFeatureModule, ɵngcc3.EffectsFeatureModule, ɵngcc2.RouterModule, MatDividerModule,
        MatIconModule,
        MatListModule,
        MatSnackBarModule,
        DgpHamburgerMenuToggleModule,
        DgpPageHeaderModule,
        DgpListDetailsPageModule,
        DgpEmptyStateModule,
        SafePipeModule]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DgpLogModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    StoreModule.forFeature(logStoreFeature, LOG_STORE_REDUCER),
                    EffectsModule.forFeature([
                        LogEffects
                    ]),
                    RouterModule.forChild([{
                            path: "logEntries",
                            component: LogPageComponent
                        }, {
                            path: "logEntries/:logEntryId",
                            component: LogPageComponent
                        }]),
                    MatDividerModule,
                    MatIconModule,
                    MatListModule,
                    MatSnackBarModule,
                    DgpHamburgerMenuToggleModule,
                    DgpPageHeaderModule,
                    DgpListDetailsPageModule,
                    DgpEmptyStateModule,
                    SafePipeModule
                ],
                declarations: [
                    LogEntryDetailsComponent,
                    LogEntryListComponent,
                    LogPageComponent
                ],
                providers: [
                    logStoreReducerProvider
                ]
            }]
    }], null, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(RequestEffects, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc3.Actions }, { type: ɵngcc1.Store }]; }, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(DgpRequestStoreModule, { imports: [ɵngcc1.StoreFeatureModule, ɵngcc3.EffectsFeatureModule] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DgpRequestStoreModule, [{
        type: NgModule,
        args: [{
                imports: [
                    StoreModule.forFeature(requestStoreFeature, REQUEST_STORE_REDUCER),
                    EffectsModule.forFeature([
                        RequestEffects
                    ])
                ],
                providers: [
                    requestStoreReducerProvider
                ]
            }]
    }], null, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(RoutingOverlayComponent, [{
        type: Component,
        args: [{
                selector: "dgp-routing-overlay",
                template: "<mat-progress-bar mode='indeterminate' style='height: 16px;'></mat-progress-bar>",
                styles: [`
        :host {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-grow: 1;
            height: 100%;
        }
    `]
            }]
    }], null, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(RoutingOverlayEffects, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc3.Actions }, { type: ɵngcc2.Router }, { type: ɵngcc13.MatDialog }]; }, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(DgpRoutingOverlayModule, { declarations: function () { return [RoutingOverlayComponent]; }, imports: function () { return [MatDialogModule,
        MatProgressBarModule, ɵngcc3.EffectsFeatureModule, MatProgressBarModule]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DgpRoutingOverlayModule, [{
        type: NgModule,
        args: [{
                imports: [
                    MatDialogModule,
                    MatProgressBarModule,
                    EffectsModule.forFeature([
                        RoutingOverlayEffects
                    ]),
                    MatProgressBarModule
                ],
                declarations: [
                    RoutingOverlayComponent
                ],
                entryComponents: [
                    RoutingOverlayComponent
                ]
            }]
    }], null, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DgpTableCelLEditorDirective, [{
        type: Directive,
        args: [{ selector: "[dgpTableCellEditor]" }]
    }], null, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DgpTableCellComponent, [{
        type: Component,
        args: [{
                selector: "dgp-table-cell",
                template: `

        <button #triggerButton
                mat-button
                [disabled]="disabled"
                (click)="openCellEditorDialog()"
                class="mat-table-cell-editor-trigger-button">
            <ng-content></ng-content>
        </button>

    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [`

        dgp-table-cell {
            display: flex;
            flex-grow: 1;
        }

        .mat-table-cell-editor-trigger-button {
            flex-grow: 1;
            justify-content: flex-start;
            padding: initial;
            display: flex;
            font-weight: initial;
        }

        .mat-table-cell-editor-trigger-button .mat-button-wrapper {
            flex-grow: 1;
            justify-content: flex-start;
            display: flex;
        }

        .mat-dialog-no-backdrop {
            background: initial;
        }


    `]
            }]
    }], function () { return [{ type: ɵngcc13.MatDialog }]; }, { editDialogConfig: [{
            type: Input
        }], editorOpened: [{
            type: Output
        }], editorClosed: [{
            type: Output
        }], disabled: [{
            type: Input
        }], scrollParentSelector: [{
            type: Input
        }], editorTemplate: [{
            type: ContentChild,
            args: [DgpTableCelLEditorDirective, {
                    read: TemplateRef
                }]
        }], buttonElRef: [{
            type: ViewChild,
            args: ["triggerButton", {
                    read: ElementRef
                }]
        }] }); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(DgpTableCellModule, { declarations: function () { return [DgpTableCellComponent,
        DgpTableCelLEditorDirective]; }, imports: function () { return [CommonModule,
        MatButtonModule,
        MatDialogModule]; }, exports: function () { return [DgpTableCellComponent,
        DgpTableCelLEditorDirective]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DgpTableCellModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    MatButtonModule,
                    MatDialogModule
                ],
                declarations: [
                    DgpTableCellComponent,
                    DgpTableCelLEditorDirective
                ],
                exports: [
                    DgpTableCellComponent,
                    DgpTableCelLEditorDirective
                ]
            }]
    }], null, null); })();
const ɵDarkModeToggleComponent_BaseFactory = ɵngcc0.ɵɵgetInheritedFactory(DarkModeToggleComponent);
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DarkModeToggleComponent, [{
        type: Component,
        args: [{
                selector: "dgp-dark-mode-toggle",
                template: `
        <mat-slide-toggle [ngModel]="useDarkMode$ | async"
                          (ngModelChange)="toggleDarkMode()">
            Use dark mode
        </mat-slide-toggle>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
        :host {
            margin-left: 16px;
            margin-right: 16px;
        }
    `]
            }]
    }], null, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ThemeHostDirective, [{
        type: Directive,
        args: [{
                selector: "[dgpThemeHost]"
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.Renderer2 }, { type: ɵngcc1.Store }, { type: undefined, decorators: [{
                type: Inject,
                args: [THEME_SWITCHER_CONFIG]
            }] }, { type: ɵngcc22.OverlayContainer }]; }, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ThemeSwitcherEffects, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc3.Actions }, { type: ɵngcc1.Store }]; }, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(DgpThemeSwitcherModule, { declarations: function () { return [DarkModeToggleComponent,
        ThemeHostDirective]; }, imports: function () { return [CommonModule,
        FormsModule,
        OverlayModule,
        MatSlideToggleModule, ɵngcc1.StoreFeatureModule, ɵngcc3.EffectsFeatureModule]; }, exports: function () { return [DarkModeToggleComponent,
        ThemeHostDirective]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DgpThemeSwitcherModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    OverlayModule,
                    MatSlideToggleModule,
                    StoreModule.forFeature(themeSwitcherStoreFeature, THEME_SWITCHER_REDUCER),
                    EffectsModule.forFeature([
                        ThemeSwitcherEffects
                    ])
                ],
                declarations: [
                    DarkModeToggleComponent,
                    ThemeHostDirective
                ],
                exports: [
                    DarkModeToggleComponent,
                    ThemeHostDirective
                ],
                providers: [
                    themeSwitcherReducerProvider
                ]
            }]
    }], function () { return [{ type: ɵngcc1.Store }]; }, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(TileComponent, [{
        type: Component,
        args: [{
                selector: "dgp-tile",
                template: `
        <a [routerLink]="route"
           class="container">
            <mat-card matRipple
                      class="card">
                <mat-card-content class="description">
                    <mat-icon class="icon dgp-bg--primary">{{ matIconName }}</mat-icon>
                    <div class="label">
                        {{ label }}
                    </div>
                    <mat-divider class="divider"></mat-divider>
                    <div>
                        {{ description }}
                    </div>
                </mat-card-content>
            </mat-card>

        </a>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
        .container {
            display: flex;
            flex-direction: column;
            max-height: 224px;
            min-height: 224px;
            height: 100%;
            max-width: 224px;
            min-width: 224px;
            width: 100%;
            text-decoration: inherit;
            margin: 8px;
        }

        .card {
            flex-grow: 1;
        }

        .description {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
        }

        .icon {
            font-size: 40px;
            height: 64px;
            width: 64px;
            color: white !important;
            border-radius: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 16px;
        }

        .label {
            font-size: larger;
        }

        .divider {
            position: relative !important;
            margin-top: 16px;
            margin-bottom: 16px;
        }
    `]
            }]
    }], null, { route: [{
            type: Input
        }], matIconName: [{
            type: Input
        }], label: [{
            type: Input
        }], description: [{
            type: Input
        }] }); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(DgpTileModule, { declarations: function () { return [TileComponent]; }, imports: function () { return [RouterModule,
        MatCardModule,
        MatRippleModule,
        MatIconModule,
        MatDividerModule]; }, exports: function () { return [TileComponent]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DgpTileModule, [{
        type: NgModule,
        args: [{
                imports: [
                    RouterModule,
                    MatCardModule,
                    MatRippleModule,
                    MatIconModule,
                    MatDividerModule
                ],
                declarations: [
                    TileComponent
                ],
                exports: [
                    TileComponent
                ]
            }]
    }], null, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DgpModelEditorComponentBase, [{
        type: Directive
    }], function () { return []; }, { modelChange: [{
            type: Output
        }], model: [{
            type: Input
        }] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(HybridComponentBase, [{
        type: Directive
    }], function () { return [{ type: ɵngcc1.Store }]; }, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(VirtualListItemDirective, [{
        type: Directive,
        args: [{
                selector: "[dgpVirtualListItem]"
            }]
    }], null, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(VirtualListPanelComponent, [{
        type: Component,
        args: [{
                selector: "dgp-virtual-list-panel",
                template: `
        <cdk-virtual-scroll-viewport [itemSize]="itemSize"
                                     style="height: 100%; width:100%;">
            <ng-container *cdkVirtualFor="let item of items">
                <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
            </ng-container>
        </cdk-virtual-scroll-viewport>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.Renderer2 }]; }, { itemSize: [{
            type: Input
        }], items: [{
            type: Input
        }], itemTemplate: [{
            type: ContentChild,
            args: [VirtualListItemDirective, { read: TemplateRef }]
        }] }); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(DgpVirtualListPanelModule, { declarations: function () { return [VirtualListPanelComponent,
        VirtualListItemDirective]; }, imports: function () { return [CommonModule,
        ScrollingModule]; }, exports: function () { return [VirtualListPanelComponent,
        VirtualListItemDirective]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DgpVirtualListPanelModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    ScrollingModule
                ],
                declarations: [
                    VirtualListPanelComponent,
                    VirtualListItemDirective
                ],
                exports: [
                    VirtualListPanelComponent,
                    VirtualListItemDirective
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(DgpNgAppModule, { imports: function () { return [BrowserModule,
        BrowserAnimationsModule, ɵngcc1.StoreRootModule, ɵngcc3.EffectsRootModule, DgpHamburgerShellModule,
        DgpThemeSwitcherModule,
        DgpHamburgerMenuModule,
        DgpLogModule,
        DgpRequestStoreModule,
        DgpRoutingOverlayModule]; }, exports: function () { return [DgpHamburgerShellModule,
        DgpThemeSwitcherModule,
        DgpHamburgerMenuModule]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DgpNgAppModule, [{
        type: NgModule,
        args: [{
                imports: [
                    BrowserModule,
                    BrowserAnimationsModule,
                    StoreModule.forRoot(APP_REDUCER, {
                        metaReducers: [hmrReducer]
                    }),
                    EffectsModule.forRoot([]),
                    DgpHamburgerShellModule.forRoot(),
                    DgpThemeSwitcherModule.forRoot(),
                    DgpHamburgerMenuModule,
                    DgpLogModule,
                    DgpRequestStoreModule,
                    DgpRoutingOverlayModule
                ],
                exports: [
                    DgpHamburgerShellModule,
                    DgpThemeSwitcherModule,
                    DgpHamburgerMenuModule
                ]
            }]
    }], null, null); })();

/*
 * Public API Surface of dgp-ng-app
 */

/**
 * Generated bundle index. Do not edit.
 */

export { APP_REDUCER, AuthenticationApiClient, AuthenticationGuard, AuthenticationService, AuthenticationServiceImpl, BROADCAST_CONFIG, BroadcastRole, DarkModeToggleComponent, DgpAuthenticationModule, DgpBroadcastStoreModule, DgpContainer, DgpEmptyStateModule, DgpFileUploadModule, DgpFileViewerModule, DgpHamburgerMenuModule, DgpHamburgerMenuToggleModule, DgpHamburgerShellModule, DgpListDetailsPageModule, DgpLogModule, DgpModelEditorComponentBase, DgpNgApp, DgpNgAppModule, DgpPageHeaderModule, DgpRequestStoreModule, DgpRoutingOverlayModule, DgpSelectEntityViaRouteResolver, DgpSpacerModule, DgpTableCelLEditorDirective, DgpTableCellComponent, DgpTableCellModule, DgpThemeSwitcherModule, DgpTileModule, DgpVirtualListPanelModule, DragFileListenerDirective, DynamicFileViewerComponent, EmptyStateComponent, FILE_UPLOAD_CONFIG, FILE_VIEWER_CONFIG, FallbackFileViewerComponent, FileItemListComponent, FileViewerComponent, FileViewerComponentBase, HAMBURGER_SHELL_CONFIG, HamburgerMenuComponent, HamburgerMenuEntriesComponent, HamburgerMenuEntryComponent, HamburgerMenuHeaderComponent, HamburgerMenuToggleComponent, HamburgerShellComponent, HamburgerShellMode, HybridComponentBase, InitializationService, JpgViewerComponent, ListDetailsPageComponent, ListDetailsPageContentComponent, ListDetailsPageMode, LogErrorAction, NoPeonGuard, OpenFileManagerViaShortKeyDirective, PageHeaderComponent, PdfViewerComponent, PngViewerComponent, SafePipe, SafePipeModule, ScheduleRequestAction, SetBroadcastChannelDataIdAction, SetOwnBroadcastRoleAction, Severity, SpacerComponent, SvgViewerComponent, ThemeHostDirective, TileComponent, VirtualListItemDirective, VirtualListPanelComponent, actionBroadcastChannelId, addFiles, addFilesViaDrop, addLogEntry, authenticateUser, authenticationServiceProvider, authenticationStoreFeature, broadcastStoreFeature, broadcastStoreFeatureSelector, closeFileManager, closeHamburgerMenu, closeListDetailsMenu, createGuid, defaultBroadcastConfig, defaultBroadcastRoleDisplayConfig, defaultFileTypeViewerMap, defaultFileUploadConfig, defaultFileViewerConfig, defaultHamburgerShellConfig, defaultHamburgerShellConfigProvider, fileUploadEntityStore, fileUploadStoreFeature, getAuthenticatedUserSelector, getFileFromFileItem$, getFileItemSizeLabel, getFileItemsFromFileList, getIsAuthenticatedSelector, getMimeTypeFromExtension, getOwnBroadcastRoleSelector, hamburgerMenuModeSelector, hamburgerShellFeatureSelector, hamburgerShellStoreFeature, hasPendingRequests, hasPendingRequestsSelector, heartbeatBroadcastChannelId, hideDropTarget, hmrReducer, hotReload, isDarkModeActive, isDarkModeActiveSelector, isHamburgerMenuOpenSelector, isNullOrUndefined, isPageMenuOpenSelector, logError, logErrorActionType, logStoreFeature, notNullOrUndefined, nullOrUndefined, openFileManager, openFileManagerOverlay, openFileManagerShortKeyFilter, overlayHamburgerShellConfig, overlayHamburgerShellConfigProvider, pageMenuModeSelector, parseFileNameWithExtension, removeFile, requestStateSelector, requestStoreFeature, responsiveHamburgerShellConfig, scheduleRequest, scheduleRequestActionType, setBroadcastChannelDataId, setConfig, setHamburgerMenuState, setIsDarkModeActive, setListDetailsPageState, showDropTarget, showLoadingSpinner, sideNavHamburgerShellConfig, sideNavHamburgerShellConfigProvider, themeSwitcherFeatureSelector, themeSwitcherStoreFeature, toggleDarkMode, toggleHamburgerMenu, toggleListDetailsPageMenu, cacheInitialUrl as ɵa, registerAuthenticateError as ɵb, requestStoreReducerFactory as ɵba, requestStoreReducerProvider as ɵbb, defaultThemeSwitcherConfig as ɵbc, THEME_SWITCHER_CONFIG as ɵbd, THEME_SWITCHER_REDUCER as ɵbe, themeSwitcherReducerFactory as ɵbf, themeSwitcherReducerProvider as ɵbg, appInitializer as ɵbh, appInitializerProvider as ɵbi, initialAuthenticationState as ɵbj, authenticationReducer as ɵbk, BroadcastEffects as ɵbl, BroadcastChannelService as ɵbm, BroadcastChannelServiceImpl as ɵbn, broadcastChannelServiceProvider as ɵbo, BroadcastStoreDecorator as ɵbp, broadcastStoreProvider as ɵbq, EmptyStateContentComponent as ɵbr, EmptyStateIconComponent as ɵbs, EmptyStateTitleComponent as ɵbt, FileUploadEffects as ɵbu, FileManagerComponent as ɵbv, HamburgerShellEffects as ɵbw, initialHamburgerShellState as ɵbx, hamburgerShellReducer as ɵby, LogEffects as ɵbz, authenticationFeatureSelector as ɵc, LogPageComponent as ɵca, LogEntryDetailsComponent as ɵcb, LogEntryListComponent as ɵcc, logStore as ɵcd, RequestEffects as ɵce, requestReducer as ɵcf, requestStoreReducer as ɵcg, RoutingOverlayEffects as ɵch, RoutingOverlayComponent as ɵci, ThemeSwitcherEffects as ɵcj, initialThemeSwitcherState as ɵck, themeSwitcherReducer as ɵcl, AUTHENTICATION_REDUCER as ɵd, authenticationReducerFactory as ɵe, authenticationReducerProvider as ɵf, setOwnBroadcastRole as ɵg, broadcastReducer as ɵh, BROADCAST_REDUCER as ɵi, broadcastReducerFactory as ɵj, broadcastReducerProvider as ɵk, fileUploadReducer as ɵl, FILE_UPLOAD_REDUCER as ɵm, fileUploadReducerFactory as ɵn, fileUploadReducerProvider as ɵo, HAMBURGER_SHELL_REDUCER as ɵp, hamburgerShellReducerFactory as ɵq, hamburgerShellReducerProvider as ɵr, LOG_STORE_REDUCER as ɵs, createLogStoreReducer as ɵt, logStoreReducerProvider as ɵu, registerRequest as ɵw, unregisterRequest as ɵx, resetRequests as ɵy, REQUEST_STORE_REDUCER as ɵz };

//# sourceMappingURL=dgp-ng-app.js.map