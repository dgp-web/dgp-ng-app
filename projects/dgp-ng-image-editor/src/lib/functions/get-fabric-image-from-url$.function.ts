import { fabric } from "fabric";

export function getFabricImageFromUrl$(imageUrl: string): Promise<fabric.Image> {
    return new Promise<fabric.Image>(resolve => {
        fabric.Image.fromURL(imageUrl, image => resolve(image));
    });
}
