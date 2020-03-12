import { SchedulerLike, Subscription } from "rxjs";
import { Injectable, NgZone } from "@angular/core";
import { async } from "rxjs/internal/scheduler/async";

@Injectable()
export class OutsideNgZoneScheduler implements SchedulerLike {
    constructor(private readonly zone: NgZone) {
    }

    schedule(...args: any[]): Subscription {
        return this.zone.runOutsideAngular(() =>
            async.schedule.apply(async, args)
        );
    }

    now(): number {
        return Date.now();
    }
}

@Injectable()
export class InsideNgZoneScheduler implements SchedulerLike {
    constructor(private readonly zone: NgZone) {
    }

    schedule(...args: any[]): Subscription {
        return this.zone.run(() =>
            async.schedule.apply(async, args)
        );
    }

    now(): number {
        return Date.now();
    }
}
