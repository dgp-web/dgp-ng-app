import { TestBed } from "@angular/core/testing";

describe(${Service}.name, () => {
    
    let service: ${Service};
    
    beforeEach(() => {
        
        TestBed.configureTestingModule({
            providers: [
                ${Service}Provider
            ]
        });
        
        service = TestBed.get(${Service});
        
    });

    it("should create.", () => {
        expect(service).toBeDefined();
    });


});
