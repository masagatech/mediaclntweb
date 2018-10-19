import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkspaceService } from '../../../../services/workspace/ws-service';
import { LoginService } from '../../../../services/login/login-service';
import { LoginUserModel } from '../../../../model/user_model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-wrk-view',
    templateUrl: './viewws.comp.html'
})

export class ViewWorkspaceComponent implements OnInit {
    loginUser: LoginUserModel;

    workspaceDT: any = [];

    constructor(private _router: Router, private _wsservice: WorkspaceService, private _loginservice: LoginService, private toastr: ToastrService) {
        this.loginUser = this._loginservice.getUser();
    }

    ngOnInit() {
        this.getWorkspaceDetails();
    }

    // Get Workspace Data

    getWorkspaceDetails() {
        var that = this;

        that._wsservice.getWorkspaceDetails({}).subscribe((d) => {
            that.workspaceDT = d.data;
        }, (err) => {
            that.toastr.success('success', err);
        }, () => {

        });
    }

    // Add New Workspace

    addWorkspace() {
        this._router.navigate(['/admin/workspace/add']);
    }

    // Edit Workspace

    editWorkspace(row) {
        this._router.navigate(['/admin/workspace/edit', row._id]);
    }

    // Open Entity Form

    openEntityForm(row) {
        sessionStorage.removeItem("_wsdetails_");
        sessionStorage.setItem("_wsdetails_", JSON.stringify(row));

        console.log(JSON.stringify(row));

        this._router.navigate(['/workspace/entity']);
    }
}
