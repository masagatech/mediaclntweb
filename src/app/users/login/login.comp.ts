import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/auth-service';
import { LoginService } from '../../services/login/login-service';
import { CommonService } from '../../services/common/common-service';
import { UserReq, LoginUserModel } from '../../model/user_model';

@Component({
    selector: 'app-login',
    templateUrl: './login.comp.html',
    styleUrls: ['./login.comp.scss'],
    providers: [AuthenticationService, CommonService]
})

export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
    public errorMsg = '';
    public btnLoginText = 'Login';

    _user = new UserReq('', '');

    constructor(private _router: Router, private _service: AuthenticationService, private _loginservice: LoginService,
        private _autoservice: CommonService) {

    }

    ngOnInit() {

    }

    ngAfterViewInit(): void {
        // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        // Add 'implements AfterViewInit' to the class.
        $('#login-username').focus();
    }

    login(e) {
        const that = this;
        that.btnLoginText = 'Loging..';

        that._service.login(that._user).subscribe(d => {
            try {
                if (d) {
                    if (d.status) {
                        const usrobj = d.data;
                        const userDetails: LoginUserModel = usrobj[0];

                        that._loginservice.setUsers(userDetails);
                        that._router.navigate(['/']);
                    } else {
                        that._autoservice.showmsgbox('Error', d.err, 'error');
                    }
                }
            } catch (e) {
                that._autoservice.showmsgbox('Error', e, 'error');
            }
        }, err => {
            that._autoservice.showmsgbox('Error', err, 'error');
        });

        e.preventDefault();
    }

    ngOnDestroy() {

    }
}
