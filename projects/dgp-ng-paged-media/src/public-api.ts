/*
 * Public API Surface of dgp-ng-paged-media
 */

export * from "./lib/engine/constants";
export * from "./lib/engine/functions";
export * from "./lib/engine/models";

export { DgpPagedMediaA4Module } from "./lib/A4/paged-media-a4.module";
export { DgpPagedMediaContentViewComponent } from "./lib/A4/components/paged-media-content-view.component";
export { DgpPagedMediaContentComponent } from "./lib/A4/components/paged-media-content.component";
export { DgpPagedMediaFooterComponent } from "./lib/A4/components/paged-media-footer.component";
export { DgpPagedMediaHeaderComponent } from "./lib/A4/components/paged-media-header.component";
export { DgpPagedMediaPageA4Component } from "./lib/A4/components/paged-media-page-a4.component";
export { DgpPagedMediaSectionA4Component } from "./lib/A4/components/paged-media-section-a4.component";

export { OffscreenRenderer } from "./lib/engine/services/offscreen-renderer.service";


