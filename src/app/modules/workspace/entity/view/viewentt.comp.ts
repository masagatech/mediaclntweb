import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntityService } from '../../../../services/entity/entt-service';
import { LoginService } from '../../../../services/login/login-service';
import { LoginUserModel } from '../../../../model/user_model';
import { Globals } from '../../../../const/globals';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-wrk-view',
    templateUrl: './viewentt.comp.html'
})

export class ViewEntityComponent implements OnInit {
    loginUser: LoginUserModel;
    _wsdetails: any = [];

    entityDT: any = [];

    constructor(private _router: Router, private _enttservice: EntityService, private _loginservice: LoginService, private toastr: ToastrService) {
        this.loginUser = this._loginservice.getUser();
        this._wsdetails = Globals.getWSDetails();
    }

    ngOnInit() {
        this.getEntityDetails();
    }

    // Get Entity Data

    getEntityDetails() {
        var that = this;

        that._enttservice.getEntityDetails({
            "flag": "bywsid", "wsid": that._wsdetails._id
        }).subscribe((d) => {
            that.entityDT = d.data;
        }, (err) => {
            that.toastr.success('error', err);
        }, () => {

        });
    }

    // Add Entity

    addEntity() {
        this._router.navigate(['/workspace/entity/add']);
    }

    // Edit Entity

    editEntity(row) {
        this._router.navigate(['/workspace/entity/edit', row._id]);
    }

    // Main Form

    openMainForm(row) {
        sessionStorage.removeItem("_enttdetails_");

        sessionStorage.setItem("_enttdetails_", JSON.stringify(row));
        this._router.navigate(['/']);
    }
}
