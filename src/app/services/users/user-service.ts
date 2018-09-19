import { Injectable } from '@angular/core';
import { DataService } from '../dataconnect';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
    constructor(private _dataserver: DataService, private _router: Router) { }

    getUserDetails(req: any) {
        return this._dataserver.post("getUserDetails", req)
    }

    saveUserInfo(req: any) {
        return this._dataserver.post("saveUserInfo", req)
    }
}