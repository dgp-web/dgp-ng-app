import { ClassProvider, Injectable } from "@angular/core";

export abstract class ${Name} {
    
    
    
}

@Injectable()
export class ${Name}Impl implements ${Name} {

}

export const ${Name}Provider: ClassProvider = {
    provide: ${Name},
    useClass: ${Name}Impl
};
