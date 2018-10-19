import { Injectable } from '@angular/core';
import { DataService } from '../dataconnect';
import { LoginUserModel } from '../../model/user_model';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({ providedIn: 'root' })

export class LoginService {
    private loginUser: LoginUserModel;

    constructor(private _dataserver: DataService, private _router: Router) { }

    getUser() {
        if (this.loginUser === undefined) {
            const usr = JSON.parse(Cookie.get('_session_'));
            console.log("1");

            if (usr) {
                // this._router.navigate(['login']);
                return usr;
            } else {
                // this._router.navigate(['login']);
                return null;
            }
        } else {
            console.log("2");
            return this.loginUser;
        }
    }

    savePassword(req: any) {
        return this._dataserver.post('savePassword', req);
    }

    setUsers(userDetails): LoginUserModel {
        this.loginUser = userDetails;

        if (userDetails == null) {
            Cookie.delete('_session_');
            sessionStorage.clear();
        } else {
            Cookie.delete('_session_');
            Cookie.set('_session_', JSON.stringify(this.loginUser));

            console.log("Login : " + JSON.stringify(this.loginUser));

            // Cookie.set('_session_', this.loginUser.sessiondetails.sessionid.toString());
        }

        return this.loginUser;
    }

    getUserDetails(req: any) {
        return this._dataserver.post('getUserDetails', req)
    }

    saveUser(req: any) {
        return this._dataserver.post('saveUserInfo', req)
    }
}