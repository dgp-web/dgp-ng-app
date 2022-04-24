export function isJQueryLoaded() {
    return !(!$ || typeof $.noConflict !== "function");
}
