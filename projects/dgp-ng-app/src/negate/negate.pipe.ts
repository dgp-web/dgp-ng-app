import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "negate",
    standalone: false
})
export class DgpNegatePipe implements PipeTransform {

    transform(value: boolean | any, ...args: any[]): boolean {
        return !value;
    }

}
