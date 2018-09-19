import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'dashboard.comp.html'
})

export class DashboardComponent implements OnInit, OnDestroy {
    constructor(private _router: Router) {
    }

    ngOnInit() {
        
    }

    public ngOnDestroy() {
        
    }
}