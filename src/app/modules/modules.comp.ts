import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
    selector: 'app-maincomp',
    templateUrl: './modules.comp.html'
})

export class ModulesComponent implements OnInit {
    constructor(private _router: Router) {
        if (Cookie.get("_session_") == null && Cookie.get("_session_") == undefined) {
            this._router.navigate(['/login']);
        }
    }

    ngOnInit() {

    }
}
