import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkspaceService } from '../../../../services/workspace/ws-service';
import { LoginService } from '../../../../services/login/login-service';
import { LoginUserModel } from '../../../../model/user_model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-wrk-add',
    templateUrl: './addws.comp.html'
})

export class AddWorkspaceComponent implements OnInit, OnDestroy {
    loginUser: LoginUserModel;

    paramsid: number = 0;
    login_id: number = 0;

    formd = {
        _id: 0,
        ws_code: '',
        ws_name: '',
        ws_desc: '',
        login_code: '',
        pwd: '',
        contact_person: '',
        mobile: '',
        email: '',
        address: '',
        createdby: '',
        updatedby: '',
        isedit: false
    };

    disablecode: boolean = false;

    private subscribeParameters: any;

    constructor(private _router: Router, private _routeParams: ActivatedRoute, private _wsservice: WorkspaceService,
        private _loginservice: LoginService, private toastr: ToastrService) {
        this.loginUser = this._loginservice.getUser();
    }

    ngOnInit() {
        this.getWorkspace();
    }

    // Save

    saveWorkspace() {
        var that = this;

        if (that.formd.isedit == true) {
            that.formd.updatedby = that.loginUser._id;
        }
        else {
            that.formd.createdby = that.loginUser._id;
        }

        that._wsservice.saveWorkspaceInfo(that.formd).subscribe((d) => {
            if (d.errcode == -1) {
                that.toastr.error('error', d.err);
            }
            else {
                that.toastr.success('success', d.err);

                if (d.errcode == 1) {
                    that.resetWorkspaceFields();
                }
                else {
                    that.backViewData();
                }
            }
        }, (err) => {

        }, () => {

        });
    }

    // Reset Fields

    resetWorkspaceFields() {
        this.formd = {
            _id: 0,
            ws_code: '',
            ws_name: '',
            ws_desc: '',
            login_code: '',
            pwd: '',
            contact_person: '',
            mobile: '',
            email: '',
            address: '',
            createdby: '',
            updatedby: '',
            isedit: false
        };
    }

    // Get Fields

    getWorkspace() {
        var that = this;

        that.subscribeParameters = that._routeParams.params.subscribe(params => {
            if (params['id'] !== undefined) {
                that.paramsid = params['id'];
                that.formd.isedit = true;
                that.disablecode = true;

                that._wsservice.getWorkspaceByID({ "id": that.paramsid }).subscribe((d) => {
                    that.formd._id = d.data._id;
                    that.formd.ws_code = d.data.ws_code;
                    that.formd.ws_name = d.data.ws_name;
                    that.formd.ws_desc = d.data.ws_desc;

                    that.login_id = d.data.loginid;
                    that.formd.login_code = d.data.login_code;
                    that.formd.pwd = d.data.pwd;

                    that.formd.contact_person = d.data.contact_person;
                    that.formd.mobile = d.data.mobile;
                    that.formd.email = d.data.email;
                    that.formd.address = d.data.address;
                }, (err) => {

                }, () => {

                });
            }
            else {
                that.resetWorkspaceFields();
            }
        });
    }

    // Back For View Data

    backViewData() {
        this._router.navigate(['/admin/workspace']);
    }

    ngOnDestroy() {
        this.subscribeParameters.unsubscribe();
    }
}
