import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/users/user-service';
import { LoginService } from '../../../../services/login/login-service';
import { LoginUserModel } from '../../../../model/user_model';
import { Globals } from '../../../../const/globals';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-user-view',
    templateUrl: './viewuser.comp.html'
})

export class ViewUserComponent implements OnInit {
    loginUser: LoginUserModel;
    _wsdetails: any = [];

    userDT: any = [];

    constructor(private _router: Router, private _userservice: UserService, private _loginservice: LoginService, private toastr: ToastrService) {
        this.loginUser = this._loginservice.getUser();
        this._wsdetails = Globals.getWSDetails();
    }

    ngOnInit() {
        this.getUserDetails();
    }

    // Get User Data

    getUserDetails() {
        var that = this;

        that._userservice.getUserDetails({
            "flag": "bywsid", "wsid": that._wsdetails._id
        }).subscribe((d) => {
            that.userDT = d.data;
        }, (err) => {
            that.toastr.success('error', err);
        }, () => {

        });
    }

    // Add User

    addUser() {
        this._router.navigate(['/workspace/user/add']);
    }

    // Edit User

    editUser(row) {
        this._router.navigate(['/workspace/user/edit', row._id]);
    }
}
