import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/users/user-service';
import { LoginService } from '../../../../services/login/login-service';
import { LoginUserModel } from '../../../../model/user_model';
import { CommonService } from '../../../../services/common/common-service';
import { Globals } from '../../../../const/globals';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-user-add',
    templateUrl: 'adduser.comp.html'
})

export class AddUserComponent implements OnInit, OnDestroy {
    loginUser: LoginUserModel;
    _wsdetails: any = [];

    paramsid: number = 0;

    genderDT: any = [];
    utypeDT: any = [];

    formd = {
        _id: 0,
        code: '',
        pwd: '',
        full_name: '',
        gender: '',
        utype: '',
        about_us: '',
        mobile: '',
        email: '',
        address: '',
        wsid: 0,
        createdby: '',
        isedit: false
    };

    private subscribeParameters: any;

    constructor(private _router: Router, private _routeParams: ActivatedRoute, private _userservice: UserService,
        private _autoservice: CommonService, private _loginservice: LoginService, private toastr: ToastrService) {
        this.loginUser = this._loginservice.getUser();
        this._wsdetails = Globals.getWSDetails();

        this.fillDropDownList();
    }

    public ngOnInit() {
        this.showPassword('password');
        this.getUserDetails();
    }

    fillDropDownList() {
        var that = this;

        that._userservice.getUserDropDown({}).subscribe(data => {
            that.genderDT = data.data.filter(a => a.group == "gender");
            that.utypeDT = data.data.filter(a => a.group == "usertype");
        }, err => {
            that.toastr.error('error', err);
        }, () => {

        })
    }

    showPassword(type) {
        if (type === 'text') {
            $('#lblshowpwd').removeClass('hide');
            $('#lblshowpwd').addClass('show');

            $('#lblhidepwd').removeClass('show');
            $('#lblhidepwd').addClass('hide');
        } else {
            $('#lblshowpwd').removeClass('show');
            $('#lblshowpwd').addClass('hide');

            $('#lblhidepwd').removeClass('hide');
            $('#lblhidepwd').addClass('show');
        }

        $('.pwd').attr('type', type);
    }

    // Save Data

    saveUser() {
        const that = this;

        that.formd.createdby = that.loginUser._id;
        that.formd.wsid = that._wsdetails._id;

        that._userservice.saveUserInfo(that.formd).subscribe(d => {
            try {
                if (d.errcode === '-1') {
                    that.toastr.error('error', d.err);
                } else {
                    that.toastr.success('success', d.err);

                    if (d.errcode == 1) {
                        that.resetUserFields();
                    }
                    else {
                        that.backViewData();
                    }
                }
            } catch (e) {
                that.toastr.error('error', e);
            }
        }, err => {
            that.toastr.error('error', err);
        }, () => {
            // console.log('Complete');
        });
    }

    // Reset Fields

    resetUserFields() {
        const that = this;

        that.formd.code = '';
        that.formd.pwd = '';
        that.formd.full_name = '';
        that.formd.gender = '';
        that.formd.utype = '';
        that.formd.about_us = '';
        that.formd.mobile = '';
        that.formd.email = '';
        that.formd.address = '';
    }

    // Get Fields

    getUserDetails() {
        var that = this;

        that.subscribeParameters = that._routeParams.params.subscribe(params => {
            if (params['id'] !== undefined) {
                that.paramsid = params['id'];
                that.formd.isedit = true;

                that._userservice.getUserByID({ "id": that.paramsid }).subscribe((d) => {
                    that.formd._id = d.data._id;
                    that.formd.code = d.data.code;
                    that.formd.pwd = d.data.pwd;
                    that.formd.full_name = d.data.full_name;
                    that.formd.gender = d.data.gender;
                    that.formd.utype = d.data.utype;
                    that.formd.about_us = d.data.about_us;

                    that.formd.mobile = d.data.mobile;
                    that.formd.email = d.data.email;
                    that.formd.address = d.data.address;
                }, (err) => {
                    that.toastr.success('success', err);
                }, () => {

                });
            }
            else {
                that.resetUserFields();
            }
        });
    }

    // Back For View Data

    backViewData() {
        this._router.navigate(['/workspace/user']);
    }

    ngOnDestroy() {
        this.subscribeParameters.unsubscribe();
    }
}