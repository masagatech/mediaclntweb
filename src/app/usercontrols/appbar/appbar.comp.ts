import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/auth-service';
import { LoginService } from '../../services/login/login-service';
import { LoginUserModel } from '../../model/user_model';
import { Globals } from '../../const/globals';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
    selector: 'app-uc-appbar',
    templateUrl: './appbar.comp.html',
    styleUrls: ['./appbar.comp.css'],
    providers: [AuthenticationService]
})

export class AppBarComponent implements OnInit {
    loginUser: LoginUserModel;
    _wsdetails: any = [];
    _enttdetails: any = [];

    ws_name: string = "";
    entt_name: string = "";
    user_name: string = "";

    constructor(private _router: Router, private _authservice: AuthenticationService, private _loginservice: LoginService) {
        this.loginUser = this._loginservice.getUser();
        this._wsdetails = Globals.getWSDetails();
        this._enttdetails = Globals.getEntityDetails();
    }

    ngOnInit() {
        this.getHeaderDetails();
    }

    getHeaderDetails() {
        console.log(Cookie.get("_session_"));

        if (Cookie.get("_session_") !== null && Cookie.get("_session_") !== undefined) {
            this.user_name = this.loginUser.full_name;

            if (sessionStorage.getItem("_wsdetails_") !== null && sessionStorage.getItem("_wsdetails_") !== undefined) {
                if (sessionStorage.getItem("_enttdetails_") !== null && sessionStorage.getItem("_enttdetails_") !== undefined) {
                    this.ws_name = this._enttdetails.entt_name;
                    this.entt_name = this._wsdetails.ws_name;
                }
                else {
                    this.entt_name = this._enttdetails.entt_name;
                    this.ws_name = this._wsdetails.ws_name;
                }
            }
        }
        else {
            this._router.navigate(['/login']);
        }
    }

    openMainForm() {
        this._router.navigate(['/admin/workspace']);
    }

    logout() {
        // this._authservice.logout();

        Cookie.delete('_schsession_');
        sessionStorage.clear();
        this._router.navigate(['/login']);
    }
}
