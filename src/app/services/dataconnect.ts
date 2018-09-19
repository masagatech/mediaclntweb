import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Globals } from '../const/globals';
import { map, catchError } from 'rxjs/operators'
import { Observable } from 'rxjs';

declare var $: any;

@Injectable({ providedIn: 'root' })

export class DataService {
    global = new Globals();

    constructor(private _http: Http) { }

    post(api: string, params: any) {
        let body = JSON.stringify(params);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.global.serviceurl + api, body, options)
            .pipe(map(res => res.json()), catchError(this.handleError));
    }

    get(api: string, params: any) {
        return this._http.get(this.global.serviceurl + api + "?" + $.param(params))
            .pipe(map(res => res.json()), catchError(this.handleError));
    }

    public rawget(api: string, params: any) {
        params.t = (new Date).getTime();

        return this._http.get(api + "?" + $.param(params))
            .pipe(map(res => res.json()), catchError(this.handleError));
    }

    public rawpost(api: string, params: any) {
        let body = JSON.stringify(params);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(api, body, options)
            .pipe(map(res => res.json()), catchError(this.handleError));
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || ' error');
    }

}