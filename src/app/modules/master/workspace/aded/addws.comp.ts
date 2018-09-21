import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { WorkspaceService } from '../../../../services/workspace/ws-service';
import { CommonService } from '../../../../services/common/common-service';
import { LoginService } from '../../../../services/login/login-service';
import { LoginUserModel } from '../../../../model/user_model';

@Component({
    selector: 'app-workspace',
    templateUrl: 'addws.comp.html'
})

export class AddWorkspaceComponent implements OnInit, OnDestroy {
    loginUser: LoginUserModel;

    wsid: number = 0;
    wscode: string = "";
    lgcode: string = "";
    lgpwd: string = "";
    wsname: string = "";
    mobile: string = "";
    email: string = "";
    address: string = "";

    constructor(private _router: Router, private _loginservice: LoginService, private _wsservice: WorkspaceService, private _autoservice: CommonService) {
        this.loginUser = this._loginservice.getUser();
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

    resetUserFields() {
        var that = this;

        that.wsid = 0;
        that.wscode = "";
        that.lgcode = "";
        that.lgpwd = "";
        that.wsname = "";
        that.mobile = "";
        that.email = "";
        that.address = "";
    }

    // Save Workspace

    saveWorkspaceInfo() {
        var that = this;

        var params = {
            "wsid": that.wsid,
            "wscode": that.wscode,
            "lgcode": that.lgcode,
            "lgpwd": that.lgpwd,
            "wsname": that.wsname,
            "mobile": that.mobile,
            "email": that.email,
            "address": that.address,
            "cuid": that.loginUser._id
        }

        that._wsservice.saveWorkspaceInfo(params).subscribe(data => {
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