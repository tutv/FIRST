import {Injectable} from "@angular/core";
import {Subject, Observable, Subscription} from "rxjs";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";

@Injectable()
export class EventService {
    private subject = new Subject<any>();
    private subject$ = this.subject.asObservable();

    private subscriptions: any = {};

    constructor() {
    }

    emit(key: string, extra?: any) {
        this.subject.next({
            key,
            extra
        });
    }

    on(key: string): Observable<any> {
        return this.subject$
            .filter(
                (args) => {
                    return (args.key == key);
                }
            )
            .map(
                (args) => {
                    return args.extra || null;
                }
            );
    }

    register(key: string, subscription: Subscription) {
        this.subscriptions[key] = subscription;
    }

    deregister(key: string) {
        if (this.subscriptions[key]) {
            let subscription: Subscription = this.subscriptions[key];
            subscription.unsubscribe();
        }
    }
}
