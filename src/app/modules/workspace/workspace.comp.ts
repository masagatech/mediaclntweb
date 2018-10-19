import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'workspace.comp.html'
})

export class WorkspaceComponent implements OnInit, OnDestroy {
    constructor(private _router: Router) {
        if (sessionStorage.getItem("_wsdetails_") == null && sessionStorage.getItem("_wsdetails_") == undefined) {
            this._router.navigate(['/admin/workspace']);
        }
    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }
}