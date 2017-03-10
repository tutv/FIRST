import {Injectable} from "@angular/core";
import {ToasterConfig} from "angular2-toaster";

@Injectable()
export class NotifyService {

    constructor() {
    }

    public toasterConfig: ToasterConfig =
        new ToasterConfig({
            limit: 3,
            timeout: 1500,
            mouseoverTimerStop: true
        });
}