import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ZoneService } from '../../../../services/zone/zone-service';
import { LoginService } from '../../../../services/login/login-service';
import { LoginUserModel } from '../../../../model/user_model';
import { Globals } from '../../../../const/globals';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-zone-add',
    templateUrl: './addzone.comp.html'
})

export class AddZoneComponent implements OnInit, OnDestroy {
    loginUser: LoginUserModel;
    _enttdetails: any = [];

    paramsid: number = 0;

    formd = {
        _id: 0,
        zone_name: '',
        zone_desc: '',
        address: '',
        pin_code: '',
        enttid: 0,
        wsid: 0,
        createdby: '',
        updatedby: '',
        isedit: false
    };

    private subscribeParameters: any;

    constructor(private _router: Router, private _routeParams: ActivatedRoute, private _zoneservice: ZoneService,
        private _loginservice: LoginService, private toastr: ToastrService) {
        this.loginUser = this._loginservice.getUser();
        this._enttdetails = Globals.getEntityDetails();
    }

    ngOnInit() {
        this.getZone();
    }

    // Save Data

    saveZone() {
        var that = this;

        if (that.formd.isedit == true) {
            that.formd.updatedby = that.loginUser._id;
        }
        else {
            that.formd.createdby = that.loginUser._id;
        }

        that.formd.enttid = that._enttdetails._id;
        that.formd.wsid = that._enttdetails.wsid;

        that._zoneservice.saveZoneInfo(that.formd).subscribe((d) => {
            if (d.errcode == -1) {
                that.toastr.error('error', d.err);
            }
            else {
                that.toastr.success('success', d.err);

                if (d.errcode == 1) {
                    that.resetZoneFields();
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

    resetZoneFields() {
        this.formd = {
            _id: 0,
            zone_name: '',
            zone_desc: '',
            address: '',
            pin_code: '',
            enttid: 0,
            wsid: 0,
            createdby: '',
            updatedby: '',
            isedit: false
        };
    }

    // Get Fields

    getZone() {
        var that = this;

        that.subscribeParameters = that._routeParams.params.subscribe(params => {
            if (params['id'] !== undefined) {
                that.paramsid = params['id'];
                that.formd.isedit = true;

                that._zoneservice.getZoneByID({ "id": that.paramsid }).subscribe((d) => {
                    that.formd._id = d.data._id;
                    that.formd.zone_name = d.data.zone_name;
                    that.formd.zone_desc = d.data.zone_desc;
                    that.formd.address = d.data.address;
                    that.formd.pin_code = d.data.pin_code;
                }, (err) => {
                    that.toastr.success('success', err);
                }, () => {

                });
            }
            else {
                that.resetZoneFields();
            }
        });
    }

    // Back For View Data

    backViewData() {
        this._router.navigate(['/zone']);
    }

    ngOnDestroy() {
        this.subscribeParameters.unsubscribe();
    }
}
