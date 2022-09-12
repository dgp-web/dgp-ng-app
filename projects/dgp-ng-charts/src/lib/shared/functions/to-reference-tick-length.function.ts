export function toReferenceTickLength() {

    return (tickLabel: string) => {
        let result = tickLabel;

        while (result.includes(".") || result.includes(",")) {
            result = result.replace(".", "").replace(",", "");
        }

        return result.length;
    };
}
