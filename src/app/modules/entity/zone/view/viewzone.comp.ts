import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZoneService } from '../../../../services/zone/zone-service';
import { LoginService } from '../../../../services/login/login-service';
import { LoginUserModel } from '../../../../model/user_model';
import { Globals } from '../../../../const/globals';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-zone-view',
    templateUrl: './viewzone.comp.html'
})

export class ViewZoneComponent implements OnInit {
    loginUser: LoginUserModel;
    _wsdetails: any = [];

    zoneDT: any = [];

    constructor(private _router: Router, private _zoneservice: ZoneService, private _loginservice: LoginService, private toastr: ToastrService) {
        this.loginUser = this._loginservice.getUser();
        this._wsdetails = Globals.getWSDetails();
    }

    ngOnInit() {
        this.getZoneDetails();
    }

    // Get Zone Data

    getZoneDetails() {
        var that = this;

        that._zoneservice.getZoneDetails({
            "flag": "bywsid", "wsid": that._wsdetails._id
        }).subscribe((d) => {
            that.zoneDT = d.data;
        }, (err) => {
            that.toastr.success('error', err);
        }, () => {

        });
    }

    // Add Zone

    addZone() {
        this._router.navigate(['/zone/add']);
    }

    // Edit Zone

    editZone(row) {
        this._router.navigate(['/zone/edit', row._id]);
    }
}
