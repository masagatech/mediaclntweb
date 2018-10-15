import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/users/user-service';
import { CommonService } from '../../services/common/common-service';

@Component({
    selector: 'app-register',
    templateUrl: 'register.comp.html',
    providers: [UserService, CommonService]
})

export class RegisterComponent implements OnInit, OnDestroy, AfterViewInit {
    email: String = '';
    pwd: String = '';
    name: String = '';

    constructor(private _router: Router, private _userservice: UserService, private _autoservice: CommonService) {

    }

    public ngOnInit() {
        this.showPassword('password');
    }

    ngAfterViewInit() {
        $('#txtfullname').focus();
    }

    showPassword(type) {
        if (type === 'text') {
            $('#lblshowpwd').removeClass('hide');
            $('#lblshowpwd').addClass('show');

            $('#lblhidepwd').removeClass('show');
            $('#lblhidepwd').addClass('hide');
        } else {
            $('#lblshowpwd').removeClass('show');
            $('#lblshowpwd').addClass('hide');

            $('#lblhidepwd').removeClass('hide');
            $('#lblhidepwd').addClass('show');
        }

        $('.pwd').attr('type', type);
    }

    // Reset Fields

    resetUserFields() {
        const that = this;

        that.email = '';
        that.pwd = '';
        that.name = '';
    }

    // Save Data

    registeredUser() {
        const that = this;

        const params = {
            'email': that.email,
            'pwd': that.pwd,
            'name': that.name
        };

        that._userservice.registeredUser(params).subscribe(data => {
            try {
                const msg = data.err;
                const msgid = data.errcode;

                if (msgid === '-1') {
                    that._autoservice.showmsgbox('Error', msg, 'error');
                } else if (msgid === '1') {
                    that._autoservice.showmsgbox('Success', msg, 'success');
                    that.resetUserFields();
                } else {
                    that._autoservice.showmsgbox('Warning', msg, 'warning');
                }
            } catch (e) {
                that._autoservice.showmsgbox('Error', e, 'error');
            }
        }, err => {
            that._autoservice.showmsgbox('Error', err, 'error');
        }, () => {
            // console.log('Complete');
        });
    }

    ngOnDestroy() {

    }
}

