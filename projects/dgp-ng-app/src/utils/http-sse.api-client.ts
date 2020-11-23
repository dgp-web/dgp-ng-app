import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class HttpSSEApiClient {

    getStream$<T>(url: string, processor: (data: string) => T, eventSourceInitDict?: EventSourceInit): Observable<T> {
        return new Observable<T>(observer => {
            const source = new EventSource(url, eventSourceInitDict);

            source.onmessage = x => {
                const result = processor(x.data);
                observer.next(result);
            };

            source.onerror = x => observer.error(x);

            return () => source.close();
        });
    }

}
