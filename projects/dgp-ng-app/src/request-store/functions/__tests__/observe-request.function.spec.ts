import { observeRequest } from "../observe-request.function";
import { Observer, Observable, of, throwError } from "rxjs";

describe("observeRequest", () => {

  let request$: Promise<any> | Observable<any>;
  let observer: Observer<any>;

  beforeEach(() => {
    observer = {
      next: () => {},
      error: () => {},
      complete: () => {}
    };
  });

  it(`should observe when a promise-based request returns.`, async () => {

    request$ = Promise.resolve();

    spyOn(observer, "next");

    const observedRequest$ = observeRequest({
      request$,
      observer
    });

    await observedRequest$;

    expect(observer.next).toHaveBeenCalled();

   });

  it(`should observe when a promise-based request fails.`, async () => {

    request$ = Promise.reject();

    spyOn(observer, "error");

    const observedRequest$ = observeRequest({
      request$,
      observer
    });

    try {
      await observedRequest$;
    } catch (e) {}

    expect(observer.error).toHaveBeenCalled();
   });

  it(`should observe when an observable-based request returns or completes.`, async () => {

    request$ = of();

    spyOn(observer, "complete");

    const observedRequest$ = observeRequest({
      request$,
      observer
    });

    await observedRequest$;

    expect(observer.complete).toHaveBeenCalled();

   });

  it(`should observe when a observable-based request fails.`, async () => {

    request$ = throwError("");

    spyOn(observer, "error");

    const observedRequest$ = observeRequest({
      request$,
      observer
    });

    try {
      await observedRequest$;
    } catch (e) {}

    expect(observer.error).toHaveBeenCalled();
   });

});
