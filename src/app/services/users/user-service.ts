import { Injectable } from '@angular/core';
import { DataService } from '../dataconnect';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
    constructor(private _dataserver: DataService, private _router: Router) { }

    // Insert / Update

    registeredUser(req: any) {
        return this._dataserver.post('registeredUser', req)
    }

    saveUserInfo(req: any) {
        return this._dataserver.post("saveUserInfo", req)
    }

    // Get All Data

    getUserDetails(req: any) {
        return this._dataserver.get("getUserDetails", req)
    }

    // Get Data By ID

    getUserByID(req: any) {
        return this._dataserver.get('getUserByID', req);
    }

    // Get DropDown Data

    getUserDropDown(req: any) {
        return this._dataserver.get('getUserDropDown', req);
    }
}