import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-uc-appbar',
    templateUrl: './appbar.comp.html',
    styleUrls: ['./appbar.comp.css']
})
export class AppBarComponent implements OnInit {
    constructor(private _router: Router) { }


    ngOnInit(): void {

    }


}
