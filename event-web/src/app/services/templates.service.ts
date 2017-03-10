import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";

@Injectable()
export class TemplatesService {

    constructor(private api: ApiService) {
    }
}
