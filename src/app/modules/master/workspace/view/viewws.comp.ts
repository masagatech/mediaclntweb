import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkspaceService } from '../../../../services/workspace/ws-service';

@Component({
    selector: 'app-wrk-view',
    templateUrl: './viewws.comp.html'
})

export class ViewWorkspaceComponent implements OnInit {
    workspaceDT: any = [];

    constructor(private _router: Router, private _wsservice: WorkspaceService) {

    }

    ngOnInit() {
        this.getAllWorkspace();
    }

    getAllWorkspace() {
        var that = this;

        that._wsservice.getAllWorkspace({}).subscribe((d) => {
            that.workspaceDT = d.data;
            console.log(d.data);
        }, (err) => {

        }, () => {

        });
    }

    addWorkspace() {
        this._router.navigate(['/workspace/add']);
    }

    editWorkspace(row) {
        this._router.navigate(['/workspace/edit', row._id]);
    }
}
