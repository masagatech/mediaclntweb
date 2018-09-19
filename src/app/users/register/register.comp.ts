import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/users/user-service';

@Component({
    selector: 'app-register',
    templateUrl: 'register.comp.html'
})

export class RegisterComponent implements OnInit, OnDestroy {
    constructor(private _router: Router, private _userservice: UserService) {

    }

    public ngOnInit() {

    }

    register() {

    }

    ngOnDestroy() {

    }
}