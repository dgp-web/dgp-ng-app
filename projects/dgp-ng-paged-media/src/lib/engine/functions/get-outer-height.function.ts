export function getOuterHeight(payload: HTMLElement) {
    const styles = window.getComputedStyle(payload);
    const marginTop = parseFloat(styles.marginTop);
    const marginBottom = parseFloat(styles.marginBottom);
    return payload.getBoundingClientRect().height + marginBottom + marginTop;
}
