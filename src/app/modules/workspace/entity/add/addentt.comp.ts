import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityService } from '../../../../services/entity/entt-service';
import { LoginService } from '../../../../services/login/login-service';
import { LoginUserModel } from '../../../../model/user_model';
import { Globals } from '../../../../const/globals';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-entt-add',
    templateUrl: './addentt.comp.html'
})

export class AddEntityComponent implements OnInit, OnDestroy {
    loginUser: LoginUserModel;
    _wsdetails: any = [];

    paramsid: number = 0;

    formd = {
        _id: 0,
        entt_name: '',
        entt_desc: '',
        contact_person: '',
        mobile: '',
        email: '',
        address: '',
        wsid: 0,
        createdby: '',
        isedit: false
    };

    private subscribeParameters: any;

    constructor(private _router: Router, private _routeParams: ActivatedRoute, private _enttservice: EntityService,
        private _loginservice: LoginService, private toastr: ToastrService) {
        this.loginUser = this._loginservice.getUser();
        this._wsdetails = Globals.getWSDetails();
    }

    ngOnInit() {
        this.getEntity();
    }

    // Save

    saveEntity() {
        var that = this;

        that.formd.createdby = that.loginUser._id;
        that.formd.wsid = that._wsdetails._id;

        that._enttservice.saveEntityInfo(that.formd).subscribe((d) => {
            if (d.errcode == -1) {
                that.toastr.error('error', d.err);
            }
            else {
                that.toastr.success('success', d.err);

                if (d.errcode == 1) {
                    that.resetEntityFields();
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

    resetEntityFields() {
        this.formd = {
            _id: 0,
            entt_name: '',
            entt_desc: '',
            contact_person: '',
            mobile: '',
            email: '',
            address: '',
            wsid: this._wsdetails._id,
            createdby: this.loginUser._id,
            isedit: false
        };
    }

    // Get Fields

    getEntity() {
        var that = this;

        that.subscribeParameters = that._routeParams.params.subscribe(params => {
            if (params['id'] !== undefined) {
                that.paramsid = params['id'];
                that.formd.isedit = true;

                that._enttservice.getEntityByID({ "id": that.paramsid }).subscribe((d) => {
                    that.formd._id = d.data._id;
                    that.formd.entt_name = d.data.entt_name;
                    that.formd.entt_desc = d.data.entt_desc;

                    that.formd.contact_person = d.data.contact_person;
                    that.formd.mobile = d.data.mobile;
                    that.formd.email = d.data.email;
                    that.formd.address = d.data.address;
                }, (err) => {
                    that.toastr.success('success', err);
                }, () => {

                });
            }
            else {
                that.resetEntityFields();
            }
        });
    }

    // Back For View Data

    backViewData() {
        this._router.navigate(['/workspace/entity']);
    }

    ngOnDestroy() {
        this.subscribeParameters.unsubscribe();
    }
}
