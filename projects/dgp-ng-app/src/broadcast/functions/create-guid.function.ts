// const crypto = window.crypto || (window as any).msCrypto; // for IE 11

/*return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
       // tslint:disable-next-line:no-bitwise
       (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
   );*/

export function createGuid() {
    // @ts-ignore
    // tslint:disable-next-line:only-arrow-functions
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        // tslint:disable-next-line:one-variable-per-declaration no-bitwise triple-equals
        const r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
