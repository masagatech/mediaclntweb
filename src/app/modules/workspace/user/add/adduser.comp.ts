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

    entityDT: any = [];
    entityList: any = [];
    selectedEntity: any = [];
    entt_id: number = 0;
    entt_name: string = "";

    formd = {
        _id: 0,
        ucode: '',
        pwd: '',
        full_name: '',
        gender: '',
        utype: '',
        about_us: '',
        mobile: '',
        email: '',
        address: '',
        isallentt: false,
        enttids: {},
        wsid: 0,
        createdby: '',
        updatedby: '',
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

    // Is Rights Entity

    isAllEntityRights() {
        if (this.formd.isallentt) {
            this.entityList = [];
        }
    }

    // Auto Completed Entity

    getEntityData(event) {
        let query = event.query;

        this._autoservice.getAutoData({
            "flag": "entity",
            "wsid": this._wsdetails._id,
            "search": query
        }).subscribe((data) => {
            this.entityDT = data.data;
        }, err => {
            this.toastr.error('error', err);
        }, () => {

        });
    }

    // Selected Entity

    selectEntityData(event, type) {
        this.entt_id = event.value;

        this.addEntityList();
        $(".enttname input").focus();
    }

    // Check Duplicate Entity

    isDuplicateEntity() {
        var that = this;

        for (var i = 0; i < that.entityList.length; i++) {
            var field = that.entityList[i];

            if (field._id == that.entt_id) {
                that.toastr.error('error', 'Duplicate Entity not Allowed');
                return true;
            }
        }

        return false;
    }

    // Read Get Entity

    addEntityList() {
        var that = this;
        var duplicateEntity = that.isDuplicateEntity();

        if (!duplicateEntity) {
            that.entityList.push({
                "_id": that.selectedEntity.value, "entt_name": that.selectedEntity.label
            });
        }

        that.entt_id = 0;
        that.entt_name = "";
        that.selectedEntity = [];
    }

    deleteEntity(row) {
        this.entityList.splice(this.entityList.indexOf(row), 1);
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

    saveUserInfo() {
        const that = this;

        if (that.formd.isedit == true) {
            that.formd.updatedby = that.loginUser._id;
        }
        else {
            that.formd.createdby = that.loginUser._id;
        }

        that.formd.wsid = that._wsdetails._id;

        if (that.formd.utype == "wsadmin") {
            that.formd.enttids = [0];
        }
        else {
            if (that.formd.isallentt) {
                that.formd.enttids = [0];
            }
            else {
                that.formd.enttids = Object.keys(that.entityList).map(function (k) { return that.entityList[k]._id });
            }
        }

        that._userservice.saveUserInfo(that.formd).subscribe((d) => {
            try {
                debugger;

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

        this.formd = {
            _id: 0,
            ucode: '',
            pwd: '',
            full_name: '',
            gender: '',
            utype: '',
            about_us: '',
            mobile: '',
            email: '',
            address: '',
            isallentt: false,
            enttids: {},
            wsid: 0,
            createdby: '',
            updatedby: '',
            isedit: false
        };
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
                    that.formd.ucode = d.data.ucode;
                    that.formd.pwd = d.data.pwd;
                    that.formd.full_name = d.data.full_name;
                    that.formd.gender = d.data.gender;
                    that.formd.utype = d.data.utype;
                    that.formd.about_us = d.data.about_us;

                    that.formd.mobile = d.data.mobile;
                    that.formd.email = d.data.email;
                    that.formd.address = d.data.address;

                    that.formd.isallentt = d.data.isallentt;
                    that.entityList = d.data.entity;
                }, (err) => {
                    that.toastr.error('error', err);
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