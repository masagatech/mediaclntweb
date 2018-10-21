import { Injectable } from '@angular/core';
import { DataService } from '../dataconnect';

@Injectable()
export class UserService {
    constructor(private _dataserver: DataService) { }

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

    // Get Entity By User ID

    getUserEntity(req: any) {
        return this._dataserver.get('getUserEntity', req);
    }

    // Get DropDown Data

    getUserDropDown(req: any) {
        return this._dataserver.get('getUserDropDown', req);
    }
}