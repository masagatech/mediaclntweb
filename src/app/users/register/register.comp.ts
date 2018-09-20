import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/users/user-service';
import { CommonService } from '../../services/common/common-service';

@Component({
    selector: 'app-register',
    templateUrl: 'register.comp.html',
    providers: [UserService, CommonService]
})

export class RegisterComponent implements OnInit, OnDestroy {
    email: string = "";
    pwd: string = "";
    name: string = "";

    constructor(private _router: Router, private _userservice: UserService, private _autoservice: CommonService) {

    }

    public ngOnInit() {
        this.showPassword("password");
    }

    showPassword(type) {
        if (type == "text") {
            $("#lblshowpwd").removeClass("hide");
            $("#lblshowpwd").addClass("show");

            $("#lblhidepwd").removeClass("show");
            $("#lblhidepwd").addClass("hide");
        }
        else {
            $("#lblshowpwd").removeClass("show");
            $("#lblshowpwd").addClass("hide");

            $("#lblhidepwd").removeClass("hide");
            $("#lblhidepwd").addClass("show");
        }

        $(".pwd").attr("type", type);
    }

    // Reset Fields

    resetUserFields(){
        var that = this;

        that.email = "";
        that.pwd = "";
        that.name = "";
    }

    // Save Data

    registeredUser() {
        var that = this;

        var params = {
            "email": that.email,
            "pwd": that.pwd,
            "name": that.name
        }

        that._userservice.registeredUser(params).subscribe(data => {
            try {
                var msg = data.err;
                var msgid = data.errcode;

                if (msgid == "-1") {
                    that._autoservice.showmsgbox("Error", msg, "error");
                }
                else if (msgid == "1") {
                    that._autoservice.showmsgbox("Success", msg, "success");
                    that.resetUserFields();
                }
                else {
                    that._autoservice.showmsgbox("Warning", msg, "warning");
                }
            }
            catch (e) {
                that._autoservice.showmsgbox("Error", e, "error");
            }
        }, err => {
            that._autoservice.showmsgbox("Error", err, "error");
        }, () => {
            // console.log("Complete");
        });
    }

    ngOnDestroy() {

    }
}