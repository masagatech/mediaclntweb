import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'entity.comp.html'
})

export class EntityComponent implements OnInit, OnDestroy {
    constructor(private _router: Router) {
        if (sessionStorage.getItem("_enttdetails_") == null && sessionStorage.getItem("_enttdetails_") == undefined) {
            this._router.navigate(['/workspace/entity']);
        }
    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }
}