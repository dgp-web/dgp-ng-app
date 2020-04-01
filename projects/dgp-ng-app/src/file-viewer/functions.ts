export function getFileItemSizeLabel(size: number): string {

    if (size < 1000) {
        return (size / (1000)).toFixed(2) + " Kb";
    } else {
        return (size / (1000 * 1000)).toFixed(2) + " Mb";
    }

}
